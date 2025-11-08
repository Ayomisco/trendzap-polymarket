"use client"

import { Crown, Medal } from "lucide-react"

export default function Leaderboard() {
  const topPredictors = [
    { rank: 1, name: "CryptoWhiz", wins: 142, balance: 45230, badge: "crown" },
    { rank: 2, name: "TrendStalker", wins: 128, balance: 38450, badge: "medal" },
    { rank: 3, name: "SocialGuru", wins: 115, balance: 34120, badge: "medal" },
    { rank: 4, name: "DataMaster", wins: 103, balance: 29870, badge: null },
    { rank: 5, name: "ViralHunter", wins: 98, balance: 27340, badge: null },
  ]

  return (
    <div className="glassmorphic p-6 rounded-lg border border-border h-fit">
      <h3 className="text-xl font-bold mb-6">🏆 Top Predictors</h3>
      <div className="space-y-3">
        {topPredictors.map((predictor) => (
          <div
            key={predictor.rank}
            className="flex items-center justify-between p-3 rounded border border-border/50 hover:bg-card/50 transition"
          >
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  predictor.rank === 1
                    ? "bg-primary/20 text-primary"
                    : predictor.rank === 2 || predictor.rank === 3
                      ? "bg-secondary/20 text-secondary"
                      : "bg-muted"
                }`}
              >
                {predictor.rank === 1 && <Crown className="w-4 h-4" />}
                {predictor.rank === 2 && <Medal className="w-4 h-4" />}
                {predictor.rank === 3 && <Medal className="w-4 h-4" />}
                {predictor.rank > 3 && predictor.rank}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{predictor.name}</p>
                <p className="text-xs text-muted-foreground">{predictor.wins} wins</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-accent">{predictor.balance.toLocaleString()} TZP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
