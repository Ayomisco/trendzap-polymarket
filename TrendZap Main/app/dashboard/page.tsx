// Server wrapper: mark this route as dynamic (no static prerender) and render the
// client Dashboard UI. Keeping the prerender disabled avoids build-time execution
// of server-side code paths that currently cause the confusing `auth` destructure error.
export const dynamic = "force-dynamic"

import DashboardClient from "@/components/dashboard-client"

export default function Page() {
  return <DashboardClient />
}
