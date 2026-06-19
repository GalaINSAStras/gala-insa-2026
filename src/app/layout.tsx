import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EVENT, LEGAL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = `Gala INSA Strasbourg ${EVENT.edition}e Édition — ${EVENT.date}`;
const siteDescription = `Site officiel du ${EVENT.edition}e Gala de l'INSA Strasbourg. Rejoignez-nous le ${EVENT.date} à ${EVENT.location} pour une soirée exceptionnelle.`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | Gala INSA Strasbourg ${EVENT.edition}e`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "fr_FR",
    siteName: `Gala INSA Strasbourg ${EVENT.edition}e Édition`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Umami Analytics — (privacy-first, auto-hébergé) */}
        {umamiWebsiteId && umamiUrl && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiWebsiteId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}