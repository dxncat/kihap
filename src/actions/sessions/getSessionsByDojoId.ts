"use server"

import prisma from "@/lib/prisma";

interface Props {
    dojoId: string;
    rankId: number;
}

export async function getSessionsByDojoId({ dojoId, rankId }: Props) {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                dojoId: dojoId,
                rankId: rankId,
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