import { createClient, type SanityClient } from "@sanity/client";
import { loadEnvFile } from "node:process";

// ============================================
// Mise à jour du contenu — Gala INSA 2026
// Usage : npx tsx scripts/update-content.ts
// ============================================

loadEnvFile(".env");
loadEnvFile(".env.local");

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId: "tsuy1vy3",
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

// ── Placeholder SVG (logos partenaires) ──────────────────────────
function svgPlaceholder(name: string): Buffer {
  const fontSize = name.length > 20 ? 18 : 24;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <rect width="400" height="200" rx="14" fill="#1f2937"/>
  <text x="200" y="105" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="600" fill="#f5f5f5" text-anchor="middle">${name}</text>
</svg>`;
  return Buffer.from(svg, "utf-8");
}

async function uploadLogo(client: SanityClient, name: string): Promise<string> {
  const asset = await client.assets.upload("image", svgPlaceholder(name), {
    filename: `logo-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`,
    contentType: "image/svg+xml",
  });
  return asset._id;
}

// ── Données ──────────────────────────────────────────────────────
const team = [
  { _id: "team-president", name: "Simon DUKIC", role: "Président", displayOrder: 1 },
  { _id: "team-vp-gialloreti", name: "Anaïs GIALLORETI", role: "Vice-Présidente", displayOrder: 2 },
  { _id: "team-vp-duret", name: "Eline DURET", role: "Vice-Présidente", displayOrder: 3 },
  { _id: "team-secretaire", name: "Adrien EDEL", role: "Secrétaire", displayOrder: 4 },
  { _id: "team-tresorier", name: "Samuel PERROT", role: "Trésorier", displayOrder: 5 },
  { _id: "team-vice-tresorier", name: "Rudy VIRQUIN", role: "Vice-Trésorier", displayOrder: 6 },
];

const partnerNames = [
  { _id: "partner-groupe-ote", name: "Groupe OTE", displayOrder: 1 },
  { _id: "partner-sew-usocome", name: "SEW Usocome", displayOrder: 2 },
  { _id: "partner-maf-assurances", name: "MAF assurances", displayOrder: 3 },
  { _id: "partner-arts-industries", name: "Arts et Industries", displayOrder: 4 },
  { _id: "partner-eiffage-energies", name: "Eiffage Energies Systèmes", displayOrder: 5 },
  { _id: "partner-electricite-strasbourg", name: "Electricité Strasbourg", displayOrder: 6 },
];

const tickets = [
  { _id: "ticket-soiree-etudiant", type: "Soirée seule — Étudiant & Diplômé", price: 25, description: "Réservation soirée seule (tarif étudiant & diplômé)", displayOrder: 1 },
  { _id: "ticket-soiree-exterieur", type: "Soirée seule — Extérieur", price: 30, description: "Réservation soirée seule (tarif extérieur)", displayOrder: 2 },
  { _id: "ticket-repas-etudiant", type: "Repas + Soirée — Étudiant & Diplômé", price: 50, description: "Réservation repas + soirée (tarif étudiant & diplômé)", displayOrder: 3 },
  { _id: "ticket-repas-exterieur", type: "Repas + Soirée — Extérieur", price: 55, description: "Réservation repas + soirée (tarif extérieur)", displayOrder: 4 },
  { _id: "ticket-soiree-jourj", type: "Soirée seule — Jour J", price: 35, description: "Réservation soirée seule (tarif le jour J)", displayOrder: 5 },
  { _id: "ticket-repas-jourj", type: "Repas + Soirée — Jour J", price: 60, description: "Réservation repas + soirée (tarif le jour J)", displayOrder: 6 },
];


async function main() {
  console.log("🚀 Mise à jour du contenu Sanity — Gala INSA 2026\n");

  // ── 1. Upload des logos partenaires (en parallèle) ──
  console.log("🖼️  Upload des logos partenaires...");
  const partners = await Promise.all(
    partnerNames.map(async (p) => {
      const assetId = await uploadLogo(client, p.name);
      console.log(`   ✓ ${p.name}`);
      return {
        _id: p._id,
        _type: "partner",
        name: p.name,
        category: "gold",
        displayOrder: p.displayOrder,
        logo: { _type: "image", asset: { _type: "reference", _ref: assetId } },
      };
    })
  );

  // ── 2. Récupération des documents existants ──
  const [existingTeam, existingPartners, existingTickets] = await Promise.all([
    client.fetch(`*[_type == "teamMember"]`),
    client.fetch(`*[_type == "partner"]`),
    client.fetch(`*[_type == "ticket"]`),
  ]);

  const newTeamIds = new Set(team.map((m) => m._id));
  const newPartnerIds = new Set(partners.map((p) => p._id));
  const newTicketIds = new Set(tickets.map((t) => t._id));

  const teamToDelete = existingTeam.filter((d: any) => !newTeamIds.has(d._id)).map((d: any) => d._id);
  const partnersToDelete = existingPartners.filter((d: any) => !newPartnerIds.has(d._id)).map((d: any) => d._id);
  const ticketsToDelete = existingTickets.filter((d: any) => !newTicketIds.has(d._id)).map((d: any) => d._id);

  // ── 3. Transaction atomique ──
  console.log("\n💾 Application des modifications...");
  const tx = client.transaction();
  for (const id of teamToDelete) tx.delete(id);
  for (const id of partnersToDelete) tx.delete(id);
  for (const id of ticketsToDelete) tx.delete(id);
  for (const m of team) tx.createOrReplace({ _type: "teamMember", ...m });
  for (const p of partners) tx.createOrReplace(p);
  for (const t of tickets) tx.createOrReplace({ _type: "ticket", ...t, soldOut: false });

  await tx.commit();
  console.log("   ✓ Transaction validée");

  console.log("\n📊 Récapitulatif :");
  console.log(`  - ${teamToDelete.length} membre(s) d'équipe supprimé(s), ${team.length} créé(s)`);
  console.log(`  - ${partnersToDelete.length} partenaire(s) supprimé(s), ${partners.length} créé(s)`);
  console.log(`  - ${ticketsToDelete.length} billet(s) supprimé(s), ${tickets.length} créé(s)`);

  // ── 4. Vérification ──
  console.log("\n🔍 Vérification de l'état final :");
  const [finalTeam, finalPartners, finalTickets] = await Promise.all([
    client.fetch(`*[_type == "teamMember"] | order(displayOrder asc)`),
    client.fetch(`*[_type == "partner"] | order(displayOrder asc)`),
    client.fetch(`*[_type == "ticket"] | order(displayOrder asc)`),
  ]);

  console.log("\n=== ÉQUIPE ===");
  for (const m of finalTeam) console.log(`  - ${m.role} : ${m.name}`);

  console.log("\n=== PARTENAIRES ===");
  for (const p of finalPartners) console.log(`  - ${p.name} (${p.category})`);

  console.log("\n=== BILLETTERIE ===");
  for (const t of finalTickets) console.log(`  - ${t.type} : ${t.price}€`);

  console.log("\n✅ Terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur lors de la mise à jour :", err);
  process.exit(1);
});

