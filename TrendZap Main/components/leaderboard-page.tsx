"use client"

import { Trophy } from "lucide-react"

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, username: "PredictorKing", wins: 342, tokens: "125,400", streak: 12, badge: "🏆" },
    { rank: 2, username: "ViralHunter", wins: 289, tokens: "98,750", streak: 8, badge: "🥈" },
    { rank: 3, username: "TrendMaster", wins: 267, tokens: "87,320", streak: 6, badge: "🥉" },
    { rank: 4, username: "SocialGuru", wins: 245, tokens: "76,500", streak: 5, badge: "🌟" },
    { rank: 5, username: "InfluenceAI", wins: 223, tokens: "65,800", streak: 4, badge: "⭐" },
    { rank: 47, username: "You", wins: 87, tokens: "15,420", streak: 3, badge: "🎯", isUser: true },
  ]

  const badges = [
    { name: "Perfect Streak", description: "10 correct predictions in a row" },
    { name: "Viral Prophet", description: "Predicted 5 videos that went viral" },
    { name: "Volume Leader", description: "Highest trading volume in a week" },
    { name: "Accuracy Master", description: "Maintained 75%+ accuracy for 30 days" },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Compete with top predictors worldwide</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((player) => (
          <div key={player.rank} className="glassmorphic p-6 rounded-lg text-center space-y-4 border border-primary/30">
            <div className="text-4xl">{player.badge}</div>
            <div>
              <p className="text-lg font-bold">{player.username}</p>
              <p className="text-2xl font-bold gradient-text">{player.tokens}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 py-3 border-y border-border">
              <div>
                <p className="text-xs text-muted-foreground">Wins</p>
                <p className="font-bold">{player.wins}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="font-bold">{player.streak}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="glassmorphic p-8 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold">All Time Rankings</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Player</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Wins</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Tokens</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player) => (
                <tr
                  key={player.rank}
                  className={`border-b border-border/30 hover:bg-card/50 transition ${
                    player.isUser ? "bg-primary/10" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{player.badge}</span>
                      <span className="font-bold text-lg">#{player.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">{player.username}</td>
                  <td className="py-4 px-4">{player.wins}</td>
                  <td className="py-4 px-4 font-bold text-accent">{player.tokens}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-semibold">
                      {player.streak}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges */}
      <div className="glassmorphic p-8 rounded-lg space-y-6">
        <h2 className="text-2xl font-bold">Achievements & Badges</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{badge.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
