"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"
import { Calendar } from "lucide-react"

export function NewsHeader() {
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
                <Link href="/calendar">
                    <Button className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full md:w-auto">
                        <Calendar className="w-4 h-4 mr-2" />
                        Ver Calendario
                    </Button>
                </Link>
            </div>
        </motion.div>
    )
}