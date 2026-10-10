#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const API = "https://api.figma.com/v1";
const TOKEN_FILE = path.join(__dirname, "..", "figma-token.txt");
const PROTOCOL_FALLBACK = "2024-11-05";

function loadToken() {
  const raw = fs.readFileSync(TOKEN_FILE, "utf8").trim();
  if (!raw.startsWith("figd_")) {
    throw new Error(`No Figma token found at ${TOKEN_FILE}`);
  }
  return raw;
}

const TOKEN = loadToken();

// Figma gives a free-plan (View/Collab seat) account about 20 file-content reads per month,
// counted per user rather than per token, so a fresh token does not reset it. Cache every
// response, never retry a 429 (each retry burns budget), and refuse before overspending.
const MIN_GAP_MS = 350;
const CACHE_DIR = path.join(__dirname, "cache");
const USAGE_FILE = path.join(__dirname, "usage.json");
const CACHE_TTL_MS = 10 * 60 * 1000;
const MONTHLY_LIMIT = 20;
const SAFETY_MARGIN = 3;
const QUOTA_COST = [/^\/files\//, /^\/images\//];
let lastCall = 0;

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function readUsage() {
  const fresh = { month: monthKey(), used: 0, log: [], blockedUntil: 0 };
  try {
    const u = JSON.parse(fs.readFileSync(USAGE_FILE, "utf8"));
    if (u.month !== monthKey()) return fresh;
    return { ...fresh, ...u };
  } catch {
    return fresh;
  }
}

function blockUntil(ms, limitType) {
  if (!ms && !limitType) return;
  const u = readUsage();
  if (ms && ms > 0) {
    const until = Date.now() + ms;
    // Figma's window is not a calendar month, so keep the longest block we have seen.
    if (!u.blockedUntil || u.blockedUntil < until) u.blockedUntil = until;
  }
  if (limitType) u.limitType = limitType;
  writeUsage(u);
}

function writeUsage(u) {
  try {
    fs.writeFileSync(USAGE_FILE, JSON.stringify(u, null, 1));
  } catch {
    /* usage tracking is best effort */
  }
}

function countsAgainstQuota(endpoint) {
  return QUOTA_COST.some((re) => re.test(endpoint));
}

function budgetLeft() {
  const u = readUsage();
  const blockedMs = Math.max(0, (u.blockedUntil || 0) - Date.now());
  return {
    used: u.used,
    remaining: Math.max(0, MONTHLY_LIMIT - SAFETY_MARGIN - u.used),
    limit: MONTHLY_LIMIT,
    blockedUntil: u.blockedUntil || 0,
    blockedMins: Math.round(blockedMs / 60000),
  };
}

function logRead(endpoint, query) {
  const u = readUsage();
  u.used = (u.used || 0) + 1;
  u.log = u.log || [];
  u.log.push({ at: new Date().toISOString(), endpoint, query: query || null });
  writeUsage(u);
}

async function throttle() {
  const wait = Math.max(0, lastCall + MIN_GAP_MS - Date.now());
  if (wait) await new Promise((r) => setTimeout(r, wait));
  lastCall = Date.now();
}

function cachePath(endpoint, query) {
  const key = endpoint + "?" + JSON.stringify(query || {});
  const safe = Buffer.from(key).toString("base64url").slice(0, 120);
  return path.join(CACHE_DIR, safe + ".json");
}

function readCache(endpoint, query) {
  const file = cachePath(endpoint, query);
  try {
    const raw = fs.readFileSync(file, "utf8");
    const { at, body } = JSON.parse(raw);
    if (Date.now() - at < CACHE_TTL_MS) return body;
  } catch {
    /* no usable cache entry */
  }
  return null;
}

function writeCache(endpoint, query, body) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cachePath(endpoint, query), JSON.stringify({ at: Date.now(), body }));
  } catch {
    /* cache is best effort */
  }
}

