import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { sanityFetch } from "@/lib/sanity/client";
import { SiteShellClient } from "./site-shell-client";
import "./globals.css";

/* ─── Body Font : Inter (lisibilité maximale) ─── */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* ─── Display Font : Cormorant Garamond (alternative libre à Renaissance) ─── */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
      className={`${inter.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Script anti-extension (bis_skin_checked) — s'exécute avant l'hydration */}
        <Script id="sanitize-bis" strategy="beforeInteractive">
          {`
            (function(){
              var E=Element.prototype,sa=E.setAttribute;
              E.setAttribute=function(n,v){if(n==='bis_skin_checked'){return}return sa.call(this,n,v)};
              var san=E.setAttributeNS;
              san&&(E.setAttributeNS=function(ns,n,v){if(n==='bis_skin_checked'){return}return san.call(this,ns,n,v)});
              var an=E.setAttributeNode;
              an&&(E.setAttributeNode=function(a){if(a&&a.name==='bis_skin_checked'){return null}return an.call(this,a)});
              var an2=E.setAttributeNodeNS;
              an2&&(E.setAttributeNodeNS=function(a){if(a&&a.name==='bis_skin_checked'){return null}return an2.call(this,a)});
              var mo=new MutationObserver(function(m){
                for(var i=0;i<m.length;i++){
                  var t=m[i];
                  if(t.type==='attributes'&&t.attributeName==='bis_skin_checked'){
                    t.target.removeAttribute('bis_skin_checked')
                  }else if(t.type==='childList'){
                    for(var j=0;j<t.addedNodes.length;j++){
                      var n=t.addedNodes[j];
                      if(n.nodeType===1&&n.hasAttribute('bis_skin_checked')){
                        n.removeAttribute('bis_skin_checked')
                      }
                    }
                  }
                }
              });
              mo.observe(document.documentElement,{attributes:true,attributeFilter:['bis_skin_checked'],childList:true,subtree:true});
              [].forEach.call(document.querySelectorAll('[bis_skin_checked]'),function(e){e.removeAttribute('bis_skin_checked')});
            })()
          `}
        </Script>

        <SiteShellClient>{children}</SiteShellClient>

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
