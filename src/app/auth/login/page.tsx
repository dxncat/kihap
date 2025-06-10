import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { FormSection } from "./components/form-section"
import { auth } from "@/auth.config"

export default async function AuthPage() {
    const session = await auth()

    console.log(!session)

    if (session) {
        redirect("/profile")
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
            {/* Navigation */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src={"/images/favicon.ico"}
                                alt="Kihap Logo"
                                width={8}
                                height={8}
                                className="w-8 h-8"
                            />
                        </div>
                        <div className="size-8">
                            <span className={`${titleFont.className} text-4xl font-bold text-white`}>KIHAP</span>
                        </div>
                    </Link>
                </div>
            </nav>

            <FormSection />
        </div>
    )
}
