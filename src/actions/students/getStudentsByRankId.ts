"use server"

import prisma from "@/lib/prisma"

export async function getStudentsByRankId(rankId: number) {
    try {
        const students = await prisma.student.findMany({
            where: {
                rankId: rankId,
            },
            include: {
                User: true,
                Rank: true,
                Dojo: true
            },
        });

        return students;
    } catch (error) {
        console.error("Error fetching students by dojo:", error);
        throw new Error("Failed to fetch students");
    }
}