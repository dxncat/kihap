import type { Metadata } from "next";
import "./globals.css";
import { bodyFont } from "@/config/fonts";
import { Footer, Provider, ThemeProvider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s - Kihap',
    default: 'Home - Kihap'
  },
  description: "Gestiona tu academia de taekwondo con nuestra plataforma especializada",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${bodyFont.className} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            {children}
            <Footer />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
