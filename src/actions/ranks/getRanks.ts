"use server"

import prisma from "@/lib/prisma";

export async function getRanks() {
    try {
        const ranks = await prisma.rank.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        return ranks;
    } catch (error) {
        console.error("Error fetching ranks:", error);
        throw new Error("Failed to fetch ranks");
    }
}