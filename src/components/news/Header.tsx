"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"
import { Calendar, Plus } from "lucide-react"

export function NewsHeader({ isMaster }: { isMaster: boolean }) {
    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Noticias del Dojo</h1>
                    <p className="text-white/70 text-lg">Mantente al día con las últimas actualizaciones y anuncios</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    {isMaster && (
                        <Link href="/news/new">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                                <Plus className="w-4 h-4 mr-2" />
                                Publicar Noticia
                            </Button>
                        </Link>
                    )}
                    <Link href="/calendar">
                        <Button className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full md:w-auto">
                            <Calendar className="w-4 h-4 mr-2" />
                            Ver Calendario
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}