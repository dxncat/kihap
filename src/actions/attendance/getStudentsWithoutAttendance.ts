"use server"

import prisma from "@/lib/prisma";

interface Props {
    sessionId: string;
    rankId: number
}

export async function getStudentsWithoutAttendance({ sessionId, rankId }: Props) {
    try {
        const students = await prisma.student.findMany({
            where: {
                rankId: rankId,
                Attendance: {
                    none: {
                        sessionId: sessionId,
                    },
                }
            },
            include: {
                User: true,
                Rank: true,
                Dojo: true
            },
        });

        if (!students || students.length === 0) {
            return { error: "No students found without attendance in the specified session." };
        }

        return students;
    } catch (error) {
        console.error("Error fetching students without attendance:", error);
        return { error: "An error occurred while fetching students." };
    }
}