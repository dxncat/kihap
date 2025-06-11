"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { titleFont } from "@/config/fonts"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Form submitted:", formData)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
            {/* Navigation */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                                src={"/images/favicon.ico"}
                                alt="Kihap Logo"
                                width={8}
                                height={8}
                                className="w-8 h-8"
                            />
                        </div>
                        <div className="size-8">
                            <span className={`${titleFont.className} text-4xl font-bold text-white`}>KIHAP</span>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-white/80 hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <Link href="/calendar" className="text-white/80 hover:text-white transition-colors">
                            Calendario
                        </Link>
                        <Link href="/profile" className="text-white/80 hover:text-white transition-colors">
                            Perfil
                        </Link>
                        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                            Nosotros
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contáctanos</h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        ¿Tienes preguntas sobre nuestros programas de taekwondo? Estamos aquí para ayudarte. Ponte en contacto con
                        nosotros y te responderemos lo antes posible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Información de Contacto
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-5 h-5 text-red-400 mt-1" />
                                    <div>
                                        <p className="text-white font-medium">Email</p>
                                        <p className="text-white/70">info@kihap.com</p>
                                        <p className="text-white/70">soporte@kihap.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 text-red-400 mt-1" />
                                    <div>
                                        <p className="text-white font-medium">Teléfono</p>
                                        <p className="text-white/70">+57 (555) 123-4567</p>
                                        <p className="text-white/70">+57 (555) 987-6543</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-red-400 mt-1" />
                                    <div>
                                        <p className="text-white font-medium">Dirección</p>
                                        <p className="text-white/70">
                                            Cl 52 N° 13 65
                                            <br />
                                            Regional Distrito Capital, Bogota D.C.
                                            <br />
                                            Colombia
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Clock className="w-5 h-5 text-red-400 mt-1" />
                                    <div>
                                        <p className="text-white font-medium">Horarios de Atención</p>
                                        <p className="text-white/70">
                                            Lunes - Viernes: 9:00 AM - 8:00 PM
                                            <br />
                                            Sábados: 9:00 AM - 6:00 PM
                                            <br />
                                            Domingos: 10:00 AM - 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Envíanos un Mensaje</CardTitle>
                                <CardDescription className="text-white/70">
                                    Completa el formulario y nos pondremos en contacto contigo dentro de 24 horas
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-white">
                                                Nombre Completo *
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Tu nombre completo"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="text-white">
                                                Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="phone" className="text-white">
                                                Teléfono
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+57 (555) 123-4567"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="type" className="text-white">
                                                Tipo de Consulta *
                                            </Label>
                                            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                                    <SelectValue placeholder="Selecciona el tipo" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-800 border-white/20">
                                                    <SelectItem value="general">Información General</SelectItem>
                                                    <SelectItem value="enrollment">Inscripciones</SelectItem>
                                                    <SelectItem value="technical">Soporte Técnico</SelectItem>
                                                    <SelectItem value="instructor">Ser Instructor</SelectItem>
                                                    <SelectItem value="partnership">Colaboraciones</SelectItem>
                                                    <SelectItem value="other">Otro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="subject" className="text-white">
                                            Asunto *
                                        </Label>
                                        <Input
                                            id="subject"
                                            type="text"
                                            placeholder="Breve descripción del tema"
                                            value={formData.subject}
                                            onChange={(e) => handleInputChange("subject", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-white">
                                            Mensaje *
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Describe tu consulta o mensaje en detalle..."
                                            value={formData.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Enviar Mensaje
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-white/20 text-white hover:bg-white/10"
                                            onClick={() =>
                                                setFormData({
                                                    name: "",
                                                    email: "",
                                                    phone: "",
                                                    subject: "",
                                                    message: "",
                                                    type: "",
                                                })
                                            }
                                        >
                                            Limpiar Formulario
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white text-center">Preguntas Frecuentes</CardTitle>
                            <CardDescription className="text-white/70 text-center">
                                Encuentra respuestas rápidas a las preguntas más comunes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">¿Cómo me registro en la plataforma?</h3>
                                        <p className="text-white/70 text-sm">
                                            Puedes registrarte haciendo clic en "Comenzar Gratis" en nuestra página principal. El proceso es
                                            simple y solo toma unos minutos.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">¿Ofrecen clases virtuales?</h3>
                                        <p className="text-white/70 text-sm">
                                            Sí, ofrecemos tanto clases presenciales como virtuales. Puedes elegir la modalidad que mejor se
                                            adapte a tus necesidades.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">¿La plataforma es gratuita?</h3>
                                        <p className="text-white/70 text-sm">
                                            Sí, nuestra plataforma ofrece una versión gratuita con acceso limitado a ciertas funciones.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">
                                            ¿Qué necesito para empezar a usar la plataforma gratuita?
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Solo necesitas crear una cuenta con tu correo electrónico y empezar a explorar las funciones
                                            disponibles.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">¿Ofrecen soporte técnico?</h3>
                                        <p className="text-white/70 text-sm">
                                            Sí, ofrecemos soporte técnico 24/7 para todos nuestros usuarios. Puedes contactarnos por chat,
                                            email o teléfono.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">¿Cómo puedo ser instructor?</h3>
                                        <p className="text-white/70 text-sm">
                                            Si eres un instructor certificado de taekwondo, puedes aplicar para unirte a nuestra plataforma.
                                            Contáctanos para conocer los requisitos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
