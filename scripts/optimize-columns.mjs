// Optimise des SVG d'origine (exports Inkscape) pour la prod :
// - supprime les métadonnées Inkscape (namedview, comments, inkscape:/sodipodi:*)
// - supprime les id (aucune référence url(#)/use/xlink) et class redondantes
//   (le fill est porté par style="fill:…" inline sur chaque forme)
// - retire width/height du <svg> racine (le viewBox définit le ratio)
// - minifie l'espacement
//
// Usage : node scripts/optimize-columns.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCES = [
  "public/colonne_gauche.svg",
  "public/colonne_droite.svg",
  "public/motif_floral.svg",
  "public/fleurs_gauche.svg",
  "public/fleurs_droite.svg",
];

function optimize(svg) {
  // ids référencés par url(#…) (ex: dégradés) — à préserver
  const referenced = new Set(
    [...svg.matchAll(/url\(\s*['"]?#([^)'"\s]+)['"]?\s*\)/g)].map((m) => m[1])
  );

  return svg
    .replace(/<\?xml[^>]*\?>/g, "") // déclaration XML
    .replace(/<!--[\s\S]*?-->/g, "") // commentaires
    .replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/g, "") // panneau Inkscape
    .replace(/<metadata[\s\S]*?<\/metadata>/g, "") // métadonnées (sécurité)
    .replace(/\s+(?:inkscape|sodipodi):[A-Za-z0-9_.-]+="[^"]*"/g, "") // attributs éditeurs
    .replace(/\s+xmlns:(?:inkscape|sodipodi|dc|cc|rdf)="[^"]*"/g, "") // namespaces éditeurs
    .replace(/\s+id="([^"]*)"/g, (m, id) => (referenced.has(id) ? m : "")) // ids (conserve les référencés)
    .replace(/\s+class="[^"]*"/g, ""); // classes redondantes
}

function stripRootDimensions(svg) {
  return svg.replace(/<svg\b([^>]*)>/, (_m, attrs) => {
    const cleaned = attrs
      .replace(/\s+width="[^"]*"/, "")
      .replace(/\s+height="[^"]*"/, "");
    return `<svg${cleaned}>`;
  });
}

function minify(svg) {
  return svg
    .replace(/\r?\n\s*/g, " ") // joint les lignes (conserve les espaces simples des path data)
    .replace(/\s{2,}/g, " ") // effondre les espaces multiples
    .trim();
}

for (const rel of SOURCES) {
  const src = join(root, rel);
  const out = join(root, "public", "ornaments", rel.split("/").pop());
  const raw = readFileSync(src, "utf8");

  let svg = optimize(raw);
  svg = stripRootDimensions(svg);
  svg = minify(svg);

  writeFileSync(out, `${svg}\n`, "utf8");

  const hasViewBox = /viewBox="[^"]+"/.test(svg);
  const rootHasDims = /<svg\b[^>]*\s(?:width|height)=/.test(svg);
  console.log(
    `${rel.split("/").pop()} : ${(raw.length / 1024).toFixed(1)} KB -> ${(svg.length / 1024).toFixed(1)} KB | viewBox=${hasViewBox} rootDims=${rootHasDims}`
  );
}
