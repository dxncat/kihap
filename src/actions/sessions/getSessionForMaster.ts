"use server"

import prisma from "@/lib/prisma";

interface Props {
    dojoId: string;
}

export async function getSessionsForMaster({ dojoId }: Props) {
    try {
        const today = new Date();
        const sessions = await prisma.session.findMany({
            where: {
                dojoId: dojoId,
                startTime: {
                    gte: today, // Solo sesiones futuras o de hoy
                },
            },
            orderBy: {
                startTime: "desc",
            },
            include: {
                Rank: true
            }
        });

        return sessions;
    } catch (error) {
        console.error("Error fetching news by dojo ID:", error);
        throw new Error("Failed to fetch news");
    }
}