"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { LoginForm } from "./components/login-form"
import { titleFont } from "@/config/fonts"

export default function AuthPage() {
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/profile")
        }
    }, [isAuthenticated, router])

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

            <div className="container mx-auto px-4 py-12">
                <motion.div
                    className="max-w-md mx-auto text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a KIHAP</h1>
                    <p className="text-white/70">
                        Inicia sesión o regístrate para acceder a todas las funciones de la plataforma
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <LoginForm />
                </motion.div>

                <motion.div
                    className="mt-8 text-center text-white/50 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p>
                        Al iniciar sesión o registrarte, aceptas nuestros{" "}
                        <Link href="/terms" className="text-red-400 hover:text-red-300">
                            Términos y Condiciones
                        </Link>{" "}
                        y{" "}
                        <Link href="/privacy" className="text-red-400 hover:text-red-300">
                            Política de Privacidad
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
