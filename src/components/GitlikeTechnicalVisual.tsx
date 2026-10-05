"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, FileCode, Layers, Database, Hash, HardDrive } from "lucide-react";

export default function GitlikeTechnicalVisual() {
  const [activeTab, setActiveTab] = useState<"arch" | "code">("arch");

  return (
    <div className="w-full bg-[var(--terminal-bg)] text-[var(--terminal-text)] border-2 border-[var(--border-strong)] shadow-2xl overflow-hidden font-mono select-none">
      {/* Top Editorial Window Header */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="text-[var(--text-primary)] font-bold tracking-wider">
            <span className="hidden sm:inline">GITLIKE // SYSTEMS WORKBENCH</span>
            <span className="sm:hidden">GITLIKE // CLI</span>
          </span>
        </div>

        {/* Tab Controls: Streamlined to DAG Architecture and Python Engine */}
        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 border border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => setActiveTab("arch")}
            className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "arch"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">DAG Architecture</span>
            <span className="sm:hidden">DAG</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "code"
                ? "bg-[var(--accent)] text-[#111111]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <FileCode className="w-3 h-3" />
            <span className="hidden sm:inline">Python Engine</span>
            <span className="sm:hidden">Engine</span>
          </button>
        </div>
      </div>

      {/* Main Systems Display: Either DAG Architecture or Python Engine */}
      {activeTab === "arch" ? (
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Content Addressable Storage Flowchart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] uppercase tracking-wider pb-2 border-b border-[var(--border-color)]/40">
              <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
                <Database className="w-3.5 h-3.5" />
                <span>CONTENT-ADDRESSABLE OBJECT MODEL</span>
              </span>
              <span>SHA-1 KEYED STORAGE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Commit Object Card */}
              <div className="p-4 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[var(--accent)] text-[#111111] text-[10px] font-black uppercase">
                    COMMIT NODE
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">DAG ROOT</span>
                </div>
                <div className="text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div className="text-[var(--text-primary)] font-bold flex items-center gap-1">
                    <GitCommit className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>sha1: 9a4f28c...</span>
                  </div>
                  <div className="pl-4 border-l border-[var(--border-color)] space-y-0.5 text-[10px]">
                    <div>tree: 3c8e19b...</div>
                    <div>parent: 7f12a04...</div>
                    <div>author: Omkar More</div>
                    <div className="text-[var(--accent)] font-semibold">&quot;init repository tree&quot;</div>
                  </div>
                </div>
              </div>

              {/* Tree Object Card */}
              <div className="p-4 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[var(--border-color)] text-[var(--text-primary)] text-[10px] font-bold uppercase">
                    TREE NODE
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">DIR HIERARCHY</span>
                </div>
                <div className="text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div className="text-[var(--text-primary)] font-bold flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>sha1: 3c8e19b...</span>
                  </div>
                  <div className="pl-4 border-l border-[var(--border-color)] space-y-0.5 text-[10px]">
                    <div>100644 blob 4e8b... main.py</div>
                    <div>100644 blob 1d2c... vcs.py</div>
                    <div>040000 tree 8a3f... src/</div>
                  </div>
                </div>
              </div>

              {/* Blob Object Card */}
              <div className="p-4 bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[var(--border-color)] text-[var(--text-primary)] text-[10px] font-bold uppercase">
                    BLOB NODE
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">ZLIB PAYLOAD</span>
                </div>
                <div className="text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div className="text-[var(--text-primary)] font-bold flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>sha1: 4e8b72d...</span>
                  </div>
                  <div className="pl-4 border-l border-[var(--border-color)] space-y-0.5 text-[10px]">
                    <div>header: &quot;blob 1420\0&quot;</div>
                    <div>compression: zlib deflate</div>
                    <div>path: .gitlike/objects/4e/</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Directory Tree Structure */}
          <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 text-xs">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                <HardDrive className="w-3 h-3 text-[var(--accent)]" />
                <span>INTERNAL REPOSITORY LAYOUT (.gitlike/)</span>
              </span>
              <span>COMPATIBLE WITH GIT STORAGE SPEC</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] text-[var(--text-secondary)]">
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="text-[var(--accent)] font-bold block">objects/</span>
                <span className="text-[10px] text-[var(--text-muted)]">SHA-1 zlib blobs</span>
              </div>
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="text-[var(--accent)] font-bold block">refs/heads/</span>
                <span className="text-[10px] text-[var(--text-muted)]">Branch pointers</span>
              </div>
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="text-[var(--accent)] font-bold block">HEAD</span>
                <span className="text-[10px] text-[var(--text-muted)]">ref: refs/heads/master</span>
              </div>
              <div className="p-2 border border-[var(--border-color)]/60 bg-[var(--bg-surface)]">
                <span className="text-[var(--accent)] font-bold block">index</span>
                <span className="text-[10px] text-[var(--text-muted)]">Staging binary cache</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pb-2 border-b border-[var(--border-color)]/40">
            <span className="text-[var(--accent)] font-bold">gitlike/core/repository.py</span>
            <span>PYTHON 3.11 · ZERO DEPENDENCIES</span>
          </div>

          <pre className="text-xs sm:text-[13px] leading-relaxed text-[var(--text-primary)] overflow-x-auto p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] font-mono">
            <code>
{`class Repository:
    """Content-addressable object store implementing Git primitives."""

    def __init__(self, worktree: Path):
        self.worktree = worktree
        self.gitdir = worktree / ".gitlike"

    def hash_object(self, data: bytes, obj_type: str = "blob", write: bool = True) -> str:
        """Write compressed SHA-1 object to content-addressable store."""
        header = f"{obj_type} {len(data)}\\x00".encode()
        store = header + data
        sha = hashlib.sha1(store).hexdigest()
        
        if write:
            obj_path = self.gitdir / "objects" / sha[:2] / sha[2:]
            obj_path.parent.mkdir(parents=True, exist_ok=True)
            obj_path.write_bytes(zlib.compress(store))
            
        return sha`}
            </code>
          </pre>
        </div>
      )}

      {/* Bottom Technical Spec Strip */}
      <div className="px-4 py-3 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 text-[11px] text-[var(--text-secondary)]">
        <div className="flex items-center gap-4">
          <span className="text-[var(--text-primary)] font-bold">SPECS:</span>
          <span>15+ CLI COMMANDS</span>
          <span className="text-[var(--border-color)]">·</span>
          <span>ZLIB DEFLATE</span>
          <span className="text-[var(--border-color)]">·</span>
          <span>SHA-1 HASHING</span>
        </div>
        <div className="text-[var(--accent)] font-bold">
          CONTENT-ADDRESSABLE STORAGE
        </div>
      </div>
    </div>
  );
}
