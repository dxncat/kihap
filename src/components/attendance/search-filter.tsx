"use client"

import { useState, useTransition, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchFilterProps {
    currentSearch: string
}

export function SearchFilter({ currentSearch }: SearchFilterProps) {
    const [searchTerm, setSearchTerm] = useState(currentSearch)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Función debounced para actualizar la URL
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            startTransition(() => {
                const params = new URLSearchParams(searchParams)
                if (value.trim()) {
                    params.set("search", value.trim())
                } else {
                    params.delete("search")
                }
                router.replace(`?${params.toString()}`)
            })
        }, 500), // 500ms de delay
        [searchParams, router, startTransition],
    )

    // Efecto para manejar el debounce
    useEffect(() => {
        debouncedSearch(searchTerm)

        // Cleanup function para cancelar el debounce si el componente se desmonta
        return () => {
            debouncedSearch.cancel()
        }
    }, [searchTerm, debouncedSearch])

    // Sincronizar con el searchParam cuando cambia externamente
    useEffect(() => {
        if (currentSearch !== searchTerm) {
            setSearchTerm(currentSearch)
        }
    }, [currentSearch])

    const handleInputChange = (value: string) => {
        setSearchTerm(value)
    }

    return (
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                        placeholder="Buscar estudiantes por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    {isPending && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                    )}
                    {searchTerm && !isPending && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <button
                                onClick={() => handleInputChange("")}
                                className="w-4 h-4 text-white/50 hover:text-white transition-colors"
                                aria-label="Limpiar búsqueda"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
                {searchTerm && (
                    <div className="mt-2 text-xs text-white/60">
                        {isPending ? (
                            "Buscando..."
                        ) : (
                            <>
                                Buscando: &quot;<span className="text-white/80">{searchTerm}</span>&quot;
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// Función debounce personalizada
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T & { cancel: () => void } {
    let timeoutId: NodeJS.Timeout | null = null

    const debouncedFunction = ((...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }) as T & { cancel: () => void }

    debouncedFunction.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return debouncedFunction
}
