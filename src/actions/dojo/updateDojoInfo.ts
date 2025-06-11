"use server"

import prisma from "@/lib/prisma";

export async function updateDojoInfo(dojoId: string, name: string, description: string) {
    try {
        const updatedDojo = await prisma.dojo.update({
            where: { id: dojoId },
            data: { name, description },
        });

        return updatedDojo;
    } catch (error) {
        console.error("Error updating dojo info:", error);
        throw new Error("Failed to update dojo information");
    }
}