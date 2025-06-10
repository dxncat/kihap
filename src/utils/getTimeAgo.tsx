import { formatDate } from "./formatDate"

export const getTimeAgo = (dateString: Date) => {
    const now = new Date()
    const date = dateString
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace menos de 1 hora"
    if (diffInHours < 24) return `Hace ${diffInHours} horas`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays} días`

    return formatDate(dateString)
}