"use server"

import prisma from "@/lib/prisma";

export const getNewsByDojoId = async (dojoId: string) => {
    try {
        const news = await prisma.news.findMany({
            where: { dojoId },
            orderBy: { createdAt: 'desc' }
        });

        return news;
    }
    catch (error) {
        console.error("Error fetching news:", error);
        throw new Error("Failed to fetch news");
    }
}