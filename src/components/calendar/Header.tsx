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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full sm:w-auto">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nueva Sesión
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Programar Nueva Sesión</DialogTitle>
                                    <DialogDescription className="text-white/70">
                                        Crea una nueva sesión de entrenamiento para tus estudiantes
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Título de la Sesión</Label>
                                        <Input
                                            id="title"
                                            placeholder="Ej: Técnicas Básicas de Patadas"
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe el contenido de la sesión..."
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="startTime">Hora de Inicio</Label>
                                            <Input
                                                id="startTime"
                                                type="datetime-local"
                                                className="bg-white/10 border-white/20 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="endTime">Hora de Fin</Label>
                                            <Input
                                                id="endTime"
                                                type="datetime-local"
                                                className="bg-white/10 border-white/20 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="rank">Rango Objetivo</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                                <SelectValue placeholder="Selecciona el rango" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-white/20">
                                                <SelectItem value="1">10º Kup (Cinturón Blanco)</SelectItem>
                                                <SelectItem value="2">9º Kup (Cinturón Blanco con Punta Amarilla)</SelectItem>
                                                <SelectItem value="3">8º Kup (Cinturón Amarillo)</SelectItem>
                                                <SelectItem value="4">7º Kup (Cinturón Amarillo con Punta Verde)</SelectItem>
                                                <SelectItem value="5">6º Kup (Cinturón Verde)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                        Crear Sesión
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </motion.div>
    )
}