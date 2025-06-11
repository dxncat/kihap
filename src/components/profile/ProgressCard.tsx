"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Rank, User } from "@/interfaces/types";
import { getBeltColor } from "@/utils";

interface Props {
    user: User,
    nextRank?: Rank
}

export function ProgressCard({ user, nextRank }: Props) {

    const isStudent = user.role === "STUDENT";

    const calculateProgress = () => {
        if (!isStudent) return 0
        const studentUser = user as User & { student_info: { currentHours: number, rankId: number }, rank: { hoursRequired: number } }
        return Math.min((studentUser.student_info.currentHours / studentUser.rank.hoursRequired) * 100, 100)
    }

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Progreso hacia el Próximo Rango
                    </CardTitle>
                    <CardDescription className="text-white/70">{user.rank?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Progress value={calculateProgress()} className="h-3" />
                        <div className="flex justify-between text-sm">
                            <span className="text-white/70">
                                {user.student_info?.currentHours} / {user.rank?.hoursRequired}{" "}
                                horas
                            </span>
                            <span className="text-white/70">
                                {Math.max(
                                    0,
                                    (user.rank?.hoursRequired ?? 0) - (user.student_info?.currentHours ?? 0),
                                )}{" "}
                                horas restantes
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Badge className={`${getBeltColor(user.rank?.name || "")} whitespace-normal break-words`}>
                                {user.rank?.name}
                            </Badge>
                            <div className="flex-1 mx-4 border-t border-dashed border-white/30"></div>
                            <Badge className={`${getBeltColor(nextRank?.name || "")} whitespace-normal break-words`}>
                                {nextRank?.name || "Próximo Rango"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}