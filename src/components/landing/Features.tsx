"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Shield, Target, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export function Features() {

    const features = [
        {
            icon: Calendar,
            title: "Gestión de Clases",
            description: "Programa y gestiona clases con facilidad. Sistema inteligente de horarios.",
            color: "from-red-500 to-orange-500",
        },
        {
            icon: Trophy,
            title: "Seguimiento de Progreso",
            description: "Monitorea el avance de cada estudiante desde cinturón blanco hasta negro.",
            color: "from-yellow-500 to-red-500",
        },
        {
            icon: Users,
            title: "Comunidad Activa",
            description: "Conecta estudiantes y maestros en una plataforma colaborativa.",
            color: "from-blue-500 to-purple-500",
        },
        {
            icon: Shield,
            title: "Técnicas Tradicionales",
            description: "Preserva y enseña las técnicas auténticas del taekwondo tradicional.",
            color: "from-green-500 to-blue-500",
        },
        {
            icon: Target,
            title: "Objetivos Personalizados",
            description: "Establece metas individuales y alcanza nuevos niveles de maestría.",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Award,
            title: "Certificaciones",
            description: "Sistema completo de certificaciones y reconocimientos oficiales.",
            color: "from-orange-500 to-red-500",
        },
    ]

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">
                        Características Principales
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Todo lo que necesitas para
                        <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                            {" "}
                            triunfar
                        </span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Herramientas profesionales diseñadas específicamente para academias de taekwondo
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                                <CardHeader>
                                    <div
                                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-white/70 text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}