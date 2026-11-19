"use client";

import React, { useState } from "react";
import { Layers, GitCompare, Cpu, Box, RefreshCw, CheckCircle2 } from "lucide-react";

export default function AgenticMigratorTechnicalVisual() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "differential" | "mcp">("pipeline");
  const [selectedLayer, setSelectedLayer] = useState<0 | 1 | 2>(1);
  const [regime, setRegime] = useState<"py2to3" | "pytojava">("pytojava");
  const [isComparing, setIsComparing] = useState(false);

  const handleRunComparison = () => {
    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
    }, 800);
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
              ACM // AGENTIC MIGRATOR ENGINE
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 border border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>3-Layer Graph</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("differential")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "differential"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <GitCompare className="w-3 h-3" />
            <span>Docker Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mcp")}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "mcp"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Box className="w-3 h-3" />
            <span>MCP Protocol</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 3-LAYER ARCHITECTURE & LANGGRAPH STATE MACHINE */}
      {activeTab === "pipeline" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          {/* Top Layer Selection Controls */}
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-2">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>LANGGRAPH DETERMINISTIC MULTI-AGENT STATE MACHINE</span>
            </span>
            <span>BEHAVIORAL VERIFICATION</span>
          </div>

          {/* Interactive Layer Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 0, title: "LAYER 0", desc: "Static Analysis (AST)" },
              { id: 1, title: "LAYER 1", desc: "LangGraph Orchestrator" },
              { id: 2, title: "LAYER 2", desc: "Tiered Agent Swarm" },
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelectedLayer(l.id as 0 | 1 | 2)}
                className={`p-2.5 text-left border transition-all cursor-pointer ${
                  selectedLayer === l.id
                    ? "bg-[var(--bg-surface)] border-[var(--accent)] text-[var(--text-primary)] shadow-sm"
                    : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                }`}
              >
                <div className={`text-[10px] font-bold ${selectedLayer === l.id ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                  {l.title}
                </div>
                <div className="text-[11px] font-semibold truncate">{l.desc}</div>
              </button>
            ))}
          </div>

          {/* Dynamic Layer Deep-Dive Display */}
          {selectedLayer === 0 && (
            <div className="p-4 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase">
                  LAYER 0: REPOSITORY DECOMPOSITION &amp; CALL GRAPH EXTRACTION
                </span>
                <span className="px-2 py-0.5 bg-[var(--accent)] text-[#111111] text-[9px] font-black uppercase">
                  LIBCST &amp; TREE-SITTER
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Parses full repositories into an Abstract Syntax Tree (AST), constructs call graph dependency DAGs, and orders isolated code fragments bottom-up (leaf functions before parent callers) to ensure zero circular dependencies during LLM synthesis.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-color)]/60 text-[10px]">
                <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block text-[9px]">BUNDLE OUTPUT</span>
                  <span className="font-bold text-[var(--accent)] block mt-0.5">manifest.json</span>
                </div>
                <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block text-[9px]">DEPENDENCY DAG</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Topological Order</span>
                </div>
                <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block text-[9px]">TOOL VERIFICATION</span>
                  <span className="font-bold text-[#10B981] block mt-0.5">13/13 Tools Passed</span>
                </div>
                <div className="p-2 bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[var(--text-muted)] block text-[9px]">GRANULARITY</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Function &amp; Class</span>
                </div>
              </div>
            </div>
          )}

          {selectedLayer === 1 && (
            <div className="p-4 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase">
                  LAYER 1: DETERMINISTIC LANGGRAPH STATE ORCHESTRATION
                </span>
                <span className="px-2 py-0.5 bg-[#10B981] text-[#111111] text-[9px] font-black uppercase">
                  BOUNDED RETRIES
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Orchestrates state progression through deterministic checkpoints. Manages scheduling, passes fragments to Layer 2 agents, evaluates sandbox differential verdicts, triggers repair iterations with compiler feedback (bounded to 3 retries), and provides crash-resilient resume state.
              </p>
              {/* Interactive State Flow */}
              <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold">
                  Schedule Fragment
                </span>
                <span className="text-[var(--accent)]">→</span>
                <span className="px-2 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold">
                  Agent Translation
                </span>
                <span className="text-[var(--accent)]">→</span>
                <span className="px-2 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold">
                  Differential Test
                </span>
                <span className="text-[var(--accent)]">→</span>
                <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 font-bold">
                  Commit Target
                </span>
                <span className="text-[var(--text-muted)]">| Fail:</span>
                <span className="px-2 py-0.5 bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40 font-bold">
                  Repair Loop (≤3)
                </span>
              </div>
            </div>
          )}

          {selectedLayer === 2 && (
            <div className="p-4 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase">
                  LAYER 2: SPECIALIZED MULTI-AGENT SWARM (GROQ OPEN-WEIGHT MODELS)
                </span>
                <span className="px-2 py-0.5 bg-[var(--accent)] text-[#111111] text-[9px] font-black uppercase">
                  TIERED LLMS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[10px] text-[var(--accent)] font-bold uppercase">TRANSLATOR AGENT</div>
                  <div className="font-bold text-[var(--text-primary)] text-[11px]">gpt-oss-120b</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Synthesizes idiomatic target code conforming to target skeleton contracts.</div>
                </div>
                <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[10px] text-[#10B981] font-bold uppercase">TEST-GEN AGENT</div>
                  <div className="font-bold text-[var(--text-primary)] text-[11px]">qwen3.8-27b</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Generates targeted edge-case inputs for differential verification.</div>
                </div>
                <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[10px] text-[#3B82F6] font-bold uppercase">REPAIR AGENT</div>
                  <div className="font-bold text-[var(--text-primary)] text-[11px]">gpt-oss-20b</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Fast iterative patch generator resolving differential divergences.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DIFFERENTIAL DOCKER SANDBOX COMPARATOR */}
      {activeTab === "differential" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-2">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>ISOLATED DOCKER CONTAINER DIFFERENTIAL COMPARATOR</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRegime("pytojava")}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-colors cursor-pointer border ${
                  regime === "pytojava" ? "bg-[var(--accent)] text-[#111111] border-[var(--accent)]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)]"
                }`}
              >
                Python → Java
              </button>
              <button
                type="button"
                onClick={() => setRegime("py2to3")}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-colors cursor-pointer border ${
                  regime === "py2to3" ? "bg-[var(--accent)] text-[#111111] border-[var(--accent)]" : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)]"
                }`}
              >
                Python 2 → 3
              </button>
            </div>
          </div>

          {/* Side-by-Side Dual Sandbox Displays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left Box: Legacy Code Execution */}
            <div className="p-3 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-[10px] border-b border-[var(--border-color)]/60 pb-1">
                <span className="text-[var(--text-muted)] uppercase font-bold">CONTAINER 1: acm-sandbox/py27</span>
                <span className="px-1.5 py-0.5 bg-[var(--bg-primary)] text-[var(--text-primary)] text-[9px]">SOURCE</span>
              </div>
              <div className="p-2 bg-[var(--terminal-bg)] border border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] font-mono space-y-1">
                <div className="text-[var(--text-muted)] text-[9px]"># Legacy Implementation</div>
                <div className="text-[var(--text-primary)] font-semibold">def base64_encode(string):</div>
                <div className="pl-3 text-[var(--text-muted)]">return base64.b64encode(string).strip(b&quot;=&quot;)</div>
                <div className="pt-2 text-[10px] text-[#10B981]">
                  &gt; INPUT: b&quot;payload_session_99&quot;<br />
                  &gt; STDOUT: b&quot;cGF5bG9hZF9zZXNzaW9uXzk5&quot;<br />
                  &gt; EXIT: 0 (12ms)
                </div>
              </div>
            </div>

            {/* Right Box: Target Migrated Execution */}
            <div className="p-3 bg-[var(--bg-surface)]/90 border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between text-[10px] border-b border-[var(--border-color)]/60 pb-1">
                <span className="text-[#10B981] uppercase font-bold">
                  {regime === "pytojava" ? "CONTAINER 2: acm-sandbox/java17" : "CONTAINER 2: acm-sandbox/py3"}
                </span>
                <span className="px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981] text-[9px] font-bold">MIGRATED</span>
              </div>
              <div className="p-2 bg-[var(--terminal-bg)] border border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] font-mono space-y-1">
                <div className="text-[var(--text-muted)] text-[9px]">
                  {regime === "pytojava" ? "// Target Java Implementation" : "# Target Python 3 Implementation"}
                </div>
                <div className="text-[var(--text-primary)] font-semibold">
                  {regime === "pytojava" ? "public static byte[] base64Encode(byte[] data) {" : "def base64_encode(data: bytes) -> bytes:"}
                </div>
                <div className="pl-3 text-[var(--text-muted)]">
                  {regime === "pytojava" ? "return Base64.getUrlEncoder().withoutPadding().encode(data);" : "return base64.urlsafe_b64encode(data).rstrip(b\"=\")"}
                </div>
                <div className="pt-2 text-[10px] text-[#10B981]">
                  &gt; INPUT: b&quot;payload_session_99&quot;<br />
                  &gt; STDOUT: b&quot;cGF5bG9hZF9zZXNzaW9uXzk5&quot;<br />
                  &gt; EXIT: 0 (4ms)
                </div>
              </div>
            </div>
          </div>

          {/* Differential Comparison Verdict Box */}
          <div className="p-3 bg-[var(--bg-primary)] border-2 border-[#10B981]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#10B981] font-bold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>DIFFERENTIAL VERDICT: PASS / BEHAVIORAL EQUIVALENCE CONFIRMED</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                Trace Diff: 0 bytes divergence · Return Code: 0/0 · Stdout Diff: 0% · Zero hallucination
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunComparison}
              disabled={isComparing}
              className="px-3 py-1.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold uppercase tracking-wider text-[10px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw className={`w-3 h-3 ${isComparing ? "animate-spin" : ""}`} />
              <span>{isComparing ? "Executing Sandboxes..." : "Re-Verify Differential Sandbox"}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: MODEL CONTEXT PROTOCOL (MCP) INTEGRATION */}
      {activeTab === "mcp" && (
        <div className="p-4 sm:p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] uppercase border-b border-[var(--border-color)]/60 pb-2">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
              <Box className="w-3.5 h-3.5" />
              <span>NATIVE MODEL CONTEXT PROTOCOL (MCP) TOOL INTEGRATION</span>
            </span>
            <span className="text-[var(--text-muted)]">JSON-RPC 2.0 PROTOCOL</span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Every agent action is strictly governed by three isolated MCP servers, isolating the LLM from arbitrary host execution and enforcing deterministic filesystem mutations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--accent)]">acm-analysis</span>
                <span className="text-[9px] text-[var(--text-muted)]">MCP SERVER</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-normal">
                Serves AST symbols, call graph predecessors, type signatures, and dependency orders directly to Analyzer agents.
              </p>
              <div className="text-[9px] text-[#10B981] font-mono">tools: query_callers, get_ast_leaf</div>
            </div>

            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-primary)]">acm-workspace</span>
                <span className="text-[9px] text-[var(--text-muted)]">MCP SERVER</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-normal">
                Validates target file hierarchy, writes atomic patches, and commits accepted fragments into the target codebase repository.
              </p>
              <div className="text-[9px] text-[#10B981] font-mono">tools: patch_fragment, commit_unit</div>
            </div>

            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#10B981]">acm-sandbox</span>
                <span className="text-[9px] text-[var(--text-muted)]">MCP SERVER</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] leading-normal">
                Interfaces directly with Docker engine, injecting test payloads into dual containers with hard CPU &amp; timeout limits.
              </p>
              <div className="text-[9px] text-[#10B981] font-mono">tools: run_differential, diff_traces</div>
            </div>
          </div>

          {/* Sample MCP Call Packet */}
          <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1 text-xs">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between">
              <span>LIVE MCP JSON-RPC 2.0 PROTOCOL PACKET INSPECTOR</span>
              <span className="text-[var(--accent)] font-bold">STATUS: 200 OK</span>
            </div>
            <pre className="p-2 bg-[var(--terminal-bg)] text-[#10B981] text-[10px] font-mono overflow-x-auto leading-relaxed border border-[var(--border-color)]/60">
{`{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "acm-sandbox.run_differential",
    "arguments": {
      "fragment_id": "pallets_itsdangerous.encoding.base64_encode",
      "containers": ["acm-sandbox/py27", "acm-sandbox/java17"],
      "test_suite": "tests/differential/test_encoding.py",
      "timeout_sec": 10
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
