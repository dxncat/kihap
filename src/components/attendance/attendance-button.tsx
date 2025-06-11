"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { markStudentAttendance } from "@/actions"

interface AttendanceButtonProps {
    sessionId: string
    studentId: string
    studentName: string
}

export function AttendanceButton({ sessionId, studentId }: AttendanceButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleMarkAttendance = async () => {
        setIsLoading(true)

        try {
            await markStudentAttendance({ studentId, sessionId })

            // Refrescar la página para mostrar los cambios
            router.refresh()
        } catch (error) {
            console.error("Error marking attendance:", error)
            // Aquí podrías mostrar un toast de error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleMarkAttendance}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            size="sm"
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Marcando...
                </>
            ) : (
                <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar Asistencia
                </>
            )}
        </Button>
    )
}
