"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Pause } from "lucide-react";

const DETERMINISTIC_INITIAL_ARRAY = [
  65, 24, 88, 35, 72, 18, 92, 45,
  82, 30, 58, 95, 20, 75, 40, 85,
  28, 62, 90, 38, 70, 22, 98, 50,
  80, 32, 60, 85, 25, 68, 42, 78,
];

const getRandomArray = () => {
  const newArr: number[] = [];
  const size = 32;
  for (let i = 0; i < size; i++) {
    newArr.push(Math.floor(Math.random() * 85) + 15);
  }
  return newArr;
};

export default function InteractiveSortingVisualizer() {
  const [array, setArray] = useState<number[]>(DETERMINISTIC_INITIAL_ARRAY);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState<"quick" | "bubble" | "insertion">("quick");
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const cancelRef = useRef(false);

  // Initialize random array on shuffle
  const generateArray = () => {
    cancelRef.current = true;
    setIsSorting(false);
    setComparing([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setArray(getRandomArray());
  };

  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort
  const runBubbleSort = async () => {
    setIsSorting(true);
    cancelRef.current = false;
    const arr = [...array];
    const n = arr.length;
    let localComps = 0;
    let localSwaps = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (cancelRef.current) return;
        setComparing([j, j + 1]);
        localComps++;
        setComparisons(localComps);
        await sleep(30);
        if (cancelRef.current) return;

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          localSwaps++;
          setSwaps(localSwaps);
          setArray([...arr]);
          await sleep(25);
          if (cancelRef.current) return;
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setComparing([]);
    setIsSorting(false);
  };

  // Insertion Sort
  const runInsertionSort = async () => {
    setIsSorting(true);
    cancelRef.current = false;
    const arr = [...array];
    const n = arr.length;
    let localComps = 0;
    let localSwaps = 0;

    for (let i = 1; i < n; i++) {
      if (cancelRef.current) return;
      const key = arr[i];
      let j = i - 1;
      setComparing([i, j]);
      await sleep(25);
      if (cancelRef.current) return;

      while (j >= 0 && arr[j] > key) {
        if (cancelRef.current) return;
        localComps++;
        localSwaps++;
        setComparisons(localComps);
        setSwaps(localSwaps);
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        setComparing([j + 1, i]);
        await sleep(30);
        if (cancelRef.current) return;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setComparing([]);
    setIsSorting(false);
  };

  // Quick Sort helper
  const runQuickSort = async () => {
    setIsSorting(true);
    cancelRef.current = false;
    const arr = [...array];
    let localComps = 0;
    let localSwaps = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (cancelRef.current) return -1;
        setComparing([j, high]);
        localComps++;
        setComparisons(localComps);
        await sleep(25);
        if (cancelRef.current) return -1;

        if (arr[j] < pivot) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          localSwaps++;
          setSwaps(localSwaps);
          setArray([...arr]);
          await sleep(20);
          if (cancelRef.current) return -1;
        }
      }
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      localSwaps++;
      setSwaps(localSwaps);
      setArray([...arr]);
      await sleep(25);
      if (cancelRef.current) return -1;
      return i + 1;
    };

    const quickSortHelper = async (low: number, high: number) => {
      if (cancelRef.current) return;
      if (low < high) {
        const pi = await partition(low, high);
        if (pi === -1 || cancelRef.current) return;
        setSortedIndices((prev) => [...prev, pi]);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      } else if (low === high) {
        setSortedIndices((prev) => [...prev, low]);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    if (!cancelRef.current) {
      setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
      setComparing([]);
      setIsSorting(false);
    }
  };

  const handleStartSort = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSorting) return;
    setSortedIndices([]);
    if (algorithm === "quick") runQuickSort();
    else if (algorithm === "bubble") runBubbleSort();
    else runInsertionSort();
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelRef.current = true;
    setIsSorting(false);
    setComparing([]);
  };

  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateArray();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full bg-[var(--bg-surface)] text-[var(--text-primary)] border-2 border-[var(--border-strong)] p-4 md:p-6 select-none font-mono shadow-xl"
    >
      {/* Top console bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-color)] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block animate-pulse" />
          <span className="text-[var(--accent)] font-bold tracking-wider">ALGOLIZER // CORE RUNTIME</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">{"· 60 FPS INTERACTIVE ENGINE"}</span>
        </div>
        <div className="flex items-center gap-4 text-[var(--text-muted)] text-[11px]">
          <span>COMP: <strong className="text-[var(--text-primary)] font-bold">{comparisons}</strong></span>
          <span>SWAPS: <strong className="text-[var(--text-primary)] font-bold">{swaps}</strong></span>
          <span>N: <strong className="text-[var(--text-primary)] font-bold">{array.length}</strong></span>
        </div>
      </div>

      {/* Bar visualizer canvas */}
      <div className="h-44 md:h-56 w-full flex items-end justify-between gap-[2px] md:gap-[3px] bg-[var(--bg-primary)] p-3 border border-[var(--border-color)] mb-4 rounded-xs">
        {array.map((val, idx) => {
          const isComp = comparing.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          let barBg = "bg-[var(--border-strong)]";
          if (isComp) barBg = "bg-[var(--accent)]";
          else if (isSorted) barBg = "bg-[var(--text-primary)]";

          return (
            <div
              key={idx}
              className="flex-1 transition-all duration-75 flex flex-col justify-end items-center"
              style={{ height: `${val}%` }}
            >
              <div
                className={`w-full h-full ${barBg} transition-colors duration-100 relative group`}
              >
                {isComp && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--accent)] font-bold">
                    ▼
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Algorithms */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Algorithm selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-primary)] p-1 border border-[var(--border-color)]">
          {(["quick", "bubble", "insertion"] as const).map((algo) => (
            <button
              key={algo}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isSorting) setAlgorithm(algo);
              }}
              disabled={isSorting}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                algorithm === algo
                  ? "bg-[var(--accent)] text-[#111111]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {algo === "quick" ? "QUICK (O(NlogN))" : algo === "bubble" ? "BUBBLE (O(N²))" : "INSERT (O(N²))"}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            disabled={isSorting}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>SHUFFLE</span>
          </button>

          {isSorting ? (
            <button
              type="button"
              onClick={handleStop}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--accent)] hover:opacity-90 text-[#111111] font-bold transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>HALT</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartSort}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RUN SORT</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
