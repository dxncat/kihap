import { Activity, TrendingUp, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function StudentStats({ isMaster }: { isMaster: boolean }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">
                Resumen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Activity className="w-5 h-5 mr-2" />
                            Actividad Reciente
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-white/70">Clases esta semana</span>
                                <span className="text-white font-semibold">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-white/70">Horas entrenadas</span>
                                <span className="text-white font-semibold">4.5h</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-white/70">Racha actual</span>
                                <span className="text-white font-semibold">12 días</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Estadísticas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {isMaster ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Estudiantes activos</span>
                                        <span className="text-white font-semibold">15</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Clases impartidas</span>
                                        <span className="text-white font-semibold">156</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Evaluaciones realizadas</span>
                                        <span className="text-white font-semibold">23</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Asistencia promedio</span>
                                        <span className="text-white font-semibold">92%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Técnicas dominadas</span>
                                        <span className="text-white font-semibold">24/30</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Formas completadas</span>
                                        <span className="text-white font-semibold">8/10</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            Próxima Actividad
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-white font-semibold">
                                {isMaster ? "Clase de Técnicas Avanzadas" : "Entrenamiento de Formas"}
                            </div>
                            <div className="text-white/70">Mañana, 10:00 AM</div>
                            <div className="text-white/70">
                                {isMaster ? "Con 8 estudiantes" : "Instructor: Sensei Rodríguez"}
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-red-500 to-yellow-500">
                                Ver Detalles
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}