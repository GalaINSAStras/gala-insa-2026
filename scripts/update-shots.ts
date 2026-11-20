import { createClient } from "@sanity/client";
import { loadEnvFile } from "node:process";

loadEnvFile(".env.local");

const client = createClient({
  projectId: "tsuy1vy3",
  dataset: "production",
  apiVersion: "2026-06-01",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("🚀 Mise à jour des shots — Gala INSA 2026\n");

  // Récupérer le document soiree existant
  const soiree = await client.fetch(`*[_type == "soiree"][0]`);

  if (!soiree) {
    console.error("❌ Document soiree non trouvé");
    process.exit(1);
  }

  console.log("📋 Carte actuelle - catégorie 'À la soirée' :");
  const categorieSoiree = soiree.carte?.find((cat: any) => cat.title === "À la soirée");
  if (categorieSoiree) {
    categorieSoiree.items?.forEach((item: any) => {
      console.log(`    - ${item.name} (${item.format ?? "—"}) — ${item.price}€`);
    });
  }

  // Construire la nouvelle carte en remplaçant les deux shots
  const nouvelleCarte = soiree.carte?.map((cat: any) => {
    if (cat.title !== "À la soirée") {
      return cat;
    }

    // Filtrer pour supprimer les deux shots existants
    const itemsSansShots = (cat.items ?? []).filter((item: any) => {
      const nameLower = item.name.toLowerCase();
      return !nameLower.includes("shot");
    });

    // Ajouter le nouveau shot écarlate
    const nouveauShot = {
      _key: `shot-ecarlate-${Date.now()}`,
      _type: "carteItem",
      name: "Shot écarlate",
      format: "Liqueur de framboise & Porto rouge",
      price: 4,
    };

    return {
      ...cat,
      items: [...itemsSansShots, nouveauShot],
    };
  });

  // Mettre à jour le document
  await client
    .patch(soiree._id)
    .set({ carte: nouvelleCarte })
    .commit();

  console.log("\n✅ Shot écarlate ajouté, anciens shots supprimés");

  // Vérification
  const updated = await client.fetch(`*[_type == "soiree"][0]{carte}`);
  console.log("\n📋 Nouvelle carte - catégorie 'À la soirée' :");
  const updatedCategorie = updated.carte?.find((cat: any) => cat.title === "À la soirée");
  if (updatedCategorie) {
    updatedCategorie.items?.forEach((item: any) => {
      console.log(`    - ${item.name} (${item.format ?? "—"}) — ${item.price}€`);
    });
  }

  console.log("\n✅ Terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});