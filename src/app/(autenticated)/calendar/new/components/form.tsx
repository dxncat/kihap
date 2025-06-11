"use client"

import { newSession } from "@/actions/sessions/newSession"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components"
import { motion } from "framer-motion"
import { CalendarIcon, Clock } from "lucide-react"
import { useState } from "react"

interface Props {
    ranks: {
        id: number;
        name: string;
    }[]
    dojoId: string;
}

export function ClassForm({ ranks, dojoId }: Props) {

    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        rankId: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    // Función para combinar fecha y hora en un objeto Date
    const createDateTime = (date: string, time: string): Date => {
        return new Date(`${date}T${time}`)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setFormError("")
        setFormSuccess("")

        try {
            // Validaciones básicas
            if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.rankId) {
                throw new Error("Por favor completa todos los campos obligatorios")
            }

            // Crear objetos Date combinando fecha y hora
            const startDateTime = createDateTime(formData.date, formData.startTime)
            const endDateTime = createDateTime(formData.date, formData.endTime)

            // Validar que la hora de fin sea posterior a la de inicio
            if (startDateTime >= endDateTime) {
                throw new Error("La hora de fin debe ser posterior a la hora de inicio")
            }

            // Validar que la fecha no sea en el pasado
            const now = new Date()
            if (startDateTime < now) {
                throw new Error("No puedes programar una clase en el pasado")
            }

            // Datos formateados para enviar al servidor
            const classData = {
                title: formData.title,
                description: formData.description,
                startTime: startDateTime,
                endTime: endDateTime,
                rankId: Number.parseInt(formData.rankId),
                dojoId: dojoId,
            }

            // Simulación de envío al servidor
            await newSession({ session: classData })

            // Éxito
            setFormSuccess("¡Clase programada correctamente!")

            // Resetear formulario
            setFormData({
                title: "",
                description: "",
                date: "",
                startTime: "",
                endTime: "",
                rankId: "",
            })
            window.location.replace('/calendar')
        } catch (error: unknown) {
            console.error("Error al programar la clase:", error)
            const message = error instanceof Error ? error.message : "Error al programar la clase. Inténtalo de nuevo.";
            setFormError(message)
        } finally {
            setIsLoading(false)
        }
    }

    // Obtener la fecha mínima (hoy)
    const getMinDate = () => {
        const today = new Date()
        return today.toISOString().split("T")[0]
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
        >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Detalles de la Clase</CardTitle>
                    <CardDescription className="text-white/70">
                        Completa el formulario para crear una nueva clase
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">
                                Título de la Clase *
                            </Label>
                            <Input
                                id="title"
                                placeholder="Ej: Técnicas Básicas - Principiantes"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">
                                Descripción
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe el contenido y objetivos de la clase..."
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-white">
                                Fecha *
                            </Label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    min={getMinDate()}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    className="bg-white/10 border-white/20 text-white pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="startTime" className="text-white">
                                    Hora de Inicio *
                                </Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                                        className="bg-white/10 border-white/20 text-white pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime" className="text-white">
                                    Hora de Fin *
                                </Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                                    <Input
                                        id="endTime"
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                                        className="bg-white/10 border-white/20 text-white pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rankId" className="text-white">
                                Rango Objetivo *
                            </Label>
                            <Select
                                value={formData.rankId}
                                onValueChange={(value) => handleInputChange("rankId", value)}
                                required
                            >
                                <SelectTrigger id="rankId" className="bg-white/10 border-white/20 text-white">
                                    <SelectValue placeholder="Selecciona el rango" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/20">
                                    {
                                        ranks.map((rank) => (
                                            <SelectItem key={rank.id} value={rank.id.toString()} className="text-white">
                                                {rank.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {formError && (
                            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md border border-red-400/20">
                                {formError}
                            </div>
                        )}

                        {formSuccess && (
                            <div className="text-green-400 text-sm bg-green-400/10 p-3 rounded-md border border-green-400/20">
                                {formSuccess}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                                disabled={isLoading}
                            >
                                {isLoading ? "Programando..." : "Programar Clase"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={() => {
                                    setFormData({
                                        title: "",
                                        description: "",
                                        date: "",
                                        startTime: "",
                                        endTime: "",
                                        rankId: "",
                                    })
                                    setFormError("")
                                    setFormSuccess("")
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </motion.div>
    )
}