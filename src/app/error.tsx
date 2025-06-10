"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { titleFont } from "@/config/fonts"

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Opcionalmente, registra el error en un servicio de análisis
        console.error(error)
    }, [error])

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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-5xl font-bold text-red-500">!</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Algo salió mal!</h1>
                        <p className="text-white/70 text-lg mb-8">
                            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={reset}
                                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 flex items-center"
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Intentar de nuevo
                            </Button>
                            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Link href="/" className="flex items-center">
                                    <Home className="mr-2 h-4 w-4" />
                                    Volver al inicio
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-12 text-white/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-sm">
                            Código de error: {error.digest || "UNKNOWN"}
                            <br />
                            Si el problema persiste, por favor contacta con soporte.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
