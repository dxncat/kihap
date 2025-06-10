"use client"

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

interface Props {
    ranks: {
        id: number;
        name: string;
    }[]
}

export function ClassForm({ ranks }: Props) {

    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        description: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setFormError("")
        setFormSuccess("")

        try {
            // Validaciones básicas
            if (!formData.title || !formData.startTime || !formData.endTime || !formData.rankId) {
                throw new Error("Por favor completa todos los campos obligatorios")
            }

            // Validar que la hora de fin sea posterior a la de inicio
            if (new Date(formData.startTime) >= new Date(formData.endTime)) {
                throw new Error("La hora de fin debe ser posterior a la hora de inicio")
            }

            // Simulación de envío al servidor
            console.log("Datos de la clase:", formData)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Éxito
            setFormSuccess("¡Clase programada correctamente!")

            // Resetear formulario
            setFormData({
                title: "",
                description: "",
                startTime: "",
                endTime: "",
                rankId: "",
            })
        } catch (error: any) {
            console.error("Error al programar la clase:", error)
            setFormError(error.message || "Error al programar la clase. Inténtalo de nuevo.")
        } finally {
            setIsLoading(false)
        }
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="startTime" className="text-white">
                                    Fecha y Hora de Inicio *
                                </Label>
                                <Input
                                    id="startTime"
                                    type="datetime-local"
                                    value={formData.startTime}
                                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                                    className="bg-white/10 border-white/20 text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime" className="text-white">
                                    Fecha y Hora de Fin *
                                </Label>
                                <Input
                                    id="endTime"
                                    type="datetime-local"
                                    value={formData.endTime}
                                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                                    className="bg-white/10 border-white/20 text-white"
                                    required
                                />
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