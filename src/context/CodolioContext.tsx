"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CodolioPlatformStats {
  leetcode: {
    handle: string;
    rating: number;
    badge: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    activeDays: number;
    maxStreak: number;
    url: string;
  };
  codechef: {
    handle: string;
    rating: number;
    maxRating: number;
    stars: number;
    starsString: string;
    totalSolved: number;
    url: string;
  };
  geeksforgeeks: {
    handle: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    url: string;
  };
}

export interface CodolioData {
  profileName: string;
  fullName: string;
  profileViews: number;
  totalSolved: number;
  totalSolvedString: string;
  platforms: CodolioPlatformStats;
  codolioUrl: string;
  updatedAt: string;
}

const DEFAULT_CODOLIO_DATA: CodolioData = {
  profileName: "theomkarmore",
  fullName: "Omkar More",
  profileViews: 204,
  totalSolved: 980,
  totalSolvedString: "980+",
  platforms: {
    leetcode: {
      handle: "theomkarmore",
      rating: 1860,
      badge: "Knight",
      totalSolved: 835,
      easy: 219,
      medium: 497,
      hard: 119,
      activeDays: 301,
      maxStreak: 60,
      url: "https://leetcode.com/u/theomkarmore/",
    },
    codechef: {
      handle: "theomkarmore",
      rating: 1590,
      maxRating: 1623,
      stars: 2,
      starsString: "2★",
      totalSolved: 39,
      url: "https://www.codechef.com/users/theomkarmore",
    },
    geeksforgeeks: {
      handle: "pokemaxguwqp",
      totalSolved: 106,
      easy: 34,
      medium: 47,
      hard: 3,
      url: "https://www.geeksforgeeks.org/user/pokemaxguwqp/",
    },
  },
  codolioUrl: "https://codolio.com/profile/theomkarmore",
  updatedAt: new Date().toISOString(),
};

interface CodolioContextType {
  data: CodolioData;
  isLive: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const CodolioContext = createContext<CodolioContextType>({
  data: DEFAULT_CODOLIO_DATA,
  isLive: false,
  isLoading: false,
  refresh: async () => {},
});

export function CodolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CodolioData>(DEFAULT_CODOLIO_DATA);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // Always fetch latest data from /api/codolio which proxies Codolio API with 5min revalidation
      const res = await fetch("/api/codolio", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data) {
          setData(json.data);
          setIsLive(true);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live Codolio data, using verified baseline:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Poll every 5 minutes while active tab
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <CodolioContext.Provider value={{ data, isLive, isLoading, refresh: fetchStats }}>
      {children}
    </CodolioContext.Provider>
  );
}

export function useCodolio() {
  return useContext(CodolioContext);
}
