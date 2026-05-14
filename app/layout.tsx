import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perros Rescatados - Un Final Feliz",
  description: "Adopta a un perro rescatado y dale el hogar que merece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${geist.className} min-h-full`}>{children}</body>
    </html>
  );
}
