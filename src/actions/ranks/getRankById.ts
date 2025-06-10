"use server"

import prisma from "@/lib/prisma";

interface Props {
    rankId: number;
}

export const getRankById = async ({ rankId }: Props) => {
    try {
        const rank = await prisma.rank.findUnique({
            where: { id: rankId }
        });

        if (!rank) {
            throw new Error("Rank not found");
        }

        return rank;
    } catch (error) {
        console.error("Error fetching rank by ID:", error);
        throw new Error("Failed to fetch rank by ID");
    }
};