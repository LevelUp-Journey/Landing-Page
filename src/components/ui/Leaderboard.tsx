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
    user: "Sideral",
    score: 2000,
    challenges: 121,
    rankIcon: "/assets/section3/ranks/7-GrandMaster.png",
  },
  {
    rank: 2,
    user: "Bebote",
    score: 1800,
    challenges: 112,
    rankIcon: "/assets/section3/ranks/6-Master.png",
  },
  {
    rank: 3,
    user: "Patitoo",
    score: 1600,
    challenges: 100,
    rankIcon: "/assets/section3/ranks/5-Diamond.png",
  },
  {
    rank: 4,
    user: "Marina",
    score: 1500,
    challenges: 87,
    rankIcon: "/assets/section3/ranks/4-Platinium.png",
  },
  {
    rank: 5,
    user: "Pekass",
    score: 1300,
    challenges: 86,
    rankIcon: "/assets/section3/ranks/3-Gold.png",
  },
  {
    rank: 6,
    user: "User26",
    score: 1200,
    challenges: 67,
    rankIcon: "/assets/section3/ranks/2-Silver.png",
  },
  {
    rank: 7,
    user: "User27",
    score: 1000,
    challenges: 60,
    rankIcon: "/assets/section3/ranks/1-Bronze.png",
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
