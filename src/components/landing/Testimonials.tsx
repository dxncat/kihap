"use client"

import { motion } from "framer-motion"
import { Badge } from "../ui/badge"
import { Star } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"

export function Testimonials() {
    const testimonials = [
        {
            name: "María González",
            rank: "Cinturón Negro 5º Dan",
            text: "Esta plataforma revolucionó mi forma de enseñar. Mis estudiantes están más comprometidos que nunca.",
            avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/1a/1ae78c832a3ed83fc29b597ae56d6e6e0d3c1a03_full.jpg",
        },
        {
            name: "Carlos Mendoza",
            rank: "Cinturón Rojo con Punta Negra 1° Kup",
            text: "Como estudiante, poder ver mi progreso y agendar clases es increíble. ¡Altamente recomendado!",
            avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/1a/1aef75722a2ffe9407f2205eea9f03d721619e3c_full.jpg",
        },
        {
            name: "Ana Rodríguez",
            rank: "Maestra Certificada",
            text: "La gestión de mi academia nunca fue tan fácil. Herramientas profesionales al alcance de todos.",
            avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/1b/1b16048452795a902eecd2169d0ded23f922cb25_full.jpg",
        },
    ]

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">Testimonios</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Lo que dicen nuestros
                        <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                            {" "}
                            maestros
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
                                    <div className="flex items-center">
                                        <Image
                                            src={testimonial.avatar || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full mr-4"
                                        />
                                        <div>
                                            <div className="text-white font-semibold">{testimonial.name}</div>
                                            <div className="text-white/60 text-sm">{testimonial.rank}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}