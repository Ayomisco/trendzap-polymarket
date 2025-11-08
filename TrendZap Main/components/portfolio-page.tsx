"use client"

import { TrendingUp, TrendingDown, Wallet, BarChart3 } from "lucide-react"

export default function PortfolioPage() {
  const positions = [
    {
      id: 1,
      creator: "@MrBeast - YouTube",
      position: "YES",
      amount: "2,500 tokens",
      value: "$3,125",
      change: "+25%",
      changeType: "gain",
      status: "Active",
    },
    {
      id: 2,
      creator: "@addison.rae - TikTok",
      position: "NO",
      amount: "1,200 tokens",
      value: "$1,320",
      change: "-12%",
      changeType: "loss",
      status: "Active",
    },
    {
      id: 3,
      creator: "@David Dobrik - YouTube",
      position: "YES",
      amount: "800 tokens",
      value: "$1,040",
      change: "+30%",
      changeType: "gain",
      status: "Settled",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Your Portfolio</h1>
        <p className="text-muted-foreground">Track your positions and earnings</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: "Total Balance", value: "$42,850", change: "+$2,450" },
          { icon: TrendingUp, label: "This Month", value: "+$4,200", change: "+18.4%" },
          { icon: BarChart3, label: "Active Positions", value: "8", change: "2 pending" },
          { icon: TrendingDown, label: "Total Invested", value: "$38,500", change: "Realized" },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="glassmorphic p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold mt-2">{item.value}</p>
                  <p className="text-xs text-secondary mt-1">{item.change}</p>
                </div>
                <Icon className="w-6 h-6 text-primary opacity-20" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Positions Table */}
      <div className="glassmorphic p-8 rounded-lg space-y-6">
        <h2 className="text-2xl font-bold">Open Positions</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Market</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Change</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="border-b border-border/30 hover:bg-card/50 transition">
                  <td className="py-4 px-4">
                    <p className="font-semibold">{position.creator}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        position.position === "YES" ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {position.position}
                    </span>
                  </td>
                  <td className="py-4 px-4">{position.amount}</td>
                  <td className="py-4 px-4 font-semibold">{position.value}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      {position.changeType === "gain" ? (
                        <TrendingUp className="w-4 h-4 text-accent" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span
                        className={
                          position.changeType === "gain"
                            ? "text-accent font-semibold"
                            : "text-destructive font-semibold"
                        }
                      >
                        {position.change}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{position.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
