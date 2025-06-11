"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Rank, Student } from "@/interfaces/types";
import { getBeltColor } from "@/utils";

interface Props {
    user: Student,
    nextRank?: Rank
}

export function StudentProgressCard({ user, nextRank }: Props) {

    const calculateProgress = () => {
        const hoursRequired = nextRank?.hoursRequired ?? 1;
        return Math.min((user.currentHours / hoursRequired) * 100, 100)
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
                    <CardDescription className="text-white/70">{user.Rank?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Progress value={calculateProgress()} className="h-3" />
                        <div className="flex justify-between text-sm">
                            <span className="text-white/70">
                                {user.currentHours} / {nextRank?.hoursRequired}{" "}
                                horas
                            </span>
                            <span className="text-white/70">
                                {Math.max(
                                    0,
                                    (nextRank?.hoursRequired ?? 0) - (user.currentHours ?? 0),
                                )}{" "}
                                horas restantes
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <Badge className={`${getBeltColor(user.Rank?.name || "")} whitespace-normal break-words`}>
                                {user.Rank?.name}
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