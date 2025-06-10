"use server"

import prisma from "@/lib/prisma"

export const getRankHistory = async (studentId: string) => {
    try {
        const rankHistory = await prisma.rankHistory.findMany({
            where: { studentId },
            orderBy: { rankId: 'desc' },
            include: {
                Rank: {
                    select: {
                        name: true,
                    }
                }
            }

        })

        return rankHistory
    } catch (error) {
        console.error("Error fetching rank history:", error)
        throw new Error("Failed to fetch rank history")
    }
}