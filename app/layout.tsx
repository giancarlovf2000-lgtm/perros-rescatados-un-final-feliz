import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const SITE_URL = "https://unfinalfeliz.com";

export const metadata: Metadata = {
  title: {
    default: "Perros Rescatados — Un Final Feliz",
    template: "%s | Un Final Feliz",
  },
  description: "Adopta a un perro rescatado y dale el hogar que merece. Conoce a todos nuestros perritos disponibles y envía tu solicitud de adopción.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Perros Rescatados — Un Final Feliz",
    description: "Adopta a un perro rescatado y dale el hogar que merece.",
    url: SITE_URL,
    siteName: "Un Final Feliz",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perros Rescatados — Un Final Feliz",
    description: "Adopta a un perro rescatado y dale el hogar que merece.",
  },
  themeColor: "#F97316",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geist.className} min-h-full`}>{children}</body>
    </html>
  );
}
