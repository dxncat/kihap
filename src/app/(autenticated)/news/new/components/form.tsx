"use client"

import { newNew } from "@/actions"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Textarea } from "@/components"
import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
    dojoId: string;
}

export function ClassForm({ dojoId }: Props) {

    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        description: ""
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
            if (!formData.title) {
                throw new Error("Por favor completa todos los campos obligatorios")
            }

            // Simulación de envío al servidor
            const data = new FormData()
            data.append("title", formData.title)
            data.append("description", formData.description)
            data.append("dojoId", dojoId)
            await newNew(data)

            // Éxito
            setFormSuccess("¡Clase programada correctamente!")

            // Resetear formulario
            setFormData({
                title: "",
                description: ""
            })
            window.location.replace('/news')
        } catch (error: unknown) {
            console.error("Error al publicar la noticia:", error)
            const message = error instanceof Error ? error.message : "Error al programar la clase. Inténtalo de nuevo.";
            setFormError(message)
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
                    <CardTitle className="text-white">Detalles de la Noticia</CardTitle>
                    <CardDescription className="text-white/70">
                        Completa el formulario para publicar una nueva noticia
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">
                                Título de la Noticia *
                            </Label>
                            <Input
                                id="title"
                                placeholder="Ej: Maña habrá una clase especial"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">
                                Descripción *
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe el contenido de la noticia..."
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                            />
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
                                {isLoading ? "Publicando..." : "Publicar Noticia"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={() => {
                                    setFormData({
                                        title: "",
                                        description: ""
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