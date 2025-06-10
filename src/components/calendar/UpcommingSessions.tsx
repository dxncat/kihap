
"use client"

import { motion } from "framer-motion"
import { CalendarIcon, Clock, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Sessions } from "@/interfaces/types"
import { Badge } from "../ui/badge"
import { formatDate, getBeltColor } from "@/utils"

interface Props {
    session: Sessions[]
}

export function UpcomingSessions({ session }: Props) {

    const formatTime = (dateString: Date) => {
        return dateString.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Próximas Sesiones</CardTitle>
                    <CardDescription className="text-white/70">Sesiones programadas para los próximos días</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {session.slice(0, 6).map((session) => (
                            <Card
                                key={session.id}
                                className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-white font-semibold text-lg">{session.title}</h3>
                                        <Badge className={getBeltColor(session.Rank?.name || "")}>
                                            {session.Rank?.name || `Rango ${session.rankId}`}
                                        </Badge>
                                    </div>

                                    <p className="text-white/70 text-sm mb-4">{session.description}</p>

                                    <div className="space-y-2">
                                        <div className="flex items-center text-white/80 text-sm">
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {formatDate(session.startTime)}
                                        </div>
                                        <div className="flex items-center text-white/80 text-sm">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                        </div>
                                        <div className="flex items-center text-white/80 text-sm">
                                            <Users className="w-4 h-4 mr-2" />
                                            {session.Rank?.description || "Descripción no disponible"}
                                        </div>
                                    </div>

                                    <Button className="w-full mt-4 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                        Ver Detalles
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {session.length === 0 && (
                        <div className="text-center py-8">
                            <CalendarIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                            <p className="text-white/50">No hay sesiones programadas</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}