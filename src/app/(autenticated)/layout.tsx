import { Nav } from "@/components";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Nav />
            <br />
            <br />
            {children}
        </>
    );
}
