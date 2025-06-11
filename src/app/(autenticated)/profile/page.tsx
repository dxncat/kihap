import { getDojoById, getMasterDojo, getRankById, getRankHistory, getSessionsByDojoId, getStudentsByDojo } from "@/actions"
import { auth } from "@/auth.config"
import { DojoInformation, Header, ProfileTabs, ProgressCard } from "@/components"
import { Rank, RankHistory } from "@/interfaces/types"
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

    let rankHistory: RankHistory[] = []
    let nextRank: Rank = { id: 0, name: "", description: "", level: 0, hoursRequired: 0 }

    if (session.user.role === "STUDENT") {
        rankHistory = await getRankHistory(session.user.student_info?.id || "")
        nextRank = await getRankById({ rankId: (session.user.rank?.id !== undefined ? session.user.rank.id + 1 : 0) })
    }

    const students = await (await getStudentsByDojo(session.user.dojo?.id || "")).length

    const isMaster = session.user.role === "MASTER" || session.user.role === "SUPER_ADMIN"
    const dojo = await getDojoById(session.user.dojo?.id || "")

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <Header rankHistory={rankHistory} user={session.user} students={students} />
                {
                    session.user.role === "STUDENT" && (
                        <ProgressCard user={session.user} nextRank={nextRank} />
                    )
                }
                {dojo && (
                    <DojoInformation dojo={dojo} isMaster={isMaster} students={students} />
                )}
                {
                    session.user.role === "STUDENT" && (
                        <ProfileTabs user={session.user} rankHistory={rankHistory} />
                    )
                }
            </div>
        </div>
    )
}