async function api(endpoint, query) {
  const cached = readCache(endpoint, query);
  if (cached) return { body: cached, cached: true };

  if (countsAgainstQuota(endpoint)) {
    const { used, remaining, limit, blockedUntil, blockedMins } = budgetLeft();
    if (blockedMins > 0) {
      throw new Error(
        `Figma is rate limiting this account right now (their reset is about ${blockedMins} minutes away). ` +
          `Stop and wait; do not retry and do not spend any reads. ` +
          `Cached data and specs already saved under design/ still work.`
      );
    }
    if (remaining <= 0) {
      throw new Error(
        `Local read budget reached (${used}/${limit} used, keeping a ${SAFETY_MARGIN}-read margin). ` +
          `Cached data still works. New Figma data becomes available when the counter resets next month.`
      );
    }
  }

  const url = new URL(API + endpoint);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  await throttle();
  const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  // Never retry a 429: Figma counts every attempt, so a retry only burns more budget.
  if (res.status === 429) {
    const retryAfter = res.headers.get("retry-after");
    const mins = retryAfter ? Math.round(Number(retryAfter) / 60) : null;
    blockUntil(retryAfter ? Number(retryAfter) * 1000 : 0, res.headers.get("x-figma-rate-limit-type"));
    throw new Error(
      `Figma rate limit hit on ${endpoint}${mins ? `; their reset is about ${mins} minutes away` : ""}. ` +
        `No reads were retried, so no budget was wasted. Cached data still works.`
    );
  }
  if (!res.ok) {
    const msg =
      typeof body === "object" && body && body.message ? body.message : `HTTP ${res.status}`;
    throw new Error(`Figma API ${endpoint} failed: ${msg}`);
  }
  if (countsAgainstQuota(endpoint)) logRead(endpoint, query);
  writeCache(endpoint, query, body);
  return { body, cached: false };
}

const FILE_KEY_RE = /([A-Za-z0-9]{20,})/;
const NODE_ID_RE = /(\d+[-:]\d+)/;

function resolveFileKey(input) {
  if (!input) throw new Error("fileKey (or a Figma URL containing it) is required");
  const fromUrl = String(input).match(FILE_KEY_RE);
  if (fromUrl) return fromUrl[1];
  if (/^[A-Za-z0-9]{10,}$/.test(input)) return input;
  throw new Error(`Could not find a Figma file key in: ${input}`);
}

function resolveNodeIds(input) {
  if (!input) return null;
  const ids = String(input)
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const m = s.match(NODE_ID_RE);
      return m ? m[1].replace("-", ":") : null;
    })
    .filter(Boolean);
  return ids.length ? ids.join(",") : null;
}

