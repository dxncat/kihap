"use client";

import { News } from "@/interfaces/types";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Bell, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { getTimeAgo } from "@/utils";

interface Props {
    news: News[];
}

export function NewsList({ news }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
        >
            {news.length === 0 ? (
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardContent className="p-8 text-center">
                        <Bell className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <h3 className="text-white text-xl font-semibold mb-2">No hay noticias disponibles</h3>
                        <p className="text-white/70">
                            No se encontraron noticias que coincidan con tu búsqueda. Intenta con otros términos.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-white font-semibold text-xl">{item.title}</h3>
                                            {new Date(item.createdAt) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) && (
                                                <Badge className="bg-red-500 text-white">Nuevo</Badge>
                                            )}
                                        </div>
                                        <p className="text-white/80 text-base leading-relaxed mt-4">{item.content}</p>
                                    </div>
                                    <div className="flex items-center text-white/60 text-sm">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{getTimeAgo(item.createdAt)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))
            )}
        </motion.div>
    )
}