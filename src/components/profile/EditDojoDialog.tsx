"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { PencilLine, Save, X, Shield, MapPin, FileText, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import type { Dojo } from "@/interfaces/types"

interface Props {
    dojo: Dojo
    onSave: (dojoData: DojoFormData) => Promise<void>
    students: number
}

interface DojoFormData {
    name: string
    description: string
}

export function EditDojoDialog({ dojo, onSave, students }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState("")

    const [formData, setFormData] = useState<DojoFormData>({
        name: dojo.name || "",
        description: dojo.description || "",
    })

    const handleInputChange = (field: keyof DojoFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
        // Limpiar errores cuando el usuario empiece a escribir
        if (formError) setFormError("")
        if (formSuccess) setFormSuccess("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setFormError("")
        setFormSuccess("")

        try {
            // Validaciones
            if (!formData.name.trim()) {
                throw new Error("El nombre del dojo es obligatorio")
            }

            if (formData.name.trim().length < 3) {
                throw new Error("El nombre del dojo debe tener al menos 3 caracteres")
            }

            if (formData.description.trim().length > 500) {
                throw new Error("La descripción no puede exceder 500 caracteres")
            }

            // Llamar a la función de guardado si existe
            await onSave(formData)

            setFormSuccess("¡Información del dojo actualizada correctamente!")

            // Cerrar el modal después de un breve delay
            setTimeout(() => {
                setIsOpen(false)
                setFormSuccess("")
            }, 2000)
        } catch (error: unknown) {
            console.error("Error al actualizar el dojo:", error)
            const errorMessage = error instanceof Error ? error.message : "Error al actualizar la información. Inténtalo de nuevo."
            setFormError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        // Resetear formulario a los valores originales
        setFormData({
            name: dojo.name || "",
            description: dojo.description || "",
        })
        setFormError("")
        setFormSuccess("")
        setIsOpen(false)
    }

    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="mt-4 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                    <PencilLine className="size-4 mr-2" />
                    Editar información del dojo
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-xl">
                        <Shield className="w-6 h-6 mr-2 text-red-400" />
                        Editar Información del Dojo
                    </DialogTitle>
                    <DialogDescription className="text-white/70">
                        Actualiza la información de tu dojo. Los cambios se aplicarán inmediatamente.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información actual del dojo */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <Card className="bg-white/5 border-white/10">
                            <CardContent className="p-4">
                                <h3 className="text-white font-semibold mb-3 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                    Información Actual
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-white/70">
                                            <span className="font-medium">ID:</span>
                                            <span className="ml-2 font-mono text-xs bg-white/10 px-2 py-1 rounded">
                                                {dojo.id || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-white/70">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span className="font-medium">Fundado:</span>
                                            <span className="ml-2">
                                                {dojo.createdAt ? formatDate(dojo.createdAt) : "Fecha desconocida"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-white/70">
                                        <span className="font-medium">Estudiantes:</span>
                                        <span className="ml-2">{students} activos</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Formulario de edición */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Label htmlFor="dojo-name" className="text-white flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-red-400" />
                                Nombre del Dojo *
                            </Label>
                            <Input
                                id="dojo-name"
                                placeholder="Ej: Dojo Tradicional Taekwondo"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-1"
                                required
                                maxLength={100}
                            />
                            <div className="text-xs text-white/50 mt-1">{formData.name.length}/100 caracteres</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <Label htmlFor="dojo-description" className="text-white flex items-center">
                                <FileText className="w-4 h-4 mr-1 text-red-400" />
                                Descripción del Dojo
                            </Label>
                            <Textarea
                                id="dojo-description"
                                placeholder="Describe la filosofía, historia y características especiales de tu dojo..."
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] mt-1"
                                maxLength={500}
                            />
                            <div className="text-xs text-white/50 mt-1">{formData.description.length}/500 caracteres</div>
                        </motion.div>
                    </div>

                    {/* Mensajes de estado */}
                    {formError && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md border border-red-400/20 flex items-center"
                        >
                            <X className="w-4 h-4 mr-2 flex-shrink-0" />
                            {formError}
                        </motion.div>
                    )}

                    {formSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-green-400 text-sm bg-green-400/10 p-3 rounded-md border border-green-400/20 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2 flex-shrink-0" />
                            {formSuccess}
                        </motion.div>
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="border-white/20 text-white hover:bg-white/10"
                            disabled={isLoading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar Cambios
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
