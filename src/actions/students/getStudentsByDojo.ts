"use server"

import prisma from "@/lib/prisma"

export async function getStudentsByDojo(dojoId: string) {
    try {
        const students = await prisma.student.findMany({
            where: {
                dojoId: dojoId,
            },
            include: {
                User: true,
                Rank: true,
            },
        });

        return students;
    } catch (error) {
        console.error("Error fetching students by dojo:", error);
        throw new Error("Failed to fetch students");
    }
}