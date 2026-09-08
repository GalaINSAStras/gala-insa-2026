// ============================================
// Upload des CGV vers Sanity — Gala INSA 2026
// Usage : node scripts/upload-cgv.mjs
// ============================================
// Uploade le PDF des CGV (Administratif/CGV Gala 2026.pdf) comme asset
// « file » Sanity, avec pour originalFilename « CGV Gala 2026.pdf ».
// Le route handler /documents/[filename] le sert ensuite sous ce nom.
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tsuy1vy3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

/** Nom de fichier d'origine (tel qu'il sera servi par /documents/<nom>). */
const FILENAME = "CGV Gala 2026.pdf";

async function main() {
  // scripts/ → gala-insa-2026 → Website → GALA 2026 → Administratif
  const filePath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "Administratif",
    FILENAME
  );

  const buffer = await readFile(filePath);
  console.log(`📄 Lecture : ${filePath} (${(buffer.length / 1024).toFixed(1)} Ko)\n`);

  const asset = await client.assets.upload("file", buffer, {
    filename: FILENAME,
    contentType: "application/pdf",
  });

  console.log("✅ Uploadé :");
  console.log("   _id              :", asset._id);
  console.log("   originalFilename :", asset.originalFilename);
  console.log("   mimeType         :", asset.mimeType);
  console.log("   url              :", asset.url);
  console.log("\n→ Sera servi sur : /documents/CGV%20Gala%202026.pdf");
}

main().catch((err) => {
  console.error("❌ Erreur lors de l'upload :", err);
  process.exit(1);
});
