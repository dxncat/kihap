"use client"

import { RankHistory, Student } from "@/interfaces/types"
import { motion } from "framer-motion"
import { Calendar, MapPin, Trophy } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { formatDate, getBeltColor } from "@/utils"

interface Props {
    user: Student,
    rankHistory: RankHistory[]
}

export function StudentHeader({ user, rankHistory }: Props) {

    const calculateProgress = () => {
        const studentUser = user as Student
        if (!studentUser.nextRank || !studentUser.nextRank.hoursRequired) return 0
        return Math.min((studentUser.currentHours / studentUser.nextRank.hoursRequired) * 100, 100)
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
                        src={user.User?.image || "https://avatar.iran.liara.run/public"}
                        alt={user.User?.name || "Avatar"}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-gradient-to-r from-red-500 to-yellow-500"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2">
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.User?.name}</h1>
                    <p className="text-white/70 text-lg mb-4">{user.User?.email}</p>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <Badge className={`${getBeltColor(user.Rank?.name ?? "")}text-sm px-3 py-1 whitespace-normal break-words`}>
                            {user.Rank?.name}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                            <MapPin className="w-3 h-3 mr-1" />
                            {user.User?.dojo?.name || "Sin Dojo"}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                            <Calendar className="w-3 h-3 mr-1" />
                            Desde {formatDate(user.User?.createdAt || new Date())}
                        </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                                {user.currentHours || 0}
                            </div>
                            <div className="text-white/70 text-sm">Horas Totales</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{user.Rank?.level}</div>
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
                </div>
            </div>
        </motion.div>
    )
}