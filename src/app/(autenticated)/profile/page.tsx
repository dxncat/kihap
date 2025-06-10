import { getRankById, getRankHistory, getSessionsByDojoId } from "@/actions"
import { auth } from "@/auth.config"
import { DojoInformation, Header, ProfileTabs, ProgressCard } from "@/components"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: 'Mi Perfil'
}

export default async function Profile() {

    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    const rankHistory = await getRankHistory(session.user.student_info?.id || "")
    const nextRank = await getRankById({ rankId: (session.user.rank?.id !== undefined ? session.user.rank.id + 1 : 0) })
    const seesions = await getSessionsByDojoId(session.user.dojo?.id || "")

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <Header rankHistory={rankHistory} user={session.user} />
                <ProgressCard user={session.user} nextRank={nextRank} />
                <DojoInformation user={session.user} />
                <ProfileTabs rankHistory={rankHistory} user={session.user} />
            </div>
        </div>
    )
}
