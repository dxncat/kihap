import Link from "next/link";
import Image from "next/image";
import { titleFont } from "@/config/fonts";

export function Footer() {
    return (
        <footer className="bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
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
                        <p className="text-white/70 mb-4">La plataforma líder para academias de taekwondo en todo el mundo.</p>
                        <p className="text-white/70 mb-4">
                            Cl 52 N° 13 65
                            <br />
                            Regional Distrito Capital, Bogota D.C.
                            <br />
                            Colombia
                            <br />
                            <br />
                            <a href="mailto:contact@kihap.com">contact@kihap.com</a>
                        </p>
                        <div className="flex space-x-4">{/* Social media icons would go here */}</div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Producto</h3>
                        <ul className="space-y-2 text-white/70">
                            <li>
                                <Link href="/#features" className="hover:text-white transition-colors">
                                    Características
                                </Link>
                            </li>
                            <li>
                                <Link href="/calendar" className="hover:text-white transition-colors">
                                    Calendario
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-white transition-colors">
                                    Perfiles
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2 text-white/70">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-white/60">
                    <p>&copy; {new Date().getFullYear()} KIHAP. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}