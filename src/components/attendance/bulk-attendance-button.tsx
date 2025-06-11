"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { markBulkAttendance } from "@/actions"

interface BulkAttendanceButtonProps {
    sessionId: string
    studentIds: string[]
    studentCount: number
}

export function BulkAttendanceButton({ sessionId, studentIds, studentCount }: BulkAttendanceButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleBulkAttendance = async () => {
        setIsLoading(true)

        try {
            await markBulkAttendance({ sessionId, studentIds })

            // Refrescar la página para mostrar los cambios
            router.refresh()
        } catch (error) {
            console.error("Error marking bulk attendance:", error)
            // Aquí podrías mostrar un toast de error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleBulkAttendance}
            disabled={isLoading}
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Marcando {studentCount} estudiantes...
                </>
            ) : (
                <>
                    <Users className="w-4 h-4 mr-2" />
                    Marcar Todos Presentes
                </>
            )}
        </Button>
    )
}
