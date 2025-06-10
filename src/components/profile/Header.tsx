"use client"

import { RankHistory, User } from "@/interfaces/types"
import { motion } from "framer-motion"
import { Calendar, MapPin, Shield, Trophy } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { getBeltColor } from "@/utils"

interface Props {
    user: User,
    rankHistory: RankHistory[]
}

export function Header({ user, rankHistory }: Props) {

    const isMaster = user.role === "MASTER"
    const isStudent = user.role === "STUDENT"

    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const calculateProgress = () => {
        if (!isStudent) return 0
        const studentUser = user as User & { student_info: { currentHours: number, rankId: number }, rank: { hoursRequired: number } }
        return Math.min((studentUser.student_info.currentHours / studentUser.rank.hoursRequired) * 100, 100)
    }

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                    <Image
                        src={user.image || "https://avatar.iran.liara.run/public"}
                        alt={user.name}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-gradient-to-r from-red-500 to-yellow-500"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2">
                        {isMaster ? <Shield className="w-6 h-6 text-white" /> : <Trophy className="w-6 h-6 text-white" />}
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.name}</h1>
                    <p className="text-white/70 text-lg mb-4">{user.email}</p>

                    <div className="flex flex-wrap gap-4 mb-4">
                        {isMaster ? (
                            <>
                                <Badge className="bg-gradient-to-r from-red-500 to-yellow-500 text-white text-sm px-3 py-1">
                                    Maestro
                                </Badge>
                                <Badge variant="outline" className="border-white/30 text-white">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {user.dojo?.name}
                                </Badge>
                            </>
                        ) : (
                            <>
                                <Badge className={`${getBeltColor(user.rank?.name ?? "")}text-sm px-3 py-1`}>
                                    {user.rank?.name}
                                </Badge>
                                <Badge variant="outline" className="border-white/30 text-white">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {user.dojo?.name || "Sin Dojo"}
                                </Badge>
                            </>
                        )}
                        <Badge variant="outline" className="border-white/30 text-white">
                            <Calendar className="w-3 h-3 mr-1" />
                            Desde {formatDate(user.createdAt)}
                        </Badge>
                    </div>

                    {isMaster ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">15</div>
                                <div className="text-white/70 text-sm">Estudiantes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">8</div>
                                <div className="text-white/70 text-sm">Clases/Semana</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">3</div>
                                <div className="text-white/70 text-sm">Años Enseñando</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">95%</div>
                                <div className="text-white/70 text-sm">Satisfacción</div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">
                                    {user.student_info?.currentHours || 0}
                                </div>
                                <div className="text-white/70 text-sm">Horas Totales</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{user.rank?.level}</div>
                                <div className="text-white/70 text-sm">Nivel Actual</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{rankHistory.length + 1}</div>
                                <div className="text-white/70 text-sm">Rangos Obtenidos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{Math.round(calculateProgress())}%</div>
                                <div className="text-white/70 text-sm">Progreso</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}