"use server"

import prisma from "@/lib/prisma";

interface Props {
    sessionId: string;
    studentIds: string[];
}

export async function markBulkAttendance({ sessionId, studentIds }: Props) {
    try {
        const attendanceRecords = await prisma.attendance.createMany({
            data: studentIds.map(studentId => ({
                studentId: studentId,
                sessionId: sessionId,
            })),
        });

        return attendanceRecords;
    } catch (error) {
        console.error("Error marking bulk attendance:", error);
        throw new Error("Failed to mark bulk attendance");
    }
}