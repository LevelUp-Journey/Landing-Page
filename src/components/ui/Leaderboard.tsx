import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  user: string;
  score: number;
  challenges: number;
  rankIcon: string;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    user: "AriNox",
    score: 2930,
    challenges: 245,
    rankIcon: "/assets/section3/ranks/TOP.svg",
  },
  {
    rank: 2,
    user: "Kaze",
    score: 2680,
    challenges: 198,
    rankIcon: "/assets/section3/ranks/GrandMaster.svg",
  },
  {
    rank: 3,
    user: "LunR",
    score: 2520,
    challenges: 175,
    rankIcon: "/assets/section3/ranks/Master.svg",
  },
  {
    rank: 4,
    user: "NeroX",
    score: 2320,
    challenges: 153,
    rankIcon: "/assets/section3/ranks/Diamond.svg",
  },
  {
    rank: 5,
    user: "Sora",
    score: 2180,
    challenges: 132,
    rankIcon: "/assets/section3/ranks/Platinium.svg",
  },
  {
    rank: 6,
    user: "Tenshi",
    score: 1950,
    challenges: 120,
    rankIcon: "/assets/section3/ranks/Gold.svg",
  },
  {
    rank: 7,
    user: "Rift",
    score: 1730,
    challenges: 97,
    rankIcon: "/assets/section3/ranks/Silver.svg",
  },
  {
    rank: 8,
    user: "Miko",
    score: 1520,
    challenges: 88,
    rankIcon: "/assets/section3/ranks/Bronze.svg",
  },
];

interface LeaderboardProps {
  defaultRank?: string;
  defaultUser?: string;
  defaultScore?: string;
  defaultChallenges?: string;
}

export function Leaderboard({
  defaultRank = "Rank",
  defaultUser = "User",
  defaultScore = "Score",
  defaultChallenges = "Challenges",
}: LeaderboardProps) {
  const [headers, setHeaders] = useState({
    rank: defaultRank,
    user: defaultUser,
    score: defaultScore,
    challenges: defaultChallenges,
  });

  useEffect(() => {
    const updateTranslation = async () => {
      const lang = localStorage.getItem("language") || "es";
      const translations = await import(`../../i18n/locales/${lang}.json`);

      setHeaders({
        rank: translations.default.section3.leaderboard.rank,
        user: translations.default.section3.leaderboard.user,
        score: translations.default.section3.leaderboard.score,
        challenges: translations.default.section3.leaderboard.challenges,
      });
    };

    updateTranslation();

    window.addEventListener("languagechange", updateTranslation);
    return () => window.removeEventListener("languagechange", updateTranslation);
  }, []);

  return (
    <div className="w-full bg-neutral-900 rounded-lg border border-gray-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-neutral-800">
          <TableRow className="border-b border-gray-700 hover:bg-neutral-800">
            <TableHead className="text-left text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-300">
              {headers.rank}
            </TableHead>
            <TableHead className="text-left text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-300">
              {headers.user}
            </TableHead>
            <TableHead className="text-center text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-300">
              {headers.score}
            </TableHead>
            <TableHead className="text-center text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-300">
              {headers.challenges}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow
              key={entry.rank}
              className="border-b border-gray-700 hover:bg-white/10 transition-all duration-300 ease-in-out"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
              }}
            >
              <TableCell className="py-2 px-2 sm:py-3 sm:px-4 lg:py-4 lg:px-6 text-center font-bold text-gray-300 text-[10px] sm:text-xs lg:text-base">
                {entry.rank}
              </TableCell>
              <TableCell className="py-2 px-2 sm:py-3 sm:px-4 lg:py-4 lg:px-6">
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                  <img
                    src={entry.rankIcon}
                    alt={`Rank ${entry.rank}`}
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 transition-transform duration-300 hover:scale-110"
                  />
                  <span className="font-semibold text-white text-[10px] sm:text-xs lg:text-base">
                    {entry.user}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-2 px-2 sm:py-3 sm:px-4 lg:py-4 lg:px-6 text-center font-bold text-white text-[10px] sm:text-xs lg:text-base">
                {entry.score}
              </TableCell>
              <TableCell className="py-2 px-2 sm:py-3 sm:px-4 lg:py-4 lg:px-6 text-center text-gray-300 text-[10px] sm:text-xs lg:text-base">
                {entry.challenges}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
