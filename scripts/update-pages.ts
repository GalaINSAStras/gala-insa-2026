import { createClient } from "@sanity/client";
import { loadEnvFile } from "node:process";

// ============================================
// Mise à jour — Infos Pratiques / Soirée / Line-Up
// Usage : npx tsx scripts/update-pages.ts
// ============================================

loadEnvFile(".env");
loadEnvFile(".env.local");

const client = createClient({
  projectId: "tsuy1vy3",
  dataset: "production",
  apiVersion: "2026-06-01",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("🚀 Mise à jour des pages (Infos Pratiques / Soirée / Line-Up)\n");

  // ── Infos Pratiques ──
  const infos = await client.fetch(`*[_type == "infosPratiques"][0]`);
  if (infos) {
    await client
      .patch(infos._id)
      .set({
        closingTime: "04h00",
        accessibilite:
          "L'Illiade est accessible aux personnes à mobilité réduite. Contactez-nous pour toute demande spécifique.",
      })
      .unset(["tarifs"])
      .commit();
    console.log("✓ Infos Pratiques : fermeture 04h00, accessibilité mise à jour, zone Tarifs supprimée");
  }

  // ── Soirée ──
  const soiree = await client.fetch(`*[_type == "soiree"][0]`);
  if (soiree) {
    await client
      .patch(soiree._id)
      .set({
        soireeSeuleDetails:
          "Accès à la soirée à partir de 21h00. Danse, animations, open-bar soft drinks.",
        themeDescription:
          "Plongez dans une atmosphère féérique où l'élégance rencontre la magie. La 72e édition du Gala de l'INSA Strasbourg vous invite à vivre une nuit inoubliable sous le signe du prestige et de la féérie.",
      })
      .commit();
    console.log("✓ Soirée : accès soirée seule à 21h00, édition corrigée (72e)");
  }

  // ── Line-Up (dernier set : fermeture à 04h00) ──
  const lineup = await client.fetch(`*[_type == "lineup"] | order(displayOrder asc)`);
  if (lineup.length) {
    const last = lineup[lineup.length - 1];
    await client.patch(last._id).set({ stageTime: "01h30 — 04h00" }).commit();
    console.log(`✓ Line-Up : "${last.artistName}" -> 01h30 — 04h00`);
  }

  // ── Hero (correction édition) ──
  const hero = await client.fetch(`*[_type == "hero"][0]`);
  if (hero) {
    await client
      .patch(hero._id)
      .set({
        taglines: [
          "Une soirée d'exception vous attend",
          "72e édition — Le rendez-vous incontournable",
          "Billets disponibles dès maintenant",
        ],
      })
      .commit();
    console.log("✓ Hero : édition corrigée (72e)");
  }

  // ── Vérification ──
  console.log("\n🔍 Vérification :");
  const [i, s, l] = await Promise.all([
    client.fetch(`*[_type == "infosPratiques"][0]{openingTime, closingTime, tarifs, accessibilite}`),
    client.fetch(`*[_type == "soiree"][0]{soireeSeuleDetails, themeDescription}`),
    client.fetch(`*[_type == "lineup"] | order(displayOrder asc)`),
  ]);
  console.log("\nInfos Pratiques :");
  console.log(`  ouverture=${i.openingTime} fermeture=${i.closingTime} tarifs=${JSON.stringify(i.tarifs)}`);
  console.log(`  accessibilite=${i.accessibilite}`);
  console.log("\nSoirée :");
  console.log(`  soirée seule : ${s.soireeSeuleDetails}`);
  console.log("\nLine-Up :");
  for (const a of l) console.log(`  - ${a.artistName} (${a.stageTime})`);

  console.log("\n✅ Terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
