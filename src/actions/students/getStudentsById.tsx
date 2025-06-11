"use server"

import prisma from "@/lib/prisma"

export async function getStudentsById(id: string) {
    try {
        const students = await prisma.student.findUnique({
            where: {
                id: id,
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