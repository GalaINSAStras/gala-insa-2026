import { defineCliConfig } from "sanity/cli";

// Priorité : SANITY_STUDIO_* (Vite/Sanity CLI) > NEXT_PUBLIC_* (Next.js)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
  || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET
  || process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID" +
    " — check your .env / .env.local file"
  );
}
if (!dataset) {
  throw new Error(
    "Missing SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET" +
    " — check your .env / .env.local file"
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
