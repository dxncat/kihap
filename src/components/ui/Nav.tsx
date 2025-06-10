"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { titleFont } from "@/config/fonts";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { logout } from "@/actions";

export function Nav() {

    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isAuthenticated = !!session?.user
    const isAdmin = session?.user?.role !== 'STUDENT' && session?.user?.role !== undefined;
    console.log({ isAdmin });

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Image
                            src={"/images/favicon.ico"}
                            alt="Kihap Logo"
                            width={8}
                            height={8}
                            className="w-8 h-8"
                        />
                    </div>
                    <div className="size-8">
                        <span className={`${titleFont.className} text-4xl font-bold text-white`}>KIHAP</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/profile" className="text-white/80 hover:text-white transition-colors">
                        Perfil
                    </Link>
                    <Link href="/calendar" className="text-white/80 hover:text-white transition-colors">
                        Calendario
                    </Link>
                    <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                        Noticias
                    </Link>
                    {
                        isAuthenticated ? (
                            <form
                                action={async () => {
                                    await logout();
                                }}
                                className='flex w-full'
                            >
                                <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                    Cerrar Sesión
                                </Button>
                            </form>
                        ) : (
                            <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                Comenzar Ahora
                            </Button>
                        )
                    }
                </div>

                {/* Mobile Navigation */}
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
                >
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link href="/profile" className="block text-white/80 hover:text-white transition-colors">
                            Perfil
                        </Link>
                        <Link href="/calendar" className="block text-white/80 hover:text-white transition-colors">
                            Calendario
                        </Link>
                        <Link href="/news" className="block text-white/80 hover:text-white transition-colors">
                            Noticias
                        </Link>
                        {
                            isAuthenticated ? (
                                <form
                                    action={async () => {
                                        await logout();
                                    }}
                                    className='flex w-full'
                                >
                                    <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                        Cerrar Sesión
                                    </Button>
                                </form>
                            ) : (
                                <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600">
                                    Comenzar Ahora
                                </Button>
                            )
                        }
                    </div>
                </motion.div>
            )}
        </nav>
    );
}