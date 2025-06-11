"use server"

import prisma from "@/lib/prisma";

export async function getSessionById(sessionId: string) {
    try {
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId,
            }
        });

        return session;
    } catch (error) {
        console.error("Error fetching session by ID:", error);
        throw new Error("Failed to fetch session");
    }
}