"use server"

import prisma from "@/lib/prisma"

export async function promoteRank(userId: string, newRankId: number) {
    try {
        // Update the user's rank
        const updatedUser = await prisma.student.update({
            where: { id: userId },
            data: { rankId: newRankId },
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Error promoting rank:", error);
        return { success: false, error: "Failed to promote rank" };
    }
}