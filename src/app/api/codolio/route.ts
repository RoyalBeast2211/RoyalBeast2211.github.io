import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const res = await fetch(
      "https://api.codolio.com/profile?userKey=theomkarmore",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
          Accept: "application/json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Codolio API returned ${res.status}`);
    }

    const json = await res.json();
    const data = json.data;

    const platforms = data?.platformProfiles?.platformProfiles || [];
    const leetcodeObj = platforms.find((p: { platform: string }) => p.platform === "leetcode");
    const codechefObj = platforms.find((p: { platform: string }) => p.platform === "codechef");
    const gfgObj = platforms.find((p: { platform: string }) => p.platform === "geeksforgeeks");

    const lcSolved =
      leetcodeObj?.totalQuestionStats?.totalQuestionCounts ?? 835;
    const lcEasy = leetcodeObj?.totalQuestionStats?.easyQuestionCounts ?? 219;
    const lcMedium =
      leetcodeObj?.totalQuestionStats?.mediumQuestionCounts ?? 497;
    const lcHard = leetcodeObj?.totalQuestionStats?.hardQuestionCounts ?? 119;
    const lcRating = leetcodeObj?.userStats?.currentRating ?? 1860;
    const lcBadge = leetcodeObj?.userStats?.contestBadgeName ?? "Knight";
    const lcActiveDays =
      leetcodeObj?.dailyActivityStatsResponse?.totalActiveDays ?? 301;
    const lcStreak =
      leetcodeObj?.dailyActivityStatsResponse?.maxStreak ?? 60;

    const gfgSolved = gfgObj?.totalQuestionStats?.totalQuestionCounts ?? 106;
    const gfgEasy = gfgObj?.totalQuestionStats?.easyQuestionCounts ?? 34;
    const gfgMedium = gfgObj?.totalQuestionStats?.mediumQuestionCounts ?? 47;
    const gfgHard = gfgObj?.totalQuestionStats?.hardQuestionCounts ?? 3;

    const ccSolved = codechefObj?.totalQuestionStats?.totalQuestionCounts ?? 39;
    const ccRating = codechefObj?.userStats?.currentRating ?? 1590;
    const ccMaxRating = codechefObj?.userStats?.maxRating ?? 1623;
    const ccStars = codechefObj?.userStats?.stars ?? 2;

    const totalSolved = lcSolved + gfgSolved + ccSolved;

    return NextResponse.json({
      success: true,
      isLive: true,
      data: {
        profileName: data?.profileName || "theomkarmore",
        fullName: `${data?.firstName || "Omkar"} ${data?.secondName || "More"}`.trim(),
        profileViews: data?.profileViews || 204,
        totalSolved,
        totalSolvedString: `${totalSolved}+`,
        platforms: {
          leetcode: {
            handle: leetcodeObj?.userStats?.handle || "theomkarmore",
            rating: lcRating,
            badge: lcBadge,
            totalSolved: lcSolved,
            easy: lcEasy,
            medium: lcMedium,
            hard: lcHard,
            activeDays: lcActiveDays,
            maxStreak: lcStreak,
            url: "https://leetcode.com/u/theomkarmore/",
          },
          codechef: {
            handle: codechefObj?.userStats?.handle || "theomkarmore",
            rating: ccRating,
            maxRating: ccMaxRating,
            stars: ccStars,
            starsString: `${ccStars}★`,
            totalSolved: ccSolved,
            url: "https://www.codechef.com/users/theomkarmore",
          },
          geeksforgeeks: {
            handle: gfgObj?.userStats?.handle || "pokemaxguwqp",
            totalSolved: gfgSolved,
            easy: gfgEasy,
            medium: gfgMedium,
            hard: gfgHard,
            url: "https://www.geeksforgeeks.org/user/pokemaxguwqp/",
          },
        },
        codolioUrl: "https://codolio.com/profile/theomkarmore",
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    console.warn("Codolio API route fetch error, using latest cached fallback:", err);
    return NextResponse.json({
      success: true,
      isLive: false,
      data: {
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
      },
    });
  }
}
