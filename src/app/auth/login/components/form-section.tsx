"use client"

import { motion } from "framer-motion";
import { LoginForm } from "./login-form";
import Link from "next/link";

export function FormSection() {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                className="max-w-md mx-auto text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a KIHAP</h1>
                <p className="text-white/70">
                    Inicia sesión o regístrate para acceder a todas las funciones de la plataforma
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <LoginForm />
            </motion.div>

            <motion.div
                className="mt-8 text-center text-white/50 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <p>
                    Al iniciar sesión o registrarte, aceptas nuestros{" "}
                    <Link href="/terms" className="text-red-400 hover:text-red-300">
                        Términos y Condiciones
                    </Link>{" "}
                    y{" "}
                    <Link href="/privacy" className="text-red-400 hover:text-red-300">
                        Política de Privacidad
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}