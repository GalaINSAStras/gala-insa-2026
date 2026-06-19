import { createClient, type SanityClient } from "@sanity/client";

// ============================================
// Script de peuplement initial — Sanity CMS
// Gala INSA Strasbourg 2026
// Usage : npx tsx scripts/populate-sanity.ts
// ============================================

const client = createClient({
  projectId: "tsuy1vy3",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ────────────────────────────────────────────
// Placeholder SVG generator (colored logos)
// ────────────────────────────────────────────
function svgPlaceholder(name: string, bgColor: string): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
    <rect fill="${bgColor}" width="400" height="200" rx="12"/>
    <text x="200" y="110" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${name}</text>
  </svg>`;
  return Buffer.from(svg, "utf-8");
}

async function uploadLogo(
  client: SanityClient,
  label: string,
  bgColor: string
): Promise<string> {
  const svgBuffer = svgPlaceholder(label, bgColor);
  const asset = await client.assets.upload(
    "image",
    svgBuffer,
    {
      filename: `placeholder-${label.toLowerCase().replace(/\s+/g, "-")}.svg`,
      contentType: "image/svg+xml",
    }
  );
  return asset._id;
}

// ────────────────────────────────────────────
// Main
// ────────────────────────────────────────────
async function main() {
  console.log("🚀 Peuplement Sanity — Gala INSA 2026\n");

  // ── 1. Événement ──────────────────────────
  console.log("📅 Création de l'événement...");
  await client.createIfNotExists({
    _id: "event-2026",
    _type: "event",
    title: "Gala INSA Strasbourg 2026",
    edition: 71,
    date: "2026-11-21T19:00:00.000Z",
    location: "L'Illiade, Illkirch-Graffenstaden",
    address: "L'Illiade, 1 Rue de l'Illiade, 67400 Illkirch-Graffenstaden",
    description:
      "Le Gala de l'INSA Strasbourg est une soirée exceptionnelle organisée par les étudiants de l'école. Au programme : dîner gastronomique, spectacle vivant, musique et danse jusqu'au bout de la nuit. Venez célébrer la 71e édition dans le cadre prestigieux de L'Illiade !",
    status: "upcoming",
  });

  // ── 2. Partenaires ────────────────────────
  console.log("🏢 Création des partenaires...");
  const goldLogo = await uploadLogo(client, "Partenaire OR", "#c9a84c");
  const silverLogo = await uploadLogo(client, "Partenaire ARGENT", "#b0b0b0");
  const bronzeLogo = await uploadLogo(client, "Partenaire BRONZE", "#a67c52");

  const partners = [
    {
      _id: "partner-edf",
      name: "EDF",
      websiteUrl: "https://www.edf.fr",
      category: "gold" as const,
      displayOrder: 1,
      logoAssetId: goldLogo,
    },
    {
      _id: "partner-sncf",
      name: "SNCF",
      websiteUrl: "https://www.sncf.com",
      category: "gold" as const,
      displayOrder: 2,
      logoAssetId: goldLogo,
    },
    {
      _id: "partner-orange",
      name: "Orange",
      websiteUrl: "https://www.orange.fr",
      category: "silver" as const,
      displayOrder: 3,
      logoAssetId: silverLogo,
    },
    {
      _id: "partner-cm",
      name: "Crédit Mutuel",
      websiteUrl: "https://www.creditmutuel.fr",
      category: "silver" as const,
      displayOrder: 4,
      logoAssetId: silverLogo,
    },
    {
      _id: "partner-kronenbourg",
      name: "Brasseries Kronenbourg",
      websiteUrl: "https://www.kronenbourg.com",
      category: "bronze" as const,
      displayOrder: 5,
      logoAssetId: bronzeLogo,
    },
    {
      _id: "partner-bk",
      name: "Burger King",
      websiteUrl: "https://www.burgerking.fr",
      category: "bronze" as const,
      displayOrder: 6,
      logoAssetId: bronzeLogo,
    },
  ];

  for (const p of partners) {
    await client.createIfNotExists({
      _id: p._id,
      _type: "partner",
      name: p.name,
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: p.logoAssetId },
      },
      websiteUrl: p.websiteUrl,
      category: p.category,
      displayOrder: p.displayOrder,
    });
  }

  // ── 3. Tickets ────────────────────────────
  console.log("🎟️ Création des billets...");
  const tickets = [
    {
      _id: "ticket-etudiant",
      type: "Étudiant",
      price: 25,
      description: "Accès à la soirée, buffet dînatoire et une boisson incluse. Sur présentation d'un justificatif étudiant.",
      quantityAvailable: 200,
      soldOut: false,
      displayOrder: 1,
      externalLink: "https://www.billetweb.fr/gala-insa-2026",
    },
    {
      _id: "ticket-plein",
      type: "Plein tarif",
      price: 45,
      description: "Accès à la soirée, buffet dînatoire et une boisson incluse.",
      quantityAvailable: 150,
      soldOut: false,
      displayOrder: 2,
      externalLink: "https://www.billetweb.fr/gala-insa-2026",
    },
    {
      _id: "ticket-vip",
      type: "VIP",
      price: 70,
      description: "Accès prioritaire, buffet dînatoire, open bar et place réservée au premier rang pour le spectacle.",
      quantityAvailable: 50,
      soldOut: false,
      displayOrder: 3,
      externalLink: "https://www.billetweb.fr/gala-insa-2026",
    },
  ];

  for (const t of tickets) {
    const { _id, ...ticketData } = t;
    await client.createIfNotExists({
      _id,
      _type: "ticket",
      ...ticketData,
    });
  }

  // ── 4. FAQ ────────────────────────────────
  console.log("❓ Création des FAQ...");
  const faqs = [
    {
      _id: "faq-1",
      question: "Quelle est la date du Gala 2026 ?",
      answer: "Le Gala de l'INSA Strasbourg 2026 se déroulera le samedi 21 novembre 2026 à L'Illiade, Illkirch-Graffenstaden. L'ouverture des portes est prévue à 19h00.",
      displayOrder: 1,
    },
    {
      _id: "faq-2",
      question: "Y a-t-il un code vestimentaire ?",
      answer: "Le Gala est une soirée chic. Nous recommandons une tenue de cocktail ou de soirée (costume, robe de soirée). L'entrée pourra être refusée aux personnes en tenue décontractée (jeans, baskets).",
      displayOrder: 2,
    },
    {
      _id: "faq-3",
      question: "Comment venir à L'Illiade ?",
      answer: "L'Illiade est située au 1 Rue de l'Illiade, 67400 Illkirch-Graffenstaden. Un parking gratuit est disponible sur place. En tram : ligne A ou E, arrêt « Baggersee » puis 10 minutes à pied. Des navettes seront également organisées depuis le campus INSA.",
      displayOrder: 3,
    },
    {
      _id: "faq-4",
      question: "Y a-t-il un âge minimum pour participer ?",
      answer: "L'accès au Gala est autorisé à partir de 18 ans. Une pièce d'identité pourra être demandée à l'entrée.",
      displayOrder: 4,
    },
    {
      _id: "faq-5",
      question: "Puis-je être remboursé si je ne peux plus venir ?",
      answer: "Les billets ne sont pas remboursables, sauf annulation de l'événement. Vous pouvez néanmoins revendre votre billet à un tiers en nous contactant à l'adresse contact@gala-insa-strasbourg.fr pour modifier le nom sur le billet.",
      displayOrder: 5,
    },
  ];

  for (const f of faqs) {
    const { _id, ...faqData } = f;
    await client.createIfNotExists({
      _id,
      _type: "faq",
      ...faqData,
    });
  }

  // ── 5. Membres de l'équipe ───────────────
  console.log("👥 Création des membres de l'équipe...");
  const team = [
    {
      _id: "team-president",
      name: "Lucas Martin",
      role: "Président",
      bio: "Étudiant en 5e année Génie Civil, Lucas coordonne l'ensemble de l'organisation du Gala depuis plus d'un an.",
      displayOrder: 1,
    },
    {
      _id: "team-vp",
      name: "Camille Dubois",
      role: "Vice-Présidente",
      bio: "Étudiante en 4e année Architecture, Camille supervise les relations avec les prestataires et la logistique de la soirée.",
      displayOrder: 2,
    },
    {
      _id: "team-tresorier",
      name: "Thomas Petit",
      role: "Trésorier",
      bio: "Étudiant en 3e année Génie Mécanique, Thomas gère le budget, la recherche de sponsors et la billetterie.",
      displayOrder: 3,
    },
    {
      _id: "team-communication",
      name: "Emma Bernard",
      role: "Chargée de Communication",
      bio: "Étudiante en 4e année Informatique, Emma s'occupe de la communication digitale, des réseaux sociaux et du design du site web.",
      displayOrder: 4,
    },
  ];

  for (const m of team) {
    const { _id, ...memberData } = m;
    await client.createIfNotExists({
      _id,
      _type: "teamMember",
      ...memberData,
    });
  }

  console.log("\n✅ Peuplement terminé avec succès !");
  console.log("📊 Récapitulatif :");
  console.log("  - 1 événement");
  console.log(`  - ${partners.length} partenaires`);
  console.log(`  - ${tickets.length} types de billets`);
  console.log(`  - ${faqs.length} questions FAQ`);
  console.log(`  - ${team.length} membres d'équipe`);
  console.log("\n➡️  Rafraîchissez http://localhost:3000 pour voir les données !");
}

main().catch((err) => {
  console.error("❌ Erreur lors du peuplement :", err);
  process.exit(1);
});