import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";
import { Master } from './generated/prisma/index';

// Add type definitions
interface StudentInfo {
    id: string;
    userId: string;
    dojoId: string;
    rankId: number;
    currentHours: number;
}

interface DojoInfo {
    id: string;
    code: string;
    name: string;
    description?: string | null;
    Master?: Master | null;
}

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user
            }
            return token
        },
        session({ session, token }) {
            session.user = token.data as any
            return session
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data

                // buscar usuario en la base de datos
                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() },
                })

                if (!user) return null

                if (!bcryptjs.compareSync(password, user.password)) return null

                //asignar información según el rol del usuario
                switch (user.role) {
                    case "MASTER": {
                        const master_id = await prisma.master.findUnique({
                            where: { userId: user.id },
                            select: { id: true }
                        });

                        const dojo = await prisma.dojo.findFirst({
                            where: { masterId: master_id?.id }
                        });
                        (user as any).dojo = dojo;
                        break;
                    }
                    case "STUDENT": {
                        // Update student info retrieval with proper typing
                        const student_info = await prisma.student.findUnique({
                            where: { userId: user.id },
                        }) as StudentInfo | null;

                        if (student_info) {
                            const dojo = await prisma.dojo.findFirst({
                                where: { id: student_info.dojoId },
                                include: {
                                    Master: true
                                }
                            }) as DojoInfo | null;

                            const rank = await prisma.rank.findUnique({
                                where: { id: student_info.rankId },
                            });
                            if (rank) {
                                // Ensure proper typing when assigning to user
                                (user as any).rank = rank;
                            }

                            // Ensure proper typing when assigning to user
                            (user as any).student_info = student_info;
                            (user as any).dojo = dojo;
                        }
                        break;
                    }
                }

                //regresar el usuario sin el password
                const { password: _, ...rest } = user

                return rest
            }
        })
    ]
}


export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
