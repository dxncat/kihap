"use server"

import prisma from "@/lib/prisma";

export async function getDojoById(dojoId: string) {
    try {
        const dojo = prisma.dojo.findUnique({
            where: { id: dojoId },
            include: {
                Master: true
            }
        });
        return dojo;
    }
    catch (error) {
        console.error("Error fetching dojo by ID:", error);
        throw new Error("Failed to fetch dojo by ID");
    }
}
