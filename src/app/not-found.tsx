"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { titleFont } from "@/config/fonts"

export default function NotFoundPage() {
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
                                <span className="text-7xl font-bold text-white">404</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Página no encontrada!</h1>
                        <p className="text-white/70 text-lg mb-8">
                            Parece que has intentado acceder a una página que no existe o ha sido movida.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                            >
                                <Link href="/" className="flex items-center">
                                    <Home className="mr-2 h-4 w-4" />
                                    Volver al inicio
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Link href="/contact" className="flex items-center">
                                    <Search className="mr-2 h-4 w-4" />
                                    Buscar ayuda
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
