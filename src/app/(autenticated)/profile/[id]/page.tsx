import { getRankById, getRankHistory, getStudentsByDojo, getStudentsById } from "@/actions"
import { auth } from "@/auth.config"
import { StudentDojoInformation, StudentHeader, StudentProfileTabs, StudentProgressCard } from "@/components"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: 'Mi Perfil'
}

interface Props {
    params: {
        id: string;
    };
}

export default async function Profile({ params }: Props) {

    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user.role !== "MASTER" && session.user.role !== "SUPER_ADMIN") {
        redirect("/unauthorized")
    }

    const { id } = await params;

    const user = await getStudentsById(id)
    if (!user) {
        redirect("/not-found")
    }
    const rankHistory = await getRankHistory(user.id)
    const nextRank = await getRankById({ rankId: user.rankId + 1 })

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <StudentHeader rankHistory={rankHistory} user={user} />
                <StudentProgressCard user={user} nextRank={nextRank} />
                <StudentDojoInformation user={user} />
                <StudentProfileTabs user={user} rankHistory={rankHistory} nextRank={nextRank} />
            </div>
        </div>
    )
}
