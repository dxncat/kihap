"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Shield, Lock, LogIn, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { titleFont } from "@/config/fonts"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col">
            {/* Navigation */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src={"/images/favicon.ico"}
                                alt="Kihap Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </div>
                        <div className="size-8">
                            <span className={`${titleFont.className} text-4xl font-bold text-white`}>KIHAP</span>
                        </div>
                    </Link>
                </div>
            </nav>

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="relative w-48 h-48 mx-auto mb-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                                    <Lock className="w-12 h-12 text-white" />
                                </div>
                            </div>
                            <div className="absolute -bottom-4 left-0 right-0 text-center">
                                <span className="text-5xl font-bold text-white">401</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Acceso Restringido!</h1>
                        <p className="text-white/70 text-lg mb-8">
                            No tienes permisos para acceder a esta página. Por favor inicia sesión o contacta con un administrador.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                            >
                                <Link href="/auth" className="flex items-center">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Iniciar Sesión
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Link href="/" className="flex items-center">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Volver al inicio
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-12 text-white/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <Link href="/" className="hover:text-white transition-colors">
                            Volver a la página anterior
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