function color(c) {
  if (!c) return null;
  const hex =
    "#" +
    ["r", "g", "b"]
      .map((k) => Math.round((c[k] ?? 0) * 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  const a = c.a ?? 1;
  return a < 1 ? `${hex} (alpha ${Math.round(a * 100)}%)` : hex;
}

function paintList(paints) {
  if (!Array.isArray(paints)) return [];
  const out = [];
  for (const p of paints) {
    if (p.visible === false) continue;
    if (p.type === "SOLID") out.push(color(p.color));
    else out.push(String(p.type || "unknown paint").toLowerCase().replace(/_/g, " "));
  }
  return out;
}

function describe(node, depth, opts) {
  const lines = [];
  const pad = "  ".repeat(depth);
  const b = node.absoluteBoundingBox || {};
  const rel = node.relativeTransform
    ? node.relativeTransform[0]
    : null;
  const size = b.width != null ? `${Math.round(b.width)}x${Math.round(b.height)}` : "";

  let head = `${pad}${node.type} "${node.name}" (${node.id})`;
  if (size) head += ` ${size}`;
  if (b.x != null && opts.absolute !== false) {
    head += ` @ ${Math.round(b.x)},${Math.round(b.y)}`;
  }
  if (rel && rel[0] !== 1) {
    head += ` rotated ${Math.round((Math.atan2(rel[1], rel[0]) * 180) / Math.PI)}deg`;
  }
  lines.push(head);

  if (node.layoutMode) {
    lines.push(
      `${pad}  auto-layout: ${node.layoutMode}, gap ${node.itemSpacing ?? 0}, ` +
        `padding ${node.paddingLeft ?? 0} ${node.paddingTop ?? 0} ${node.paddingRight ?? 0} ${node.paddingBottom ?? 0}, ` +
        `align ${node.primaryAxisAlignItems ?? "-"}/${node.counterAxisAlignItems ?? "-"}`
    );
  }
  const fills = paintList(node.fills);
  if (fills.length) lines.push(`${pad}  fill: ${fills.join(", ")}`);
  const strokes = paintList(node.strokes);
  if (strokes.length && node.strokeWeight) {
    lines.push(`${pad}  stroke: ${node.strokeWeight}px ${strokes.join(", ")}`);
  }
  if (node.cornerRadius != null) lines.push(`${pad}  corner-radius: ${node.cornerRadius}px`);
  if (node.opacity != null && node.opacity !== 1) lines.push(`${pad}  opacity: ${node.opacity}`);
  if (node.effects && node.effects.length) {
    for (const e of node.effects) {
      if (e.visible === false) continue;
      lines.push(`${pad}  effect: ${e.type}${e.radius ? ` ${e.radius}px` : ""}${e.color ? ` ${color(e.color)}` : ""}`);
    }
  }
  if (node.characters != null) {
    lines.push(`${pad}  text: ${JSON.stringify(node.characters)}`);
  }
  const st = node.style;
  if (st) {
    lines.push(
      `${pad}  font: ${st.fontFamily}, weight ${st.fontWeight}, ${st.fontSize}px, ` +
        `line-height ${st.lineHeightPx}px, letter-spacing ${st.letterSpacing || 0}, align ${node.textAlignHorizontal || "-"}`
    );
  }
  if (node.constraints) {
    lines.push(`${pad}  constraints: ${node.constraints.vertical}/${node.constraints.horizontal}`);
  }
  if (node.componentId) lines.push(`${pad}  instance of component ${node.componentId}`);

  if (node.children && depth < (opts.maxDepth ?? 12)) {
    for (const child of node.children) lines.push(...describe(child, depth + 1, opts));
  } else if (node.children && node.children.length) {
    lines.push(`${pad}  ... ${node.children.length} more children (raise maxDepth)`);
  }
  return lines;
}

const TOOLS = [
  {
    name: "figma_usage",
    description:
      "Check how many Figma file reads are left this month. Figma gives a free-plan account about 20 file reads per month, counted per account rather than per token.",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      const u = readUsage();
      const { used, remaining, limit, blockedMins } = budgetLeft();
      const recent = (u.log || []).slice(-8).map((e) => `  ${e.at} ${e.endpoint}`);
      const status =
        blockedMins > 0
          ? `BLOCKED: Figma is rate limiting this account for about another ${blockedMins} minutes. ` +
            `Do not call any tool that reads a file or image until then.`
          : `Reads used: ${used} of ~${limit} (keeping a ${SAFETY_MARGIN}-read margin, so ${remaining} safe reads left)`;
      return [
        `Month: ${u.month}`,
        status,
        "",
        "The counter is a local safety net, not Figma's own number, so treat it as a guide only.",
        "Cached results cost nothing and keep working even at the limit.",
        "Specs already saved under design/ cost nothing and never expire.",
        "One read can fetch an entire file, so prefer figma_dump over several figma_node calls.",
        recent.length ? "\nRecent reads:\n" + recent.join("\n") : "",
      ].join("\n");
    },
  },
  {
    name: "figma_dump",
    description:
      "Get the design of an entire Figma file as one compact text report: every frame and layer with sizes, positions, auto-layout, colors, typography and text. Costs a single read, so prefer this over repeated calls.",
    inputSchema: {
      type: "object",
      properties: {
        fileKey: { type: "string", description: "Figma file key or any Figma file URL" },
        maxDepth: { type: "number", description: "Max depth to walk per frame (default 8)" },
        frames: { type: "string", description: "Optional comma separated node ids to limit to specific frames" },
        savePath: {
          type: "string",
          description:
            "Optional absolute path to write the report to. Use this so the design spec lives in the repo and never needs re-reading from Figma.",
        },
      },
      required: ["fileKey"],
    },
    handler: async ({ fileKey, maxDepth, frames, savePath }) => {
      const key = resolveFileKey(fileKey);
      const wanted = frames ? resolveNodeIds(frames).split(",") : null;
      const { body: file, cached } = await api(`/files/${key}`);
      const depth = Number(maxDepth) || 8;
      const out = [
        `DESIGN DUMP - ${file.name} (key ${key})${cached ? " [cached]" : ""}`,
        `modified ${file.lastModified} | editorType ${file.editorType} | version ${file.version}`,
        "",
      ];
      const pageIds = new Set(file.document.children.map((p) => p.id));
      const pages = file.document.children.flatMap((p) => p.children || []);
      const allFrames = [];
      (function collect(node) {
        if (
          node.type === "FRAME" ||
          node.type === "COMPONENT" ||
          node.type === "COMPONENT_SET" ||
          node.type === "INSTANCE"
        ) {
          allFrames.push(node);
        }
        for (const child of node.children || []) collect(child);
      })(file.document);

      let roots;
      if (!wanted || wanted.some((id) => pageIds.has(id))) {
        roots = pages;
      } else {
        roots = allFrames.filter((n) => wanted.includes(n.id));
        if (!roots.length) {
          out.push(
            `(no frame matched ${wanted.join(", ")}; dumping every frame in the file instead)`
          );
          roots = pages;
        }
      }
      for (const n of roots) {
        out.push(`PAGE-LEVEL FRAME ${n.id}`);
        out.push(...describe(n, 1, { maxDepth: depth }));
        out.push("");
      }
      const comps = Object.keys(file.components || {});
      if (comps.length) {
        out.push(`COMPONENTS (${comps.length}): ` + comps.slice(0, 40).join(", "));
      }
      const styles = file.styles || {};
      const styleKeys = Object.keys(styles);
      if (styleKeys.length) {
        out.push("", `STYLES (${styleKeys.length}):`);
        for (const k of styleKeys.slice(0, 40)) {
          out.push(`  ${styles[k].name} [${styles[k].styleType}]`);
        }
      }
      if (savePath) {
        fs.mkdirSync(path.dirname(savePath), { recursive: true });
        fs.writeFileSync(savePath, out.join("\n"), "utf8");
        out.push("", `Saved this spec to ${savePath}`);
      }
      return out.join("\n");
    },
  },
  {
    name: "figma_outline",
    description:
      "List the pages, frames and top-level layers of a Figma file with node ids and sizes. Start here to find the node id of the frame you want.",
    inputSchema: {
      type: "object",
      properties: {
        fileKey: { type: "string", description: "Figma file key or any Figma file URL" },
        depth: { type: "number", description: "How many levels to walk (default 2)" },
      },
      required: ["fileKey"],
    },
    handler: async ({ fileKey, depth }) => {
      const key = resolveFileKey(fileKey);
      const d = Math.min(Number(depth) || 2, 6);
      const { body: file, cached } = await api(`/files/${key}`, { depth: d });
      const lines = [
        `File: ${file.name} (key ${key})${cached ? " [cached]" : ""}`,
        `editorType: ${file.editorType} | version: ${file.version} | modified: ${file.lastModified}`,
        `linkAccess: ${file.linkAccess || "unknown"}`,
        "",
      ];
      for (const page of file.document.children) {
        lines.push(`Page "${page.name}" (${page.id})`);
        for (const n of page.children) lines.push(...describe(n, 1, { maxDepth: 2 }));
      }
      const comps = Object.keys(file.components || {}).length;
      if (comps) lines.push("", `published components: ${comps}`);
      if (file.styles && Object.keys(file.styles).length) {
        lines.push(`styles: ${Object.keys(file.styles).length}`);
      }
      return lines.join("\n");
    },
  },
  {
    name: "figma_node",
    description:
      "Get the full layer tree of one or more nodes with exact sizes, positions, auto-layout, colors, typography and text. This is the main tool for implementing a design accurately.",
    inputSchema: {
      type: "object",
      properties: {
        fileKey: { type: "string", description: "Figma file key or any Figma file URL" },
        nodeIds: { type: "string", description: "Node ids like 1:2 or 2-2, or a Figma node URL. Comma separated." },
        maxDepth: { type: "number", description: "Max depth to walk (default 12)" },
      },
      required: ["fileKey", "nodeIds"],
    },
    handler: async ({ fileKey, nodeIds, maxDepth }) => {
      const key = resolveFileKey(fileKey);
      const ids = resolveNodeIds(nodeIds);
      const data = (await api(`/files/${key}/nodes`, { ids })).body;
      const out = [];
      for (const [id, entry] of Object.entries(data.nodes || {})) {
        if (!entry) {
          out.push(`Node ${id}: not found in this file`);
          continue;
        }
        const doc = entry.document;
        const b = doc.absoluteBoundingBox || {};
        out.push(`Node ${id}: "${doc.name}" ${doc.type} ${Math.round(b.width || 0)}x${Math.round(b.height || 0)}`);
        out.push(...describe(doc, 1, { maxDepth: Number(maxDepth) || 12 }));
        out.push("");
      }
      return out.join("\n");
    },
  },
  {
    name: "figma_json",
    description:
      "Get the raw Figma JSON for a node subtree. Use when you need fields the text output omits, such as vector paths, effects detail, or constraint overrides.",
    inputSchema: {
      type: "object",
      properties: {
        fileKey: { type: "string" },
        nodeIds: { type: "string" },
        depth: { type: "number" },
        geometry: { type: "string", description: "Set to 'paths' to include vector geometry" },
      },
      required: ["fileKey", "nodeIds"],
    },
    handler: async ({ fileKey, nodeIds, depth, geometry }) => {
      const key = resolveFileKey(fileKey);
      const ids = resolveNodeIds(nodeIds);
      const data = (
        await api(`/files/${key}/nodes`, {
          ids,
          depth,
          geometry,
        })
      ).body;
      return JSON.stringify(data, null, 1);
    },
  },
  {
    name: "figma_render",
    description:
      "Render a node to a PNG via the Figma API and return the image URL (it expires in about 14 days). Pass savePath to also write the PNG into the project.",
    inputSchema: {
      type: "object",
      properties: {
        fileKey: { type: "string" },
        nodeIds: { type: "string" },
        scale: { type: "number", description: "1 or 2 (default 2)" },
        format: { type: "string", description: "png, jpg, svg or pdf (default png)" },
        savePath: { type: "string", description: "Optional absolute path to write the image to" },
      },
      required: ["fileKey", "nodeIds"],
    },
    handler: async ({ fileKey, nodeIds, scale, format, savePath }) => {
      const key = resolveFileKey(fileKey);
      const ids = resolveNodeIds(nodeIds);
      const data = (
        await api(`/images/${key}`, {
          ids,
          scale: Number(scale) || 2,
          format: format || "png",
        })
      ).body;
      if (data.err) throw new Error(data.err || "render failed");
      const lines = [];
      for (const [id, url] of Object.entries(data.images || {})) {
        lines.push(`${id}: ${url}`);
        if (url && savePath) {
          const res = await fetch(url);
          if (!res.ok) {
            lines.push(`  could not download: HTTP ${res.status}`);
            continue;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          fs.mkdirSync(path.dirname(savePath), { recursive: true });
          fs.writeFileSync(savePath, buf);
          lines.push(`  saved ${buf.length} bytes to ${savePath}`);
        }
      }
      lines.push("Note: these URLs expire in roughly 14 days.");
      return lines.join("\n");
    },
  },
  {
    name: "figma_clear_cache",
    description:
      "Delete the server's cached Figma responses. Use this after you change your design in Figma and want fresh data.",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      let removed = 0;
      try {
        for (const f of fs.readdirSync(CACHE_DIR)) {
          fs.unlinkSync(path.join(CACHE_DIR, f));
          removed++;
        }
      } catch {
        /* nothing cached */
      }
      return `Cleared ${removed} cached response(s). The next call fetches fresh data from Figma.`;
    },
  },
  {
    name: "figma_comments",
    description: "Read the comments on a Figma file, which often contain design notes and explanations.",
    inputSchema: {
      type: "object",
      properties: { fileKey: { type: "string" } },
      required: ["fileKey"],
    },
    handler: async ({ fileKey }) => {
      const key = resolveFileKey(fileKey);
      try {
        const data = (await api(`/files/${key}/comments`)).body;
        const list = data.comments || [];
        if (!list.length) return "No comments on this file.";
        return list
          .map(
            (c) =>
              `[${c.created_at?.slice(0, 10) || ""}] ${c.user?.handle || "?"} at ${c.client_meta?.x ?? "?"},${c.client_meta?.y ?? "?"}: ${c.message}`
          )
          .join("\n");
      } catch (e) {
        return `Could not read comments: ${e.message} (this needs the file_comments:read scope)`;
      }
    },
  },
];

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function reply(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function replyError(id, message) {
  send({ jsonrpc: "2.0", id, error: { code: -32000, message } });
}

async function handle(msg) {
  const { id, method, params } = msg;

  if (method === "initialize") {
    return reply(id, {
      protocolVersion: params?.protocolVersion || PROTOCOL_FALLBACK,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "figma-bridge", version: "1.0.0" },
      instructions:
        "Pull Figma designs as text. Use figma_outline to find node ids, then figma_node for the detailed layer tree.",
    });
  }
  if (method === "ping") return reply(id, {});
  if (method === "notifications/initialized" || method === "notifications/cancelled") return;

  if (method === "tools/list") {
    return reply(id, {
      tools: TOOLS.map(({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
      })),
    });
  }

  if (method === "tools/call") {
    const tool = TOOLS.find((t) => t.name === params?.name);
    if (!tool) return replyError(id, `Unknown tool: ${params?.name}`);
    try {
      const text = await tool.handler(params.arguments || {});
      return reply(id, { content: [{ type: "text", text }] });
    } catch (e) {
      return reply(id, {
        content: [{ type: "text", text: `Error: ${e.message}` }],
        isError: true,
      });
    }
  }

  if (id != null) replyError(id, `Method not found: ${method}`);
}

const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    return;
  }
  Promise.resolve(handle(msg)).catch((e) => {
    if (msg && msg.id != null) replyError(msg.id, e.message);
  });
});