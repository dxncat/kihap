"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "../ui/card"
import { Sessions } from "@/interfaces/types"
import { useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
    sessions: Sessions[]
}

export function CalendarGrid({ sessions }: Props) {

    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
    const [currentDate, setCurrentDate] = useState(new Date())

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev)
            if (direction === "prev") {
                newDate.setMonth(prev.getMonth() - 1)
            } else {
                newDate.setMonth(prev.getMonth() + 1)
            }
            return newDate
        })
    }

    const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ]

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()

        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null)
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day))
        }

        return days
    }

    const getSessionsForDate = (date: Date) => {
        return sessions.filter((session) => {
            const sessionDate = new Date(session.startTime)
            return sessionDate.toDateString() === date.toDateString()
        })
    }

    const formatTime = (dateString: Date) => {
        return dateString.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <>
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("prev")}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("next")}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant={viewMode === "month" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("month")}
                        className={
                            viewMode === "month"
                                ? "bg-gradient-to-r from-red-500 to-yellow-500"
                                : "border-white/20 text-white hover:bg-white/10"
                        }
                    >
                        Mes
                    </Button>
                    <Button
                        variant={viewMode === "week" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("week")}
                        className={
                            viewMode === "week"
                                ? "bg-gradient-to-r from-red-500 to-yellow-500"
                                : "border-white/20 text-white hover:bg-white/10"
                        }
                    >
                        Semana
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
            >
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-4 md:p-6">
                        {/* Calendar Header */}
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {dayNames.map((day) => (
                                <div key={day} className="text-center text-white/70 font-semibold py-2 text-sm md:text-base">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1 md:gap-2">
                            {getDaysInMonth(new Date()).map((date, index) => (
                                <div
                                    key={index}
                                    className={`min-h-[80px] md:min-h-[120px] p-1 md:p-2 rounded-lg border border-white/10 ${date ? "bg-white/5 hover:bg-white/10 cursor-pointer" : ""
                                        } transition-colors`}
                                >
                                    {date && (
                                        <>
                                            <div className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">
                                                {date.getDate()}
                                            </div>
                                            <div className="space-y-1">
                                                {getSessionsForDate(date)
                                                    .slice(0, 2)
                                                    .map((session) => (
                                                        <div
                                                            key={session.id}
                                                            className="text-xs p-1 rounded bg-gradient-to-r from-red-500/20 to-yellow-500/20 border border-red-500/30 text-white/90"
                                                        >
                                                            <div className="font-medium truncate">{session.title}</div>
                                                            <div className="text-white/70 text-xs">{formatTime(session.startTime)}</div>
                                                        </div>
                                                    ))}
                                                {getSessionsForDate(date).length > 2 && (
                                                    <div className="text-xs text-white/60 text-center">
                                                        +{getSessionsForDate(date).length - 2} más
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}