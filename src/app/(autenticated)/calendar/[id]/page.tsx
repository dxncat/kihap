import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, CheckCircle, Clock, Calendar, Filter, UserCheck, UserX } from "lucide-react"
import Image from "next/image"
import { getBeltColor } from "@/utils"
import { getSessionById, getStudentsByRankId, getStudentsWithoutAttendance } from "@/actions"
import { AttendanceButton, BulkAttendanceButton, SearchFilter } from "@/components"

interface Props {
  params: {
    id: string
  }
  searchParams: {
    search?: string
  }
}

// Función para formatear fecha y hora
function formatDateTime(date: Date) {
  return {
    date: date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    }),
  }
}

export default async function AttendancePage({ params, searchParams }: Props) {
  const { id } = await params
  const { search = "" } = searchParams

  // Obtener datos del servidor
  const session_to = await getSessionById(id)

  if (!session_to) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Sesión no encontrada</h1>
          <p className="text-white/70">La sesión solicitada no existe o ha sido eliminada.</p>
        </div>
      </div>
    )
  }

  // Obtener estudiantes por rango
  const students = await getStudentsByRankId(session_to.rankId)

  if (!students || students.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">No hay estudiantes</h1>
          <p className="text-white/70">No se encontraron estudiantes para este rango en esta sesión.</p>
        </div>
      </div>
    )
  }

  // Obtener estudiantes sin asistencia
  const allStudentsWithoutAttendance = await getStudentsWithoutAttendance({rankId: session_to.rankId, sessionId: id})

  // Filtrar estudiantes en el servidor
  const filteredStudents = Array.isArray(allStudentsWithoutAttendance)
    ? allStudentsWithoutAttendance.filter(
        (student) =>
          student.User.name.toLowerCase().includes(search.toLowerCase()) ||
          student.User.email.toLowerCase().includes(search.toLowerCase()),
      )
    : []

  // Calcular estadísticas
  const totalStudentsWithoutAttendance = Array.isArray(allStudentsWithoutAttendance) ? allStudentsWithoutAttendance.length : 0
  const attendanceMarked = students.length - totalStudentsWithoutAttendance
  const totalStudents = students.length

  // Formatear fechas
  const startDateTime = formatDateTime(session_to.startTime)
  const endDateTime = formatDateTime(session_to.endTime)

  // Obtener información del rango desde el primer estudiante
  const rankInfo = students[0]?.Rank

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Control de Asistencia</h1>
              <p className="text-white/70 text-lg">{session_to.title}</p>
              {session_to.description && <p className="text-white/60 text-sm mt-1">{session_to.description}</p>}
            </div>
            <div className="flex items-center space-x-4">
              {rankInfo && (
                <Badge className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-3 py-1">
                  {rankInfo.name}
                </Badge>
              )}
              <div className="text-white/70 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {startDateTime.date}
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {startDateTime.time} - {endDateTime.time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Pendientes de Marcar</p>
                  <p className="text-3xl font-bold text-white">{totalStudentsWithoutAttendance}</p>
                </div>
                <UserX className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Asistencias Marcadas</p>
                  <p className="text-3xl font-bold text-white">{attendanceMarked}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Estudiantes</p>
                  <p className="text-3xl font-bold text-white">{totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search - Componente del cliente */}
        <div className="mb-6">
          <SearchFilter currentSearch={search} />
        </div>

        {/* Students Table */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Estudiantes Sin Asistencia Marcada
            </CardTitle>
            <CardDescription className="text-white/70">
              Solo se muestran los estudiantes que aún no tienen asistencia registrada para esta sesión
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {totalStudentsWithoutAttendance === 0
                    ? "¡Todas las asistencias han sido marcadas!"
                    : "No se encontraron estudiantes"}
                </h3>
                <p className="text-white/70">
                  {totalStudentsWithoutAttendance === 0
                    ? "Todos los estudiantes de esta sesión ya tienen su asistencia registrada."
                    : "No hay estudiantes que coincidan con tu búsqueda."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/70">Estudiante</TableHead>
                      <TableHead className="text-white/70">Email</TableHead>
                      <TableHead className="text-white/70">Rango</TableHead>
                      <TableHead className="text-white/70">Horas Actuales</TableHead>
                      <TableHead className="text-white/70">Progreso</TableHead>
                      <TableHead className="text-white/70 text-center">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const progressPercentage = Math.min(
                        (student.currentHours / student.Rank.hoursRequired) * 100,
                        100,
                      )

                      return (
                        <TableRow key={student.id} className="border-white/10 hover:bg-white/5 transition-colors">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Image
                                src={student.User.image || "https://avatar.iran.liara.run/public"}
                                alt={student.User.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <div className="text-white font-medium">{student.User.name}</div>
                                <div className="text-white/50 text-sm">ID: {student.id.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-white/80">{student.User.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getBeltColor(student.Rank.name)} text-xs`}>{student.Rank.name}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-white/80">
                              {student.currentHours}h / {student.Rank.hoursRequired}h
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-white/10 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progressPercentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white/70 text-xs">{Math.round(progressPercentage)}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <AttendanceButton sessionId={id} studentId={student.id} studentName={student.User.name} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {filteredStudents.length > 0 && (
          <div className="mt-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-white/70">
                    <span className="font-medium">{filteredStudents.length}</span> estudiantes pendientes de marcar
                    asistencia
                  </div>
                  <BulkAttendanceButton
                    sessionId={id}
                    studentIds={filteredStudents.map((s) => s.id)}
                    studentCount={filteredStudents.length}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
