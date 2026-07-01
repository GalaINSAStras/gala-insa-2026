import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataset, projectId } from "./src/sanity/lib/env";

const plugins = process.env.NODE_ENV === "production"
  ? [structureTool()]
  : [structureTool(), visionTool()];

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins,
  schema: { types: schemaTypes },
});
