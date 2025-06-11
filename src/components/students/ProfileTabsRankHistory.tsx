"use client"

import { formatDate, getBeltColor } from "@/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Rank, RankHistory, Student } from "@/interfaces/types";
import { Badge } from "../ui/badge";

interface Props {
    user: Student,
    rankHistory: RankHistory[],
    nextRank: Rank
}

export function StudentProfileTabsRankHistory({ user, rankHistory, nextRank }: Props) {
    return (
        <div className="space-y-6 mt-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Progresión de Rangos</CardTitle>
                    <CardDescription className="text-white/70">
                        Tu camino desde el primer rango hasta tu nivel actual
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Rango actual */}
                        <div className="flex items-start space-x-4">
                            <div className="w-4 h-4 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <Badge className={`${getBeltColor(user.Rank?.name || "")} mb-2 sm:mb-0`}>
                                        {user.Rank?.name} (Actual)
                                    </Badge>
                                    <span className="text-white/70 text-sm">En progreso</span>
                                </div>
                                <div className="text-white/80 text-sm mb-1">
                                    Horas completadas: {user.currentHours} /{" "}
                                    {nextRank.hoursRequired}
                                </div>
                                <div className="text-white/60 text-sm">{user.Rank?.description}</div>
                            </div>
                        </div>

                        {/* Historial de rangos */}
                        {rankHistory.map((rank) => (
                            <div key={rank.id} className="flex items-start space-x-4">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <Badge className={`${getBeltColor(rank.Rank.name)} mb-2 sm:mb-0`}>
                                            {rank.Rank.name} (Completado)
                                        </Badge>
                                        <span className="text-white/70 text-sm">
                                            {rank.finishedAt ? formatDate(rank.finishedAt) : "N/A"}
                                        </span>
                                    </div>
                                    <div className="text-white/80 text-sm mb-1">
                                        Duración:{" "}
                                        {rank.finishedAt
                                            ? Math.ceil(
                                                (rank.finishedAt.getTime() - new Date(rank.createdAt).getTime()) /
                                                (1000 * 60 * 60 * 24),
                                            )
                                            : "N/A"}{" "}
                                        días
                                    </div>
                                    <div className="text-white/60 text-sm">{user.Rank?.description}</div>
                                    <div className="text-white/60 text-sm">Rango completado exitosamente</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}