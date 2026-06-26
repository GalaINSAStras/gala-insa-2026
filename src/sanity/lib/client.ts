import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};

export const client = createClient({
  ...sanityClientConfig,
  stega: {
    studioUrl: "/studio",
  },
});
