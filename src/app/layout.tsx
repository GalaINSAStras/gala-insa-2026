import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display, EB_Garamond } from "next/font/google";
import Script from "next/script";
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

/* ─── Titre / boutons : Playfair Display (serif, accents marqués) ─── */
const titre = Playfair_Display({
  variable: "--font-titre",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/* ─── Sous-titres & prix : EB Garamond (papeterie haut de gamme) ─── */
const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gala-insa.com"),
  title: "Gala INSA 2026",
  description:
    "Le Gala revient — Édition 2026 à L'Illiade. Réservez votre place.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Gala INSA 2026",
    description: "Le Gala revient — Édition 2026 à L'Illiade.",
    url: "https://www.gala-insa.com",
    siteName: "Gala INSA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gala INSA 2026",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gala INSA 2026",
    description: "Le Gala revient — Édition 2026 à L'Illiade.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gala INSA",
  url: "https://www.gala-insa.com",
  logo: "https://www.gala-insa.com/logo/signature-logo.png",
  sameAs: [
    "https://www.facebook.com/GalaINSA2026",
    "https://www.instagram.com/gala_insa_strasbourg/",
    "https://www.linkedin.com/company/gala-insa-strasbourg-2024/home/",
  ],
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
      className={`${inter.variable} ${cormorantGaramond.variable} ${titre.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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

        {children}

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