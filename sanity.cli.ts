import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — check your .env / .env.local file"
  );
}
if (!dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_DATASET — check your .env / .env.local file"
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});