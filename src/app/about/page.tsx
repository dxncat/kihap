"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Target, Users, Award, Heart, Star, Trophy, Zap, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { titleFont } from "@/config/fonts"

export default function AboutPage() {
    const values = [
        {
            icon: Shield,
            title: "Tradición",
            description:
                "Preservamos y enseñamos las técnicas auténticas del taekwondo tradicional con respeto por su historia milenaria.",
            color: "from-red-500 to-orange-500",
        },
        {
            icon: Target,
            title: "Excelencia",
            description:
                "Nos esforzamos por la perfección en cada técnica, cada clase y cada interacción con nuestros estudiantes.",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Users,
            title: "Comunidad",
            description: "Creamos un ambiente inclusivo donde estudiantes y maestros crecen juntos como una gran familia.",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: Heart,
            title: "Pasión",
            description: "Cada clase, cada técnica y cada logro está impulsado por nuestra pasión genuina por el taekwondo.",
            color: "from-purple-500 to-pink-500",
        },
    ]

    const team = [
        {
            name: "Maestro Luis García",
            title: "Fundador y Director",
            belt: "Cinturón Negro 9° Dan",
            experience: "35 años de experiencia",
            description: "Pionero en la enseñanza digital del taekwondo, con más de 3 décadas formando campeones.",
            avatar: "/placeholder.svg?height=120&width=120",
            achievements: ["Campeón Mundial 1995", "Instructor del Año 2018", "Fundador de 12 academias"],
        },
        {
            name: "Maestra Ana Rodríguez",
            title: "Directora de Programas",
            belt: "Cinturón Negro 7° Dan",
            experience: "28 años de experiencia",
            description: "Especialista en desarrollo de programas educativos y formación de instructores.",
            avatar: "/placeholder.svg?height=120&width=120",
            achievements: ["Medalla de Oro Panamericanos", "Instructora Certificada Internacional", "Autora de 3 libros"],
        },
        {
            name: "Maestro Carlos Mendoza",
            title: "Director Técnico",
            belt: "Cinturón Negro 8° Dan",
            experience: "30 años de experiencia",
            description: "Experto en técnicas avanzadas y preparación para competencias internacionales.",
            avatar: "/placeholder.svg?height=120&width=120",
            achievements: ["Entrenador Olímpico", "Juez Internacional", "Mentor de 50+ instructores"],
        },
    ]

    const stats = [
        { number: "50,000+", label: "Estudiantes Graduados", icon: Users },
        { number: "500+", label: "Instructores Certificados", icon: Award },
        { number: "25+", label: "Países Presentes", icon: Globe },
        { number: "15", label: "Años de Experiencia", icon: Trophy },
    ]

    const milestones = [
        {
            year: "2009",
            title: "Fundación",
            description: "Nace Kihap con la visión de democratizar el acceso al taekwondo de calidad.",
        },
        {
            year: "2012",
            title: "Primera Expansión",
            description: "Abrimos nuestras primeras 5 academias físicas en diferentes ciudades.",
        },
        {
            year: "2015",
            title: "Plataforma Digital",
            description: "Lanzamos nuestra primera plataforma online para clases virtuales.",
        },
        {
            year: "2018",
            title: "Reconocimiento Internacional",
            description: "Recibimos la certificación de la Federación Mundial de Taekwondo.",
        },
        {
            year: "2020",
            title: "Revolución Virtual",
            description: "Adaptamos completamente nuestros programas al formato híbrido durante la pandemia.",
        },
        {
            year: "2022",
            title: "Expansión Global",
            description: "Llegamos a 25 países con más de 500 instructores certificados.",
        },
        {
            year: "2024",
            title: "Nueva Plataforma",
            description: "Lanzamos nuestra plataforma de gestión más avanzada con IA integrada.",
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
                        <Link href="/calendar" className="text-white/80 hover:text-white transition-colors">
                            Calendario
                        </Link>
                        <Link href="/profile" className="text-white/80 hover:text-white transition-colors">
                            Perfil
                        </Link>
                        <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                            Contacto
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">
                            Nuestra Historia
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Forjando
                            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                                {" "}
                                Campeones
                            </span>
                            <br />
                            desde 2009
                        </h1>
                        <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                            Somos más que una plataforma de taekwondo. Somos una comunidad global dedicada a preservar las tradiciones
                            marciales mientras abrazamos la innovación tecnológica para crear la mejor experiencia de aprendizaje
                            posible.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {stats.map((stat, index) => (
                            <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 text-center">
                                <CardContent className="p-6">
                                    <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-white/70 text-sm">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-white text-2xl">Nuestra Misión</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80 text-lg leading-relaxed">
                                        Democratizar el acceso gratuito al taekwondo de alta calidad a través de la tecnología, preservando
                                        las tradiciones milenarias mientras creamos herramientas innovadoras que permitan a estudiantes y
                                        maestros alcanzar su máximo potencial, sin importar su ubicación geográfica o circunstancias
                                        personales.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-white text-2xl">Nuestra Visión</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/80 text-lg leading-relaxed">
                                        Ser la plataforma líder mundial en educación marcial digital, conectando a millones de practicantes
                                        de taekwondo en una comunidad global unificada. Aspiramos a ser el puente entre la sabiduría
                                        ancestral y la innovación moderna, formando no solo mejores artistas marciales, sino mejores seres
                                        humanos.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Nuestros
                            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                                {" "}
                                Valores
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Los principios fundamentales que guían cada decisión y acción en nuestra academia
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4">
                                            <div
                                                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center flex-shrink-0`}
                                            >
                                                <value.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white text-xl font-bold mb-3">{value.title}</h3>
                                                <p className="text-white/80 leading-relaxed">{value.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Nuestro
                            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent"> Equipo</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Maestros dedicados con décadas de experiencia y pasión por la enseñanza
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
                                    <CardContent className="p-8 text-center">
                                        <div className="relative mb-6">
                                            <Image
                                                src={member.avatar || "/placeholder.svg"}
                                                alt={member.name}
                                                width={120}
                                                height={120}
                                                className="rounded-full mx-auto border-4 border-gradient-to-r from-red-500 to-yellow-500"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2">
                                                <Star className="w-4 h-4 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-white text-xl font-bold mb-2">{member.name}</h3>
                                        <p className="text-red-400 font-semibold mb-1">{member.title}</p>
                                        <Badge className="bg-gray-800 text-white mb-2">{member.belt}</Badge>
                                        <p className="text-white/70 text-sm mb-4">{member.experience}</p>
                                        <p className="text-white/80 mb-6">{member.description}</p>

                                        <div className="space-y-2">
                                            <h4 className="text-white font-semibold text-sm">Logros Destacados:</h4>
                                            {member.achievements.map((achievement, i) => (
                                                <div key={i} className="text-white/70 text-xs bg-white/5 rounded px-2 py-1">
                                                    {achievement}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Nuestra
                            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                                {" "}
                                Historia
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Un viaje de 15 años transformando la educación marcial
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start space-x-6 mb-12 last:mb-0"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">{milestone.year}</span>
                                    </div>
                                    {index < milestones.length - 1 && (
                                        <div className="w-0.5 h-16 bg-gradient-to-b from-red-500 to-yellow-500 mx-auto mt-4"></div>
                                    )}
                                </div>
                                <Card className="flex-1 bg-white/5 backdrop-blur-md border-white/10">
                                    <CardContent className="p-6">
                                        <h3 className="text-white text-xl font-bold mb-2">{milestone.title}</h3>
                                        <p className="text-white/80">{milestone.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-600">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            ¿Listo para unirte a nuestra comunidad gratuita?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Únete a miles de estudiantes y maestros que ya están escribiendo el futuro del taekwondo con nosotros.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                                Unirme Ahora
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                            >
                                Conocer Más
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
