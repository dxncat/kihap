"use client"

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { motion } from "framer-motion"
import { Bell, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { DialogHeader } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import Link from "next/link"

export function CalendarHeader({ isMaster }: { isMaster: boolean }) {
    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calendario de Clases</h1>
                    <p className="text-white/70 text-lg">Gestiona y visualiza todas las sesiones de entrenamiento</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link href="/news">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                            <Bell className="w-4 h-4 mr-2" />
                            Ver Noticias
                        </Button>
                    </Link>
                    {isMaster && (
                        <Link href="/calendar/create">
                            <Button className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full sm:w-auto">
                                <Plus className="w-4 h-4 mr-2" />
                                Nueva Sesión
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    )
}