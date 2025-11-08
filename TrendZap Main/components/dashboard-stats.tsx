"use client"

interface DashboardStatsProps {
  totalValueLocked: string
  marketCount: number
  winnersCount: number
  currentTab: string
}

export function DashboardStats({ totalValueLocked, marketCount, winnersCount, currentTab }: DashboardStatsProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">Total Value Locked</p>
          <p className="text-2xl sm:text-3xl font-bold">{totalValueLocked}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">No of Markets</p>
          <p className="text-2xl sm:text-3xl font-bold">{marketCount}</p>
        </div>
        <div className="space-y-2 col-span-2 sm:col-span-1">
          <p className="text-xs sm:text-sm text-muted-foreground">Winners (24hrs)</p>
          <p className="text-2xl sm:text-3xl font-bold">{winnersCount}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border p-1">
          {["Markets", "Portfolio", "Leaderboard"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full transition text-sm ${
                currentTab === tab.toLowerCase()
                  ? "bg-foreground/10 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
