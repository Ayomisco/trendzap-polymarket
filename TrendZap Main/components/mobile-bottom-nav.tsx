"use client"

import { BarChart3, Wallet, Trophy, Plus, Home } from "lucide-react"

interface MobileBottomNavProps {
  currentPage: string
  onNavigate: (page: "markets" | "portfolio" | "leaderboard") => void
}

export default function MobileBottomNav({ currentPage, onNavigate }: MobileBottomNavProps) {
  const navItems = [
    { label: "Markets", id: "markets", icon: BarChart3 },
    { label: "Portfolio", id: "portfolio", icon: Wallet },
    { label: "Create", id: "create", icon: Plus },
    { label: "Leaderboard", id: "leaderboard", icon: Trophy },
    { label: "Home", id: "home", icon: Home },
  ]

  const handleClick = (id: string) => {
    if (id === "create") {
      // Trigger create prediction modal
      const event = new CustomEvent("openCreateModal")
      window.dispatchEvent(event)
    } else {
      onNavigate(id as "markets" | "portfolio" | "leaderboard")
    }
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition ${
                  isActive && item.id !== "create"
                    ? "text-primary border-t-2 border-primary -mt-[2px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${item.id === "create" ? "text-accent" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <div className="md:hidden h-20" />
    </>
  )
}
