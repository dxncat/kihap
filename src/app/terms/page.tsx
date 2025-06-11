"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, AlertTriangle, Users, Lock, Globe, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { titleFont } from "@/config/fonts"

export default function TermsPage() {
    const sections = [
        {
            id: "acceptance",
            title: "1. Aceptación de los Términos",
            icon: FileText,
            content: [
                "Al acceder y utilizar Kihap, usted acepta estar sujeto a estos Términos y Condiciones de Uso.",
                "Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.",
                "Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso.",
                "Es su responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.",
            ],
        },
        {
            id: "services",
            title: "2. Descripción del Servicio",
            icon: Users,
            content: [
                "Kihap es una plataforma completamente gratuita que ofrece servicios de gestión para academias de taekwondo.",
                "Proporcionamos herramientas para la programación de clases, seguimiento de progreso y gestión de estudiantes.",
                "Ofrecemos tanto clases presenciales como virtuales a través de nuestra plataforma.",
                "Los servicios pueden incluir contenido educativo, herramientas de comunicación y sistemas de evaluación.",
            ],
        },
        {
            id: "registration",
            title: "3. Registro y Cuentas de Usuario",
            icon: Users,
            content: [
                "Para utilizar ciertos servicios, debe crear una cuenta proporcionando información precisa y completa.",
                "Es responsable de mantener la confidencialidad de su contraseña y de todas las actividades en su cuenta.",
                "Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.",
                "Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.",
            ],
        },
        {
            id: "conduct",
            title: "4. Conducta del Usuario",
            icon: AlertTriangle,
            content: [
                "Los usuarios deben comportarse de manera respetuosa hacia otros miembros de la comunidad.",
                "Está prohibido el uso de lenguaje ofensivo, discriminatorio o que incite al odio.",
                "No se permite compartir contenido que viole derechos de autor o propiedad intelectual.",
                "Cualquier forma de acoso, intimidación o comportamiento inapropiado resultará en la suspensión de la cuenta.",
            ],
        },
        {
            id: "privacy",
            title: "5. Privacidad y Protección de Datos",
            icon: Lock,
            content: [
                "Recopilamos y procesamos datos personales de acuerdo con nuestra Política de Privacidad.",
                "Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos.",
                "No vendemos ni compartimos información personal con terceros sin su consentimiento explícito.",
                "Tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento.",
            ],
        },
        {
            id: "intellectual",
            title: "6. Propiedad Intelectual",
            icon: Shield,
            content: [
                "Todo el contenido de la plataforma, incluyendo textos, imágenes y videos, está protegido por derechos de autor.",
                "Los usuarios mantienen los derechos sobre el contenido que crean y comparten en la plataforma.",
                "Al subir contenido, otorga a Kihap una licencia para usar, mostrar y distribuir dicho contenido.",
                "Respetamos los derechos de propiedad intelectual de terceros y esperamos que nuestros usuarios hagan lo mismo.",
            ],
        },
        {
            id: "liability",
            title: "7. Limitación de Responsabilidad",
            icon: AlertTriangle,
            content: [
                "Kihap no se hace responsable por lesiones que puedan ocurrir durante la práctica del taekwondo.",
                "Los usuarios participan en actividades físicas bajo su propio riesgo y responsabilidad.",
                "No garantizamos la disponibilidad ininterrumpida del servicio ni la ausencia de errores técnicos.",
                "Nuestra responsabilidad se limita a la utilización de la plataforma, siendo esta un servicio comunitario gratuito.",
            ],
        },
        {
            id: "termination",
            title: "8. Terminación del Servicio",
            icon: Globe,
            content: [
                "Puede cancelar su cuenta en cualquier momento desde su panel de usuario.",
                "Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.",
                "Algunos datos pueden conservarse por razones legales o de seguridad después de la terminación.",
            ],
        },
        {
            id: "contact",
            title: "9. Información de Contacto",
            icon: Mail,
            content: [
                "Para preguntas sobre estos términos, puede contactarnos en legal@kihap.com",
                "Nuestro equipo legal responde consultas dentro de 48 horas hábiles.",
                "También puede contactarnos por teléfono al +1 (555) 123-4567 durante horarios de oficina.",
                "Para disputas, preferimos la resolución amigable antes de proceder por vías legales.",
            ],
        },
    ]

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
                        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                            Nosotros
                        </Link>
                        <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                            Contacto
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
                    <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">
                        Términos Legales
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Términos y Condiciones</h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Estos términos y condiciones rigen el uso de la plataforma Kihap. Por favor, léalos
                        cuidadosamente antes de utilizar nuestros servicios.
                    </p>
                    <div className="mt-6 text-white/60">
                        <p>Última actualización: 15 de diciembre de 2024</p>
                        <p>Versión: 2.1</p>
                    </div>
                </motion.div>

                {/* Important Notice */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Aviso Importante</h3>
                                    <p className="text-white/80">
                                        Al utilizar Kihap, usted acepta automáticamente estos términos y condiciones. Si no está
                                        de acuerdo con alguna parte de estos términos, debe discontinuar el uso de nuestros servicios
                                        inmediatamente. Estos términos pueden cambiar periódicamente, y es su responsabilidad mantenerse
                                        informado sobre las actualizaciones.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Table of Contents */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Índice de Contenidos</CardTitle>
                            <CardDescription className="text-white/70">
                                Navegue rápidamente a la sección que le interese
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {sections.map((section, index) => (
                                    <Link
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
                                    >
                                        <section.icon className="w-5 h-5 text-red-400" />
                                        <span className="text-white/80 hover:text-white">{section.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Terms Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            id={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center">
                                        <section.icon className="w-6 h-6 mr-3 text-red-400" />
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-white/80 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Information */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Card className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 border-red-500/30">
                        <CardHeader>
                            <CardTitle className="text-white text-center">¿Preguntas sobre estos términos?</CardTitle>
                            <CardDescription className="text-white/70 text-center">
                                Nuestro equipo legal está disponible para aclarar cualquier duda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center">
                                    <Mail className="w-8 h-8 text-red-400 mb-2" />
                                    <h3 className="text-white font-semibold mb-1">Email Legal</h3>
                                    <p className="text-white/70">legal@kihap.com</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Shield className="w-8 h-8 text-red-400 mb-2" />
                                    <h3 className="text-white font-semibold mb-1">Privacidad</h3>
                                    <Link href="/privacy" className="text-red-400 hover:text-red-300">
                                        Ver Política de Privacidad
                                    </Link>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Globe className="w-8 h-8 text-red-400 mb-2" />
                                    <h3 className="text-white font-semibold mb-1">Jurisdicción</h3>
                                    <p className="text-white/70">Estados Unidos</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
