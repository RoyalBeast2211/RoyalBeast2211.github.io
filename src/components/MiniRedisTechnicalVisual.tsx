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
    { key: "leaderboard:top", value: '"vnit_flagship"', type: "string", ttl: "120s", lru: "LRU" },
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
        ...prev.filter((k) => k.key !== key).slice(0, 2),
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
    <div className="w-full bg-[var(--bg-surface)] text-[var(--text-primary)] border-2 border-[var(--border-strong)] shadow-xl overflow-hidden font-mono select-none">
      {/* Top Window Header */}
      <div className="px-3 sm:px-4 py-2 bg-[var(--bg-surface-secondary)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[var(--text-primary)] font-bold tracking-wider text-[11px] sm:text-xs">
              MINIREDIS // TCP :6379
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 border border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => setActiveTab("console")}
            className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === "console"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>RESP</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("durability")}
            className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === "durability"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <HardDrive className="w-3 h-3" />
            <span>AOF+RDB</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("psync")}
            className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer ${
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
        <div className="p-3 sm:p-4 space-y-2.5">
          {/* Quick Command Chips */}
          <div className="space-y-1">
            <div className="flex flex-wrap gap-1">
              {[
                'SET user:session "984f"',
                "GET user:session",
                "BGREWRITEAOF",
                "SAVE",
                "ROLE",
              ].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runSampleCommand(cmd)}
                  className="px-1.5 py-0.5 bg-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] text-[var(--text-primary)] border border-[var(--border-color)] text-[10px] font-mono transition-colors cursor-pointer"
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
              className="pt-0.5 flex items-center gap-1.5"
            >
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-2 text-[var(--accent)] font-bold text-xs select-none">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder='Try: SET session "active" or GET user:session'
                  className="w-full pl-5 pr-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-2.5 py-1 bg-[var(--accent)] text-[#111111] font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                <span>RUN</span>
                <Send className="w-2.5 h-2.5" />
              </button>
            </form>
          </div>

          {/* Wire Protocol Trace Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {/* Outgoing Raw RESP Request */}
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-0.5">
                <span className="text-[var(--accent)] font-bold">CLIENT WIRE (RESP 2.0)</span>
                <span>TCP TX</span>
              </div>
              <div className="p-1.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)]/70 text-[#047857] dark:text-[#10B981] font-mono text-[10px] break-all leading-tight">
                {respOutput.rawResp}
              </div>
            </div>

            {/* Incoming Server Response */}
            <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-0.5">
                <span className="text-[#047857] dark:text-[#10B981] font-bold">MINIREDIS REPLY</span>
                <span>{respOutput.timeMs}</span>
              </div>
              <div className="p-1.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)]/70 text-[var(--text-primary)] font-mono text-[10px] break-all leading-tight">
                {respOutput.serverReply}
              </div>
            </div>
          </div>

          {/* In-Memory Keyspace Table */}
          <div className="p-2.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
              <span className="flex items-center gap-1 text-[var(--text-primary)] font-bold">
                <Database className="w-2.5 h-2.5 text-[var(--accent)]" />
                <span>IN-MEMORY KEYSPACE (RWMutex + LRU)</span>
              </span>
              <span className="text-[var(--accent)] font-bold">O(1) CONSTANT TIME</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] font-mono">
                <thead>
                  <tr className="text-[9px] text-[var(--text-muted)] border-b border-[var(--border-color)]">
                    <th className="pb-1">KEY</th>
                    <th className="pb-1">VALUE</th>
                    <th className="pb-1">TTL</th>
                    <th className="pb-1 text-right">LRU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]/40 text-[var(--text-secondary)]">
                  {keyspace.map((k, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-primary)]/50">
                      <td className="py-0.5 text-[var(--accent)] font-bold">{k.key}</td>
                      <td className="py-0.5 text-[var(--text-primary)] truncate max-w-[120px]">{k.value}</td>
                      <td className="py-0.5 text-[9px] text-[var(--text-muted)]">{k.ttl}</td>
                      <td className="py-0.5 text-right">
                        <span className={`px-1 py-0.2 text-[8px] font-bold ${
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

          {/* Telemetry Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5 font-mono text-[9px]">
            <div className="p-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[8px]">THROUGHPUT</span>
              <span className="font-bold text-[var(--accent)] block">697.8K req/s</span>
            </div>
            <div className="p-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[8px]">CLIENTS</span>
              <span className="font-bold text-[var(--text-primary)] block">250+ Conn</span>
            </div>
            <div className="p-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[8px]">P95 LATENCY</span>
              <span className="font-bold text-[#047857] dark:text-[#10B981] block">123.6 µs</span>
            </div>
            <div className="p-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[var(--text-muted)] block text-[8px]">PARALLEL STORE</span>
              <span className="font-bold text-[var(--text-primary)] block">34.7M ops/s</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HYBRID STORAGE & DURABILITY */}
      {activeTab === "durability" && (
        <div className="p-3 sm:p-4 space-y-2.5">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-1">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <HardDrive className="w-3 h-3" />
              <span>HYBRID PERSISTENCE ENGINE</span>
            </span>
            <span>CRASH SAFETY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-1 py-0.2 bg-[var(--accent)] text-[#111111] text-[8px] font-black uppercase">
                  AOF LOG
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">appendonly.aof</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight">
                Logs state-mutating commands as RESP arrays with background fsync.
              </p>
              <div className="flex items-center gap-1 pt-1">
                {(["always", "everysec", "no"] as const).map((pol) => (
                  <button
                    key={pol}
                    type="button"
                    onClick={() => setAofSyncPolicy(pol)}
                    className={`px-1 py-0.5 text-[8px] font-bold uppercase transition-colors cursor-pointer border ${
                      aofSyncPolicy === pol
                        ? "bg-[#10B981] text-[#111111] border-[#10B981]"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)]"
                    }`}
                  >
                    {pol}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-1 py-0.2 bg-[var(--border-color)] text-[var(--text-primary)] text-[8px] font-bold uppercase">
                  COMPACTION
                </span>
                <span className="text-[9px] text-[#047857] dark:text-[#10B981] font-bold">ONLINE</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight">
                3-phase rewriteBuf collapses duplicate mutations without dropping live writes.
              </p>
              <button
                type="button"
                onClick={handleRewriteAof}
                disabled={isRewriting}
                className="w-full py-1 px-1.5 bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-[#111111] border border-[var(--border-color)] text-[9px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isRewriting ? "animate-spin text-[var(--accent)]" : ""}`} />
                <span>{isRewriting ? "Compacting..." : rewriteCompleted ? "✓ Compacted" : "BGREWRITEAOF"}</span>
              </button>
            </div>

            <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-1 py-0.2 bg-[var(--border-color)] text-[var(--text-primary)] text-[8px] font-bold uppercase">
                  RDB SNAPSHOT
                </span>
                <span className="text-[9px] text-[var(--accent)] font-bold">dump.rdb</span>
              </div>
              <div className="text-[9px] space-y-0.5 font-mono text-[var(--text-secondary)]">
                <div>MAGIC: <span className="text-[var(--text-primary)] font-bold">&quot;MINIREDB&quot;</span></div>
                <div>OFFSET: <span className="text-[#047857] dark:text-[#10B981]">0x004F2A</span></div>
                <div>CHECKSUM: <span className="text-[var(--accent)]">CRC32 IEEE</span></div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] flex items-center justify-between">
            <span className="text-[var(--text-primary)] font-bold">BOOT RECOVERY:</span>
            <span>1. Loads dump.rdb binary snapshot</span>
            <span>→</span>
            <span>2. Seeks AOF offset to replay tail</span>
          </div>
        </div>
      )}

      {/* TAB 3: PSYNC REPLICATION */}
      {activeTab === "psync" && (
        <div className="p-3 sm:p-4 space-y-2.5">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-1">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <Server className="w-3 h-3" />
              <span>PRIMARY-REPLICA PSYNC REPLICATION</span>
            </span>
            <span className="text-[#047857] dark:text-[#10B981] font-bold">BACKLOG STREAM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-2.5 bg-[var(--bg-primary)] border-2 border-[var(--accent)] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">NODE_01 (MASTER)</span>
                </div>
                <span className="px-1.5 py-0.2 bg-[var(--accent)] text-[#111111] text-[8px] font-black uppercase">
                  6379
                </span>
              </div>
              <div className="space-y-0.5 text-[10px] font-mono text-[var(--text-secondary)]">
                <div>REPLID: <span className="text-[var(--accent)]">92a8fc17b4...</span></div>
                <div>OFFSET: <span className="text-[#047857] dark:text-[#10B981] font-bold">842,910 bytes</span></div>
                <div>BACKLOG: <span className="text-[var(--text-primary)]">1MB Circular Buffer</span></div>
              </div>
            </div>

            <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">NODE_02 ({replicaRole.toUpperCase()})</span>
                </div>
                <span className="px-1.5 py-0.2 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] text-[8px] font-bold uppercase">
                  6380
                </span>
              </div>
              <div className="space-y-0.5 text-[10px] font-mono text-[var(--text-secondary)]">
                <div>SYNC VERDICT: <span className="text-[#047857] dark:text-[#10B981] font-bold">+CONTINUE Stream</span></div>
                <div>READ-ONLY: <span className="text-[var(--accent)]">Enforced</span></div>
              </div>
              <button
                type="button"
                onClick={() => setReplicaRole((r) => (r === "slave" ? "master" : "slave"))}
                className="w-full mt-1 py-0.5 bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-[#111111] border border-[var(--border-color)] text-[9px] font-bold uppercase transition-colors cursor-pointer"
              >
                $ REPLICAOF {replicaRole === "slave" ? "NO ONE" : "127.0.0.1 6379"}
              </button>
            </div>
          </div>

          <div className="p-2 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[9px] text-[var(--text-secondary)] flex flex-wrap items-center justify-between gap-1">
            <span className="text-[var(--text-primary)] font-bold">HANDSHAKE:</span>
            <span>1. PING</span>
            <span>→</span>
            <span>2. REPLCONF port</span>
            <span>→</span>
            <span>3. PSYNC &lt;replid&gt; &lt;offset&gt;</span>
            <span>→</span>
            <span className="text-[#047857] dark:text-[#10B981] font-bold">4. +CONTINUE</span>
          </div>
        </div>
      )}
    </div>
  );
}
