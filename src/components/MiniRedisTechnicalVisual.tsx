"use client";

import React, { useState } from "react";
import { Terminal, Database, HardDrive, RefreshCw, Server, Send } from "lucide-react";

interface KeyEntry {
  key: string;
  value: string;
  type: string;
  ttl: string;
  lru: "MRU" | "ACTIVE" | "LRU";
}

export default function MiniRedisTechnicalVisual() {
  const [activeTab, setActiveTab] = useState<"console" | "durability" | "psync">("console");
  
  // Interactive Console State
  const [commandInput, setCommandInput] = useState("");
  const [respOutput, setRespOutput] = useState<{
    cmd: string;
    rawResp: string;
    serverReply: string;
    timeMs: string;
  }>({
    cmd: 'SET user:session "auth_token_984f"',
    rawResp: "*3\\r\\n$3\\r\\nSET\\r\\n$12\\r\\nuser:session\\r\\n$15\\r\\nauth_token_984f\\r\\n",
    serverReply: "+OK\\r\\n",
    timeMs: "0.14ms",
  });

  const [keyspace, setKeyspace] = useState<KeyEntry[]>([
    { key: "user:session", value: '"auth_token_984f"', type: "string", ttl: "3600s", lru: "MRU" },
    { key: "cart:counter", value: "4", type: "int", ttl: "persistent", lru: "ACTIVE" },
    { key: "leaderboard:top", value: '"vnit_flagship"', type: "string", ttl: "120s", lru: "ACTIVE" },
    { key: "cache:metrics", value: '"{p99: 1.2ms}"', type: "json", ttl: "persistent", lru: "LRU" },
  ]);

  // Durability tab state
  const [aofSyncPolicy, setAofSyncPolicy] = useState<"everysec" | "always" | "no">("everysec");
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteCompleted, setRewriteCompleted] = useState(false);

  // Replication tab state
  const [replicaRole, setReplicaRole] = useState<"slave" | "master">("slave");

  const runSampleCommand = (cmd: string) => {
    setCommandInput(cmd);
    const upper = cmd.trim().toUpperCase();

    if (upper.startsWith("SET")) {
      const parts = cmd.split(" ");
      const key = parts[1] || "key:sample";
      const val = parts.slice(2).join(" ") || '"sample_value"';
      setRespOutput({
        cmd: cmd,
        rawResp: `*3\\r\\n$3\\r\\nSET\\r\\n$${key.length}\\r\\n${key}\\r\\n$${val.length}\\r\\n${val}\\r\\n`,
        serverReply: "+OK\\r\\n",
        timeMs: "0.12ms",
      });
      setKeyspace((prev) => [
        { key, value: val, type: "string", ttl: "persistent", lru: "MRU" },
        ...prev.filter((k) => k.key !== key).slice(0, 3),
      ]);
    } else if (upper.startsWith("GET")) {
      const parts = cmd.split(" ");
      const key = parts[1] || "user:session";
      const existing = keyspace.find((k) => k.key === key);
      const val = existing ? existing.value : '"auth_token_984f"';
      setRespOutput({
        cmd: cmd,
        rawResp: `*2\\r\\n$3\\r\\nGET\\r\\n$${key.length}\\r\\n${key}\\r\\n`,
        serverReply: `$${val.replace(/"/g, "").length}\\r\\n${val.replace(/"/g, "")}\\r\\n`,
        timeMs: "0.08ms",
      });
    } else if (upper.startsWith("BGREWRITEAOF")) {
      setRespOutput({
        cmd: "BGREWRITEAOF",
        rawResp: "*1\\r\\n$12\\r\\nBGREWRITEAOF\\r\\n",
        serverReply: "+Background append only file rewriting started\\r\\n",
        timeMs: "0.25ms",
      });
    } else if (upper.startsWith("SAVE")) {
      setRespOutput({
        cmd: "SAVE",
        rawResp: "*1\\r\\n$4\\r\\nSAVE\\r\\n",
        serverReply: "+OK (dump.rdb binary snapshot written & synced)\\r\\n",
        timeMs: "0.41ms",
      });
    } else if (upper.startsWith("ROLE")) {
      setRespOutput({
        cmd: "ROLE",
        rawResp: "*1\\r\\n$4\\r\\nROLE\\r\\n",
        serverReply: "*3\\r\\n$6\\r\\nmaster\\r\\n:842910\\r\\n*1\\r\\n[127.0.0.1:6380, offset: 842910]\\r\\n",
        timeMs: "0.09ms",
      });
    } else {
      setRespOutput({
        cmd: cmd,
        rawResp: `*${cmd.split(" ").length}\\r\\n...[RESP wire stream]...\\r\\n`,
        serverReply: "+OK\\r\\n",
        timeMs: "0.15ms",
      });
    }
  };

  const handleRewriteAof = () => {
    setIsRewriting(true);
    setRewriteCompleted(false);
    setTimeout(() => {
      setIsRewriting(false);
      setRewriteCompleted(true);
    }, 900);
  };

  return (
    <div className="w-full bg-[var(--terminal-bg)] text-[var(--terminal-text)] border-2 border-[var(--border-strong)] shadow-2xl overflow-hidden font-mono select-none">
      {/* Top Window Header */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[var(--text-primary)] font-bold tracking-wider">
              MINIREDIS // TCP :6379
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 border border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => setActiveTab("console")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "console"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>RESP Console</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("durability")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "durability"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <HardDrive className="w-3 h-3" />
            <span>AOF + RDB</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("psync")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "psync"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Server className="w-3 h-3" />
            <span>PSYNC</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE RESP CONSOLE & KEYSPACE */}
      {activeTab === "console" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          {/* Quick Command Chips */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              <span>INTERACTIVE RESP CLIENT // CLICK TO DISPATCH OVER TCP:</span>
              <span className="text-[var(--accent)] font-bold">RAW BYTE FRAMING</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'SET user:session "auth_token_984f"',
                "GET user:session",
                'SET cart:counter 5',
                "BGREWRITEAOF",
                "SAVE",
                "ROLE",
              ].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runSampleCommand(cmd)}
                  className="px-2 py-1 bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-[#111111] text-[var(--text-primary)] border border-[var(--border-color)] text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer"
                >
                  $ {cmd}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (commandInput.trim()) {
                  runSampleCommand(commandInput.trim());
                }
              }}
              className="pt-1 flex items-center gap-1.5"
            >
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-2.5 text-[var(--accent)] font-bold text-xs select-none">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder='e.g. SET cache:user "active" or GET user:session'
                  className="w-full pl-6 pr-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[11px] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[var(--accent)] text-[#111111] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                <span>RUN</span>
                <Send className="w-2.5 h-2.5" />
              </button>
            </form>
          </div>

          {/* Wire Protocol Trace Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Outgoing Raw RESP Request */}
            <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-1">
                <span className="text-[var(--accent)] font-bold">CLIENT WIRE STREAM (RESP 2.0)</span>
                <span>TCP TX</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div className="text-[var(--text-muted)]">Command: <span className="text-[var(--text-primary)] font-bold">{respOutput.cmd}</span></div>
                <div className="p-2 bg-[var(--terminal-bg)] border border-[var(--border-color)]/60 text-[#10B981] break-all leading-tight">
                  {respOutput.rawResp}
                </div>
              </div>
            </div>

            {/* Incoming Server Response */}
            <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-1">
                <span className="text-[#10B981] font-bold">MINIREDIS SERIALIZED REPLY</span>
                <span>LATENCY: {respOutput.timeMs}</span>
              </div>
              <div className="text-[11px] font-mono space-y-1">
                <div className="text-[var(--text-muted)]">Parsed Result: <span className="text-[#10B981] font-bold">OK / Value</span></div>
                <div className="p-2 bg-[var(--terminal-bg)] border border-[var(--border-color)]/60 text-[var(--text-primary)] break-all leading-tight">
                  {respOutput.serverReply}
                </div>
              </div>
            </div>
          </div>

          {/* Live In-Memory Keyspace & LRU Cache Table */}
          <div className="p-3 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold">
                <Database className="w-3 h-3 text-[var(--accent)]" />
                <span>IN-MEMORY KEYSPACE (sync.RWMutex + LRU List)</span>
              </span>
              <span className="text-[var(--accent)] font-bold">O(1) CONSTANT TIME LOOKUP</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono">
                <thead>
                  <tr className="text-[10px] text-[var(--text-muted)] border-b border-[var(--border-color)]">
                    <th className="pb-1.5">KEY</th>
                    <th className="pb-1.5">VALUE</th>
                    <th className="pb-1.5">TTL</th>
                    <th className="pb-1.5 text-right">LRU EVICTION ORDER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]/40 text-[var(--text-secondary)]">
                  {keyspace.map((k, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-primary)]/40">
                      <td className="py-1 text-[var(--accent)] font-bold">{k.key}</td>
                      <td className="py-1 text-[var(--text-primary)] truncate max-w-[140px]">{k.value}</td>
                      <td className="py-1 text-[10px] text-[var(--text-muted)]">{k.ttl}</td>
                      <td className="py-1 text-right">
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold ${
                          k.lru === "MRU" ? "bg-[var(--accent)] text-[#111111]" : "bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)]"
                        }`}>
                          {k.lru}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Engine Real-Time Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px]">
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[9px]">BENCHMARK OPS</span>
              <span className="font-bold text-[var(--accent)] block mt-0.5">100K+ req/s</span>
            </div>
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[9px]">CONCURRENCY</span>
              <span className="font-bold text-[var(--text-primary)] block mt-0.5">250+ Clients</span>
            </div>
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[9px]">P99 LATENCY</span>
              <span className="font-bold text-[#10B981] block mt-0.5">1.2ms (p99)</span>
            </div>
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[9px]">STORAGE MODEL</span>
              <span className="font-bold text-[var(--text-primary)] block mt-0.5">Hash + LRU DLL</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HYBRID STORAGE & DURABILITY (AOF + RDB) */}
      {activeTab === "durability" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          {/* Durability Pipeline Explanation */}
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-2">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <HardDrive className="w-3.5 h-3.5" />
              <span>HYBRID PERSISTENCE ENGINE ARCHITECTURE</span>
            </span>
            <span>CRASH SAFETY & ZERO LOSS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Box 1: Append-Only File (AOF) */}
            <div className="p-3.5 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 bg-[var(--accent)] text-[#111111] text-[9px] font-black uppercase">
                  AOF LOG ENGINE
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">appendonly.aof</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Logs state-changing commands (`SET`, `DEL`, `EXPIREAT`) sequentially as RESP byte buffers.
              </p>
              <div className="space-y-1 pt-1 border-t border-[var(--border-color)]/60 text-[10px]">
                <div className="text-[var(--text-muted)]">Configurable fsync policy:</div>
                <div className="flex items-center gap-1 pt-0.5">
                  {(["always", "everysec", "no"] as const).map((pol) => (
                    <button
                      key={pol}
                      type="button"
                      onClick={() => setAofSyncPolicy(pol)}
                      className={`px-1.5 py-0.5 text-[9px] font-bold uppercase transition-colors cursor-pointer border ${
                        aofSyncPolicy === pol
                          ? "bg-[#10B981] text-[#111111] border-[#10B981]"
                          : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)]"
                      }`}
                    >
                      {pol}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 2: Online BGREWRITEAOF */}
            <div className="p-3.5 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 bg-[var(--border-color)] text-[var(--text-primary)] text-[9px] font-bold uppercase">
                  AOF COMPACTION
                </span>
                <span className="text-[10px] text-[#10B981] font-bold">NON-BLOCKING</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Compacts 10,000+ incremental mutations into minimal live memory state using 3-phase `rewriteBuf`.
              </p>
              <div className="pt-1 border-t border-[var(--border-color)]/60">
                <button
                  type="button"
                  onClick={handleRewriteAof}
                  disabled={isRewriting}
                  className="w-full py-1.5 px-2 bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] border border-[var(--border-color)] text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isRewriting ? "animate-spin text-[var(--accent)]" : ""}`} />
                  <span>{isRewriting ? "Compacting Log..." : rewriteCompleted ? "✓ Log Compacted (100% Valid)" : "Trigger BGREWRITEAOF"}</span>
                </button>
              </div>
            </div>

            {/* Box 3: Binary Snapshots (SAVE / dump.rdb) */}
            <div className="p-3.5 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 bg-[var(--border-color)] text-[var(--text-primary)] text-[9px] font-bold uppercase">
                  RDB SNAPSHOT
                </span>
                <span className="text-[10px] text-[var(--accent)] font-bold">dump.rdb</span>
              </div>
              <div className="text-[10px] space-y-1 font-mono text-[var(--text-secondary)]">
                <div>MAGIC: <span className="text-[var(--text-primary)] font-bold">&quot;MINIREDB&quot; (8B)</span></div>
                <div>AOF_OFFSET: <span className="text-[#10B981]">0x004F2A10</span></div>
                <div>CHECKSUM: <span className="text-[var(--accent)]">CRC32 IEEE (4B)</span></div>
                <div>WRITE: <span className="text-[var(--text-primary)]">Atomic os.Rename</span></div>
              </div>
            </div>
          </div>

          {/* Recovery Architecture Sequence */}
          <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1 text-xs">
            <span className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider block">
              TWO-TIER RECOVERY STRATEGY ON SERVER BOOT:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-[var(--text-secondary)]">
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="font-bold text-[var(--text-primary)] block">Step 1: Point-in-Time RDB Load</span>
                <span className="text-[10px] text-[var(--text-muted)]">Deserializes dump.rdb with CRC32 integrity check &amp; reads AOF offset milestone.</span>
              </div>
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="font-bold text-[var(--text-primary)] block">Step 2: Incremental AOF Seek</span>
                <span className="text-[10px] text-[var(--text-muted)]">Seeks appendonly.aof directly to offset and replays only the recent tail mutations.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PSYNC REPLICATION TOPOLOGY */}
      {activeTab === "psync" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-2">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>PRIMARY-REPLICA DISTRIBUTED REPLICATION ENGINE</span>
            </span>
            <span className="text-[#10B981] font-bold">PSYNC + RING BACKLOG</span>
          </div>

          {/* Primary & Replica Nodes visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Master Node */}
            <div className="p-3.5 bg-[var(--bg-surface)]/90 border-2 border-[var(--accent)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">PRIMARY // NODE_01</span>
                </div>
                <span className="px-2 py-0.5 bg-[var(--accent)] text-[#111111] text-[9px] font-black uppercase">
                  ROLE: MASTER
                </span>
              </div>
              
              <div className="space-y-1 text-[11px] font-mono text-[var(--text-secondary)]">
                <div>BIND: <span className="text-[var(--text-primary)]">127.0.0.1:6379</span></div>
                <div>REPLID: <span className="text-[var(--accent)] font-semibold">92a8fc17b40108ec...</span></div>
                <div>STREAM OFFSET: <span className="text-[#10B981] font-bold">842,910 bytes</span></div>
                <div>CIRCULAR BACKLOG: <span className="text-[var(--text-primary)]">1MB Ring Buffer (Active)</span></div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)]">
                Streams mutating commands in real-time to all connected replica goroutines.
              </div>
            </div>

            {/* Replica Node */}
            <div className="p-3.5 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">REPLICA // NODE_02</span>
                </div>
                <span className="px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[9px] font-bold uppercase">
                  ROLE: {replicaRole.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1 text-[11px] font-mono text-[var(--text-secondary)]">
                <div>BIND: <span className="text-[var(--text-primary)]">127.0.0.1:6380</span></div>
                <div>PRIMARY HOST: <span className="text-[var(--text-primary)]">127.0.0.1:6379</span></div>
                <div>SYNC VERDICT: <span className="text-[#10B981] font-bold">+CONTINUE (Partial Resync)</span></div>
                <div>READ-ONLY ENFORCEMENT: <span className="text-[var(--accent)]">Mutations Blocked</span></div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setReplicaRole((r) => (r === "slave" ? "master" : "slave"))}
                  className="px-2 py-1 bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] border border-[var(--border-color)] text-[10px] font-bold uppercase transition-colors cursor-pointer"
                >
                  $ REPLICAOF {replicaRole === "slave" ? "NO ONE (Promote)" : "127.0.0.1 6379"}
                </button>
              </div>
            </div>
          </div>

          {/* PSYNC Protocol Handshake Workflow */}
          <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5 font-mono text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">
              HANDSHAKE &amp; ZERO-DOWNTIME RECONNECTION PROTOCOL:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[var(--text-secondary)]">
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] font-bold text-[var(--text-primary)]">
                1. PING
              </span>
              <span className="text-[var(--accent)]">→</span>
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] font-bold text-[var(--text-primary)]">
                2. REPLCONF port
              </span>
              <span className="text-[var(--accent)]">→</span>
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] font-bold text-[var(--text-primary)]">
                3. PSYNC &lt;replid&gt; &lt;offset&gt;
              </span>
              <span className="text-[var(--accent)]">→</span>
              <span className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/40 font-bold">
                4. +CONTINUE Stream
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
