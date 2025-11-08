"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppNavbarProps {
  walletAddress?: string
  balance?: number
  onDisconnect?: () => void
}

export function AppNavbar({
  walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42e3e",
  balance = 12458.75,
  onDisconnect = () => {},
}: AppNavbarProps) {
  const [notifications, setNotifications] = useState(2)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center gap-8 flex-1">
            <Link href="/dashboard" className="text-xl font-bold">
              TrendZap
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for markets..."
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Balance */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border">
              <span className="text-sm">${balance.toFixed(2)}</span>
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">Ξ</div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-card rounded-full transition">
              <Bell className="w-5 h-5" />
              {notifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />}
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-card transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                    {walletAddress.slice(2, 4).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-semibold">Connected Wallet</p>
                  <p className="text-xs text-muted-foreground">{walletAddress}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>View Statistics</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDisconnect} className="text-destructive">
                  Disconnect Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
