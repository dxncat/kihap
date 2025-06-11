"use server"

import { Sessions } from "@/interfaces/types";
import prisma from "@/lib/prisma";

interface Props {
    session: Sessions
}

export async function newSession({ session }: Props) {
    try {
        const newSession = await prisma.session.create({
            data: {
                title: session.title,
                description: session.description,
                dojoId: session.dojoId,
                rankId: session.rankId,
                startTime: session.startTime,
                endTime: session.endTime,
            },
        });

        return newSession;
    } catch (error) {
        console.error("Error creating new session:", error);
        throw new Error("Failed to create new session");
    }
}