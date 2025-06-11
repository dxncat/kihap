'use server'

import { signIn } from "@/auth.config"


export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        })

        return 'Success'

    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'type' in error && (error as { type: string }).type === 'CredentialsSignin') {
            return 'CredentialsSignin'
        }
        return 'Error al autenticar'
    }
}

export const login = async (email: string, password: string) => {
    try {
        await signIn('Credentials', {
            email,
            password
        })
        return ({
            ok: true,
            message: "Usuario autenticado correctamente"
        })
    } catch {
        return {
            ok: false,
            message: "Error al autenticar el usuario"
        }
    }
}