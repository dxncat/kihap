export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
            <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">Cargando inicio de sesión...</p>
            </div>
        </div>
    )
}
