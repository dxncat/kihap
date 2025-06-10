export const getBeltColor = (beltName: string) => {
    if (beltName.includes("Blanco"))
        return "bg-gray-100 text-gray-800"
    if (beltName.includes("Blanco con Punta Amarilla"))
        return "bg-gradient-to-r from-gray-100 to-yellow-300 text-yellow-800 border border-yellow-500/40"
    if (beltName.includes("Amarillo con Punta Verde"))
        return "bg-gradient-to-r from-yellow-300 to-green-400 text-green-900 border border-green-600/40"
    if (beltName.includes("Amarillo"))
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
    if (beltName.includes("Verde con Punta Azul"))
        return "bg-gradient-to-r from-green-400 to-blue-400 text-blue-900 border border-blue-600/40"
    if (beltName.includes("Verde"))
        return "bg-green-500/20 text-green-400 border border-green-500/30"
    if (beltName.includes("Azul con Punta Rojo"))
        return "bg-gradient-to-r from-blue-500 to-red-500 text-red-900 border border-red-500/40"
    if (beltName.includes("Azul"))
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
    if (beltName.includes("Rojo con Punta Negro"))
        return "bg-gradient-to-r from-red-600 to-black text-white border border-black/50"
    if (beltName.includes("Rojo"))
        return "bg-red-500 text-white"
    if (beltName.includes("Negro"))
        return "bg-black text-white"
    return "bg-gray-200 text-gray-800"
}
