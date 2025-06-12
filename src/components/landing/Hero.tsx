"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {

    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        // {/* Hero Section */ }
        < section className="relative min-h-screen flex items-center justify-center overflow-hidden" >
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20" />
                <Image src="/images/hero.webp" alt="Taekwondo Training" fill className="object-cover" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="md:hidden">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">
                        🥋 Plataforma #1 para Academias de Taekwondo
                    </Badge>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        Domina el Arte del
                        <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                            {" "}
                            Taekwondo
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        La plataforma más avanzada para gestionar academias de taekwondo. Conecta estudiantes y maestros en un
                        ambiente de aprendizaje revolucionario.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <Link href="/auth/login">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-8 py-4 text-lg"
                            >
                                Comenzar Ahora
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                        >
                            <Play className="mr-2 w-5 h-5" />
                            Ver Demo
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {[
                        { number: "10,000+", label: "Estudiantes Activos" },
                        { number: "500+", label: "Maestros Certificados" },
                        { number: "100+", label: "Academias Participantes" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-white/70">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
                <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
            </motion.div>
        </section>
    )
}