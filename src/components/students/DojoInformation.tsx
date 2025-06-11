"use client"

import { Student, User } from "@/interfaces/types"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar, Code, MapPin, Shield } from "lucide-react"

interface Props {
    user: Student
}

export function StudentDojoInformation({ user }: Props) {

    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Información del Dojo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center text-white/80">
                                <MapPin className="w-4 h-4 mr-2 text-red-400" />
                                <span className="font-medium">Nombre:</span>
                                <span className="ml-2">{user.Dojo?.name}</span>
                            </div>
                            <div className="flex items-center text-white/80">
                                <Code className="w-4 h-4 mr-2 text-red-400" />
                                <span className="font-medium">Código:</span>
                                <span className="ml-2 font-mono text-sm bg-white/10 px-2 py-1 rounded">{user.Dojo?.code}</span>
                            </div>
                            <div className="flex items-center text-white/80">
                                <Calendar className="w-4 h-4 mr-2 text-red-400" />
                                <span className="font-medium">Fundado:</span>
                                <span className="ml-2">{user.Dojo?.createdAt ? formatDate(user.Dojo?.createdAt) : "Fecha desconocida"}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-white/70 text-sm">
                                {user.Dojo?.description ||
                                    "Un dojo tradicional enfocado en la excelencia y disciplina del taekwondo."}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}