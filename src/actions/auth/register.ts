'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerMaster = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
                role: 'MASTER'
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return {
            ok: true,
            user: user,
            message: 'Usuario registrado correctamente'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al registrar el usuario'
        }
    }
}

export const registerStudent = async (name: string, email: string, password: string, dojoId: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
                role: 'STUDENT',
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        await prisma.student.create({
            data: {
                userId: user.id,
                dojoId: dojoId
            }
        })

        return {
            ok: true,
            user: user,
            message: 'Usuario registrado correctamente'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al registrar el usuario'
        }
    }
}