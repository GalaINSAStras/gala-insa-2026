// ============================================
// Mise à jour des logos partenaires — Gala INSA 2026
// Usage : node scripts/update-partner-logos.mjs
// ============================================
// Upload les logos réels (public/logo/*.webp) vers Sanity et les associe
// aux documents "partner" correspondants, en mettant aussi à jour le `name`.
// Le patch du client v6 écrit directement le document publié.
// ============================================

import { createClient } from "@sanity/client";
import { loadEnvFile } from "node:process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadEnvFile(".env");
loadEnvFile(".env.local");

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ Aucun token Sanity trouvé (SANITY_API_WRITE_TOKEN / SANITY_API_TOKEN).");
  process.exit(1);
}

const client = createClient({
  projectId: "tsuy1vy3",
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

/**
 * Correspondance logo local → document partenaire.
 * Pour chaque entrée, on uploade le fichier puis on référence l'asset
 * dans le champ `logo` du partenaire.
 */
const LOGO_MAP = [
  { partnerId: "partner-groupe-ote", name: "Groupe OTE", file: "public/logo/Groupe_OTE_logo_large.webp" },
  { partnerId: "partner-sew-usocome", name: "SEW Usocome", file: "public/logo/SEW_logo_large.webp" },
  { partnerId: "partner-maf-assurances", name: "MAF assurances", file: "public/logo/MAF_assurances_logo_large.webp" },
  { partnerId: "partner-arts-industries", name: "Arts et Industries", file: "public/logo/A&I_logo_large.webp" },
  { partnerId: "partner-eiffage-energies", name: "Eiffage Construction", file: "public/logo/Eiffage_Constructions_logo_large.webp" },
  { partnerId: "partner-electricite-strasbourg", name: "Electricité Strasbourg", file: "public/logo/ES_logo.webp" },
];

async function main() {
  console.log("🖼️  Upload des logos partenaires réels...\n");

  for (const item of LOGO_MAP) {
    const filePath = path.resolve(__dirname, "..", item.file);
    const buffer = await readFile(filePath);

    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(item.file),
      contentType: "image/webp",
    });
    console.log(`   ✓ Uploadé  ${item.file}  →  ${asset._id}`);

    await client
      .patch(item.partnerId)
      .set({
        name: item.name,
        logo: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();
    console.log(`   ✓ Document mis à jour pour « ${item.name} » (${item.partnerId})\n`);
  }

  console.log("✅ Terminé — logos et noms des partenaires mis à jour (publiés).");
}

main().catch((err) => {
  console.error("❌ Erreur lors de la mise à jour :", err);
  process.exit(1);
});
