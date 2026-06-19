import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LEGAL } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getEventMetadata() {
  try {
    const event = await sanityFetch<{
      title: string;
      edition: number;
      date: string;
      location: string;
      description?: string;
    } | null>(
      `*[_type == "event" && status == "upcoming"][0]{ title, edition, date, location, description }`
    );
    return event;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const event = await getEventMetadata();

  const edition = event?.edition ?? 71;
  const date = event?.date
    ? new Date(event.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "21 novembre 2026";
  const location = event?.location ?? "L'Illiade, Illkirch-Graffenstaden";
  const title = event?.title ?? "Gala INSA Strasbourg";
  const description =
    event?.description ??
    `Site officiel du ${edition}e Gala de l'INSA Strasbourg. Rejoignez-nous le ${date} à ${location} pour une soirée exceptionnelle.`;

  return {
    title: {
      default: `${title} ${edition}e Édition — ${date}`,
      template: `%s | ${title} ${edition}e`,
    },
    description,
    openGraph: {
      title: `${title} ${edition}e Édition — ${date}`,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: `${title} ${edition}e Édition`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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