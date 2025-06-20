import { getNewsByDojoId } from "@/actions";
import { auth } from "@/auth.config";
import { NewsHeader, NewsList } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Noticias'
}

export default async function NewsPage() {

    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    const news = await getNewsByDojoId(session.user.dojo?.id || "")

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <NewsHeader isMaster />
                <NewsList news={news} />
            </div>
        </div>
    )
}
