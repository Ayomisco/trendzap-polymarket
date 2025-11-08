"use client"

import { Bell, Lock, Palette, LogOut } from "lucide-react"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Notifications */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Market Updates</p>
                <p className="text-sm text-muted-foreground">Get notified when markets close</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Price Alerts</p>
                <p className="text-sm text-muted-foreground">Notify on significant price changes</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Leaderboard Updates</p>
                <p className="text-sm text-muted-foreground">Get ranked changes notifications</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Theme</Label>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">Dark</button>
                <button className="px-4 py-2 rounded-lg border border-border hover:border-primary">Light</button>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Currency</Label>
              <select className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-destructive">
            <LogOut className="w-5 h-5" />
            Danger Zone
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">These actions cannot be undone.</p>
            <Button variant="destructive" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        </Card>
      </main>

      <MobileBottomNav />
    </div>
  )
}
