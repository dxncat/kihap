"use server"

import prisma from "@/lib/prisma";

export async function getSessionsByDojoId(dojoId: string) {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                dojoId: dojoId,
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