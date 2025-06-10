"use server"

import prisma from "@/lib/prisma";

interface Props {
    masterId: string;
}

export const getMasterDojo = async ({ masterId }: Props) => {
    try {
        const userId = await prisma.master.findFirst({
            where: { id: masterId },
            select: { userId: true }
        });

        if (!userId) {
            throw new Error("Master not found for the given ID");
        }

        const master = await prisma.user.findUnique({
            where: { id: userId.userId },
        })

        return master;
    } catch (error) {
        console.error("Error fetching dojo for master:", error);
        throw new Error("Failed to fetch dojo for master");
    }
};