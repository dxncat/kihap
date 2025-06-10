import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getRanks } from "@/actions"
import { ClassForm } from "./components/form"

export default async function NewClassPage() {

    const ranks = await getRanks()

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Link href="/calendar">
                                        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">Programar Nueva Clase</h1>
                                </div>
                                <p className="text-white/70 text-lg mt-2">
                                    Crea una nueva sesión de entrenamiento para tus estudiantes
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <ClassForm ranks={ranks} />
                </div>
            </div>
        </div>
    )
}
