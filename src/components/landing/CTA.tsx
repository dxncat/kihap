"use client"

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-600">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para unirte a nuestra comunidad?</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                        Únete a miles de maestros y estudiantes que ya están transformando su experiencia de aprendizaje con
                        nuestra plataforma.
                    </p>
                    <Link href={'/auth/login'}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                                Comenzar Ahora
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}