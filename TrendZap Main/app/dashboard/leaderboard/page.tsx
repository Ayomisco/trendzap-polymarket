"use client"

import { Medal } from "lucide-react"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { Card } from "@/components/ui/card"

const LEADERBOARD = [
  { rank: 1, username: "CryptoWizard", earnings: 45230.5, wins: 127, accuracy: 78.5, badge: "🏆" },
  { rank: 2, username: "TrendMaster", earnings: 38950.75, wins: 115, accuracy: 76.2, badge: "🥈" },
  { rank: 3, username: "VocalViper", earnings: 35420.3, wins: 108, accuracy: 74.8, badge: "🥉" },
  { rank: 4, username: "ViralProphet", earnings: 28750.2, wins: 95, accuracy: 71.5, badge: "" },
  { rank: 5, username: "MarketMaven", earnings: 24580.15, wins: 82, accuracy: 69.2, badge: "" },
  { rank: 6, username: "PredictorPro", earnings: 19320.8, wins: 71, accuracy: 67.8, badge: "" },
  { rank: 7, username: "TrendZapper", earnings: 15890.45, wins: 64, accuracy: 65.4, badge: "" },
  { rank: 8, username: "SocialScout", earnings: 12340.6, wins: 55, accuracy: 63.1, badge: "" },
]

export default function LeaderboardPage() {
  const currentUserRank = 8
  const currentUser = LEADERBOARD[currentUserRank - 1]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Podium */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERBOARD.slice(0, 3).map((player, index) => {
            const heights = ["md:h-48", "md:h-56", "md:h-40"]
            return (
              <Card
                key={player.rank}
                className={`p-6 bg-gradient-to-b from-primary/20 to-background border-primary/50 ${heights[index]} flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-2">{player.badge || ["🥇", "🥈", "🥉"][index]}</div>
                  <p className="text-xs text-muted-foreground">Rank #{player.rank}</p>
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">{player.username}</p>
                  <p className="text-2xl font-bold text-primary">${(player.earnings / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground mt-2">{player.accuracy}% Accuracy</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Full Leaderboard Table */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Full Rankings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Player</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Earnings</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Wins</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-border hover:bg-primary/5 transition ${
                      player.rank === currentUserRank ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{player.rank}</span>
                        {player.rank <= 3 && <Medal className="w-4 h-4 text-accent" />}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold">{player.username}</p>
                        {player.rank === currentUserRank && <p className="text-xs text-primary">You</p>}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">${(player.earnings / 1000).toFixed(1)}k</td>
                    <td className="py-4 px-4 text-right">{player.wins}</td>
                    <td className="py-4 px-4 text-right">{player.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Stats */}
        {currentUser && (
          <Card className="p-6 border-primary/50">
            <h3 className="text-lg font-bold mb-4">Your Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rank</p>
                <p className="text-2xl font-bold">#{currentUser.rank}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-primary">${(currentUser.earnings / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Correct Predictions</p>
                <p className="text-2xl font-bold">{currentUser.wins}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-500">{currentUser.accuracy}%</p>
              </div>
            </div>
          </Card>
        )}
      </main>

      <MobileBottomNav />
    </div>
  )
}
