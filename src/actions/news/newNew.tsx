"use server"

import prisma from "@/lib/prisma";

export async function newNew(data: FormData) {
    try {
        const title = data.get("title")?.toString().trim();
        const description = data.get("description")?.toString().trim();
        const dojoId = data.get("dojoId")?.toString().trim();

        // Validaciones básicas
        if (!title || !description || !dojoId) {
            throw new Error("Por favor completa todos los campos obligatorios");
        }

        // Crear la nueva noticia en la base de datos
        const news = await prisma.news.create({
            data: {
                title,
                content: description,
                dojoId,
            },
        });

        return news;
    } catch (error) {
        console.error("Error creating news:", error);
        throw new Error("Error creating news");
    }
}