"use server"

import prisma from "@/lib/prisma";

interface Props {
    studentId: string;
    sessionId: string;
}

export async function markStudentAttendance({ studentId, sessionId }: Props) {

    try {
        const attendance = await prisma.attendance.create({
            data: {
                studentId: studentId,
                sessionId: sessionId,
            },
        });

        return attendance;
    } catch (error) {
        console.error("Error marking attendance:", error);
        throw new Error("Failed to mark attendance");
    }
}