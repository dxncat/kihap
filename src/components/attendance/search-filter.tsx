"use client"

import { useState, useTransition, useEffect } from "react"
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

    // Función para manejar la búsqueda con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            startTransition(() => {
                const params = new URLSearchParams(searchParams)
                if (searchTerm.trim()) {
                    params.set("search", searchTerm.trim())
                } else {
                    params.delete("search")
                }
                router.replace(`?${params.toString()}`)
            })
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [searchTerm, searchParams, router, startTransition])

    // Sincronizar con el searchParam cuando cambia externamente
    useEffect(() => {
        if (currentSearch !== searchTerm) {
            setSearchTerm(currentSearch)
        }
    }, [currentSearch, searchTerm])

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
