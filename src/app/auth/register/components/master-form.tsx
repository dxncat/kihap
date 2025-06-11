"use client"

import { login, registerMaster } from "@/actions";
import { Button, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Input, Label } from "@/components"
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form";

type FormInputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}


export const RegisterFormMaster = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('')
        const { name, email, password, confirmPassword } = data

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden')
            return
        }

        const res = await registerMaster(name, email, password)

        if (!res.ok) {
            setErrorMessage(res.message)
            return
        }

        await login(email.toLowerCase(), password)
        window.location.replace('/news')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle className="text-white text-xl">Registro de Instructor</CardTitle>
                <CardDescription className="text-white/70">
                    Crea tu cuenta para gestionar tus clases y estudiantes
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
                <div className="space-y-2">
                    <Label htmlFor="instructor-name" className="text-white">
                        Nombre Completo
                    </Label>
                    <Input
                        id="instructor-name"
                        placeholder="Tu nombre completo"
                        required
                        className={clsx(
                            "bg-white/10 border-white/20 text-white placeholder:text-white/50",
                            errors.name && "border-red-500"
                        )}
                        type="text"
                        autoFocus
                        {...register("name", { required: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructor-email" className="text-white">
                        Email
                    </Label>
                    <Input
                        id="instructor-email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className={clsx(
                            "bg-white/10 border-white/20 text-white placeholder:text-white/50",
                            errors.email && "border-red-500"
                        )}
                        autoFocus
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="instructor-password" className="text-white">
                            Contraseña
                        </Label>
                        <Input
                            id="instructor-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instructor-confirm-password" className="text-white">
                            Confirmar Contraseña
                        </Label>
                        <Input
                            id="instructor-confirm-password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            {...register("confirmPassword", { required: true, minLength: 6 })}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="instructor-terms"
                    />
                    <Label htmlFor="instructor-terms" className="text-sm text-white/70">
                        Acepto los{" "}
                        <Link href="/terms" className="text-red-400 hover:text-red-300">
                            términos y condiciones
                        </Link>
                    </Label>
                </div>
                {errorMessage && <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded-md">{errorMessage}</div>}
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 mt-8"
                >
                    Registrarme como Instructor
                </Button>
            </CardFooter>
        </form>
    )
}