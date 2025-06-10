"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

export function CalendarControls() {

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

    return (
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
    )
}