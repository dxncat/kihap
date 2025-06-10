
import { getSessionsByDojoId } from "@/actions"
import { auth } from "@/auth.config"
import { CalendarControls, CalendarGrid, CalendarHeader, UpcomingSessions } from "@/components"
import { redirect } from "next/navigation"

export default async function CalendarPage() {

    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    const sessions = await getSessionsByDojoId({ dojoId: session.user.dojo?.id || "", rankId: session.user.rank?.id || 0 })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <CalendarHeader isMaster={session.user.role === "MASTER"} />
                <CalendarControls />


                {/* Calendar Grid */}
                <CalendarGrid sessions={sessions} />


                {/* Upcoming Sessions */}
                <UpcomingSessions session={sessions} />

            </div>
        </div>
    )
}
