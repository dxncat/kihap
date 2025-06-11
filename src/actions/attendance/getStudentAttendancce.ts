"use server"

import prisam from "@/lib/prisma";
interface Props {
    studentId: string;
    sessionId: string;
}

export async function getStudentAttendance({ studentId, sessionId }: Props) {
    try {
        const attendance = await prisam.attendance.findMany({
            where: {
                studentId: studentId,
                sessionId: sessionId,
            },
        });

        if (!attendance || attendance.length === 0) {
            return { error: "No attendance records found for this student in the specified session." };
        }

        return attendance;
    } catch (error) {
        console.error("Error fetching student attendance:", error);
        return { error: "An error occurred while fetching attendance records." };
    }

}