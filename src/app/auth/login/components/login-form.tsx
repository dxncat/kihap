"use client"

import type React from "react"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { authenticate } from "@/actions/auth/login"
import { EyeOff, Eye, Lock, Mail } from "lucide-react"

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [state, dispatch] = useActionState(authenticate, undefined)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (state === "Success") {
            // router.replace("/")
            router.push("/news")
        }
    }, [state])

    // Función para alternar visibilidad de contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border-white/10">
            <form action={dispatch} className="space-y-6 p-y-6">
                <CardHeader>
                    <CardTitle className="text-white text-xl">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-white/70">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Correo Electrónico
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors duration-200" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@ejemplo.com"
                                name="email"
                                className={`pl-10 transition-all duration-200 ${state === "CredentialsSignin"
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    }`}
                                required
                            />
                        </div>
                        {state === "CredentialsSignin" && (
                            <p className="text-xs text-red-600 animate-in slide-in-from-top-1 duration-200">Credenciales Invalidas</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className={`pl-10 pr-10 transition-all duration-200 ${state === "CredentialsSignin"
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    }`}
                                required
                            />
                            {/* Botón para mostrar/ocultar contraseña */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {state === "CredentialsSignin" && (
                            <p className="text-xs text-red-600 animate-in slide-in-from-top-1 duration-200">Credenciales invalidas</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                            />
                            <Label htmlFor="remember" className="text-sm text-white/70">
                                Recordar mi sesión
                            </Label>
                        </div>
                        <div>
                            <Link href="/auth/register" className="text-sm text-red-400 hover:text-red-300">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </div>
                    {formError && <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded-md">{formError}</div>}
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 mt-8"
                        disabled={isLoading}
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
