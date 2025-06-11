import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Calendar, User, CheckCircle2, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Student } from "@/interfaces/types"
import { getRankById, getStudentsByDojo } from "@/actions"
import { redirect } from "next/navigation"
import { auth } from "@/auth.config"
import { formatDate, getBeltColor } from "@/utils"

function canPromote(student: Student): boolean {
    return (
        student.Rank?.hoursRequired !== undefined &&
        student.nextRank?.hoursRequired !== undefined &&
        student.currentHours >= student.nextRank.hoursRequired
    )
}

function getProgress(student: Student): number {
    if (!student.Rank || typeof student.Rank.hoursRequired !== "number" || student.nextRank?.hoursRequired === 0) {
        return 0
    }
    if (!student.nextRank || typeof student.nextRank.hoursRequired !== "number" || student.nextRank.hoursRequired === 0) {
        return 0
    }
    return Math.round((student.currentHours / student.nextRank.hoursRequired) * 100)
}

export default async function StudentsPage() {

    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    const students_src = await getStudentsByDojo(session.user.dojo?.id || "")

    const students = await Promise.all(students_src.map(async (student) => {
        const nextRank = await getRankById({ rankId: (student.rankId !== undefined ? student.rankId + 1 : 0) })
        return {
            ...student,
            nextRank: nextRank || null
        }
    }))

    const promotableStudents = students.filter((s) => canPromote(s))
    const averageProgress = Math.round(students.reduce((acc, s) => acc + getProgress(s), 0) / students.length)

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Gestión de Estudiantes</h1>
                                <p className="text-white/70 text-lg">
                                    Administra a tus estudiantes, revisa su progreso y promueve sus rangos
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/70 text-xs md:text-sm">Total Estudiantes</p>
                                        <p className="text-2xl md:text-3xl font-bold text-white">{students.length}</p>
                                    </div>
                                    <User className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/70 text-xs md:text-sm">Estudiantes Activos</p>
                                        <p className="text-2xl md:text-3xl font-bold text-white">{students.length}</p>
                                    </div>
                                    <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/70 text-xs md:text-sm">Listos para Promoción</p>
                                        <p className="text-2xl md:text-3xl font-bold text-white">{promotableStudents.length}</p>
                                    </div>
                                    <ArrowUp className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/70 text-xs md:text-sm">Progreso Promedio</p>
                                        <p className="text-2xl md:text-3xl font-bold text-white">{averageProgress}%</p>
                                    </div>
                                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Students Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {students.map((student) => {
                            const progress = getProgress(student)
                            const isPromotable = canPromote(student)

                            return (
                                <Card
                                    key={student.id}
                                    className={`bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 ${isPromotable ? "ring-2 ring-yellow-500/50" : ""
                                        }`}
                                >
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex items-start space-x-4">
                                            <Image
                                                src={student.User.image || "https://avatar.iran.liara.run/public"}
                                                alt={student.User.name}
                                                width={60}
                                                height={60}
                                                className="rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-white font-semibold truncate">{student.User.name}</h3>
                                                    <Badge className="bg-green-500">Activo</Badge>
                                                </div>

                                                <Badge className={`${getBeltColor(student.Rank.name)} mb-3 text-xs`}>{student.Rank.name}</Badge>

                                                <div className="space-y-3">
                                                    <div className="text-white/70 text-sm">
                                                        <span className="font-medium">Email:</span> {student.User.email}
                                                    </div>
                                                    <div className="text-white/70 text-sm">
                                                        <span className="font-medium">Desde:</span> {formatDate(student.User.createdAt)}
                                                    </div>
                                                    <div className="text-white/70 text-sm">
                                                        <span className="font-medium">Horas actuales:</span> {student.currentHours}
                                                    </div>
                                                    <div className="text-white/70 text-sm">
                                                        <span className="font-medium">Horas requeridas:</span> {student.Rank.hoursRequired}
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-white/70">Progreso hacia el próximo rango</span>
                                                        <span className="text-white">{progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-white/10 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs mt-1">
                                                        <span className="text-white/60">
                                                            {student.currentHours}/{student.nextRank.hoursRequired} horas
                                                        </span>
                                                        <span className="text-white/60">
                                                            {Math.max(0, student.nextRank.hoursRequired - student.currentHours)} restantes
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex gap-2">
                                                    <Link href={`/profile/${student.id}`} className="w-full">
                                                        <Button
                                                            className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full"
                                                            size="sm"
                                                        >
                                                            Ver Perfil
                                                        </Button>
                                                    </Link>
                                                    {isPromotable && student.nextRank && (
                                                        <form action="/api/promote-student" method="POST" className="flex-1">
                                                            <input type="hidden" name="studentId" value={student.id} />
                                                            <input type="hidden" name="currentRankId" value={student.rankId} />
                                                            <input type="hidden" name="nextRankId" value={student.nextRank.id} />
                                                            <Button type="submit" className="w-full" size="sm">
                                                                <ArrowUp className="w-4 h-4 mr-2" />
                                                                Promover
                                                            </Button>
                                                        </form>
                                                    )}
                                                </div>

                                                {isPromotable && student.nextRank && (
                                                    <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                                        <p className="text-yellow-400 text-xs font-medium">¡Listo para promoción!</p>
                                                        <p className="text-white/70 text-xs mt-1">Próximo rango: {student.nextRank.name}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
