# Intégration Sanity Studio — Gala INSA 2026

Ce document décrit l'intégration complète de **Sanity Studio** dans le projet Next.js du Gala INSA 2026.

---

## Sommaire

1. [Architecture générale](#1-architecture-générale)
2. [Variables d'environnement](#2-variables-denvironnement)
3. [Configuration Sanity Studio](#3-configuration-sanity-studio)
4. [Route Studio (Next.js App Router)](#4-route-studio-nextjs-app-router)
5. [Schémas de contenu](#5-schémas-de-contenu)
6. [Client de données côté frontend](#6-client-de-données-côté-frontend)
7. [Requêtes GROQ](#7-requêtes-groq)
8. [Types TypeScript](#8-types-typescript)
9. [Scripts disponibles](#9-scripts-disponibles)
10. [Dépendances](#10-dépendances)

---

## 1. Architecture générale

```
gala-insa-2026/
├── sanity.config.ts          # Configuration du Studio
├── sanity.cli.ts             # Configuration CLI Sanity
├── .env                      # Variables d'environnement (projet)
├── .env.local                # Variables locales (non versionnées)
├── .env.example              # Exemple de variables d'environnement
├── schemas/                  # Schémas de contenu Sanity
│   ├── index.ts              # Agrégateur de tous les schémas
│   ├── event.ts              # Événement principal
│   ├── partner.ts            # Partenaires
│   ├── ticket.ts             # Billetterie
│   ├── faq.ts                # FAQ
│   ├── team-member.ts        # Membres de l'équipe
│   ├── hero.ts               # Hero de la page d'accueil
│   ├── soiree.ts             # La Soirée (thème, menu, dress code)
│   ├── lineup.ts             # Line-up artistique
│   └── infosPratiques.ts     # Infos pratiques
├── src/
│   ├── app/
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx  # Page du Studio embarqué
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts     # Client Sanity (couche d'abstraction)
│   │       ├── queries.ts    # Fonctions de requêtes GROQ
│   │       └── types.ts      # Types TypeScript dérivés des schémas
│   └── sanity/
│       └── lib/
│           ├── client.ts     # Client next-sanity (Stega)
│           └── env.ts        # Assertion des variables d'environnement
```

---

## 2. Variables d'environnement

Le projet utilise **trois variables d'environnement**, toutes préfixées par `NEXT_PUBLIC_` car elles sont nécessaires côté client.

| Variable | Exemple | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abcdefgh` | ID du projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Nom du dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-06-01` | Version de l'API (optionnelle, date par défaut) |

### Fichiers `.env`

- **`.env`** — Variables partagées versionnées (projectId, dataset)
- **`.env.local`** — Surcharges locales (non versionné)
- **`.env.example`** — Modèle pour les nouveaux contributeurs

### Assertion (`src/sanity/lib/env.ts`)

```ts
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-01";
```

Les variables sont **assertées** au moment de l'import : si une variable est manquante, le build échoue immédiatement avec un message clair.

---

## 3. Configuration Sanity Studio

### `sanity.config.ts`

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataset, projectId } from "./src/sanity/lib/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

**Points clés :**
- Le `basePath: "/studio"` définit la route **Next.js** sous laquelle le Studio sera monté.
- Le fichier de configuration reste un module partagé, sans directive `'use client'`.
- Deux plugins sont activés :
  - **`structureTool()`** — Le gestionnaire de contenu par défaut (liste de documents, éditeur).
  - **`visionTool()`** — Le "GROQ Explorer" pour tester des requêtes en direct (accessible via `/studio/vision`).

### `sanity.cli.ts`

```ts
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) { throw new Error("..."); }
if (!dataset) { throw new Error("..."); }

export default defineCliConfig({
  api: { projectId, dataset },
});
```

Ce fichier est utilisé par la CLI Sanity (`npx sanity`) pour les commandes de déploiement, de migration, etc.

---

## 4. Route Studio (Next.js App Router)

### `src/app/studio/[[...tool]]/page.tsx`

```tsx
import { StudioClient } from "./components/studio-client";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioClient />;
}
```

Le rendu du Studio est isolé dans un Client Component :

```tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export function StudioClient() {
  return <NextStudio config={config} />;
}
```

**Fonctionnement :**
- Le dossier `[[...tool]]` utilise une **catch-all route optionnelle**. Cela permet à Sanity de gérer ses propres sous-routes (documents, paramètres, vision, etc.) sans avoir à les déclarer dans Next.js.
- Le composant `NextStudio` de `next-sanity` intègre le Sanity Studio dans Next.js en gérant le rendu, le routage interne et l'isolation des styles CSS. Il est chargé depuis `studio-client.tsx`, qui porte la directive `"use client"`.
- Les métadonnées (`metadata`, `viewport`) sont exportées depuis `next-sanity/studio` pour fournir les balises `<meta>` et `<meta viewport>` appropriées.

**Accès :** Le Studio est accessible à l'URL `/studio` sur le site déployé (ex : `https://gala-insa-2026.vercel.app/studio`).

---

## 5. Schémas de contenu

Tous les schémas sont définis avec les helpers `defineType` et `defineField` de Sanity pour une meilleure inférence TypeScript.

### Agrégateur (`schemas/index.ts`)

```ts
export const schemaTypes = [
  event, partner, ticket, faq, teamMember,
  hero, soiree, lineup, infosPratiques,
];
```

### Liste complète des schémas

| Schéma | Type | Description | Champs principaux |
|---|---|---|---|
| **event** | `document` | Édition courante du Gala | title, edition, date, location, poster, status, ticketLink |
| **partner** | `document` | Partenaires (catégories Or/Argent/Premium) | name, logo, websiteUrl, category, displayOrder |
| **ticket** | `document` | Types de billets disponibles | type, price, quantityAvailable, soldOut, displayOrder |
| **faq** | `document` | Questions fréquentes | question, reponse, displayOrder |
| **teamMember** | `document` | Membres de l'association organisatrice | name, role, photo, bio, displayOrder |
| **hero** | `document` (singleton) | Section héro de la page d'accueil | title, teaserVideo, posterFallback, loadingLogo, taglines, ctaLabel, ctaLink |
| **soiree** | `document` (singleton) | Thème, dress code et menu buffet | theme, dressCode, menuBuffet[], buffetPrice, soireeSeulePrice |
| **lineup** | `document` | Artistes et DJ programmés | artistName, stageTime, genre, image, displayOrder |
| **infosPratiques** | `document` (singleton) | Infos pratiques (horaires, plan, accès, VSS) | openingTime, closingTime, planPDF, mapLat/mapLng, stopVSS |

### Particularités notables

- **Menu Buffer (`soiree.ts`)** : Utilise un champ `array` d'objets imbriqués avec un champ `allergenes` de type `array` avec une `list` prédéfinie des 14 allergènes réglementaires.
- **Hotpot** : Les images utilisent `options: { hotspot: true }` pour permettre le recadrage interactif dans le Studio.
- **Ordre d'affichage** : Les schémas `partner`, `ticket`, `faq`, `teamMember`, `lineup` incluent un champ `displayOrder` avec un `ordering` associé pour le tri.
- **Singletons** : Les schémas `hero`, `soiree`, `infosPratiques` sont conçus comme des singletons (un seul document) — le contrôle se fait par la logique applicative (requête `[0]`), pas encore par une structure personnalisée.

---

## 6. Client de données côté frontend

Le projet expose **deux clients** Sanity, chacun adapté à un usage différent.

### Client « Stega » — `src/sanity/lib/client.ts`

```ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  ...sanityClientConfig,
  stega: {
    studioUrl: "/studio",
  },
});
```

Utilisé par le client **Stega** pour le **Visual Editing** (Content Source Maps). Le champ `stega.studioUrl` permet au mode "éditeur visuel" de pointer vers le Studio intégré. Ce client est prévu pour être utilisé avec `SanityLive` de `next-sanity`.

### Client « général » — `src/lib/sanity/client.ts`

```ts
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClientConfig } from "@/sanity/lib/client";

export const client = createClient({
  ...sanityClientConfig,
});

const builder = createImageUrlBuilder(client);

export type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function sanityFetch<T>(query: string): Promise<T> {
  return client.fetch<T>(query);
}

export const clientFetch = sanityFetch;
```

**Ce client est la couche d'abstraction principale du projet.**
Il réexporte :
- `sanityFetch<T>()` — Exécute une requête GROQ typée.
- `urlFor()` — Génère des URLs d'images Sanity optimisées (chaînage : `.width(400).height(300).url()`).
- `clientFetch` — Alias pour les composants `"use client"`.

---

## 7. Requêtes GROQ

Toutes les requêtes sont centralisées dans `src/lib/sanity/queries.ts`.

```ts
import { sanityFetch } from "./client";
import type { Partner, Event, Ticket, FAQ, TeamMember, Hero, Soiree, LineupItem, InfosPratiques } from "./types";

export async function getEvent(): Promise<Event | null> {
  return sanityFetch<Event | null>(`*[_type == "event" && status == "upcoming"][0]`);
}

export async function getPartners(): Promise<Partner[]> {
  return sanityFetch<Partner[]>(`*[_type == "partner"] | order(displayOrder asc)`);
}

export async function getTickets(): Promise<Ticket[]> {
  return sanityFetch<Ticket[]>(`*[_type == "ticket"] | order(displayOrder asc)`);
}

export async function getFaq(): Promise<FAQ[]> {
  return sanityFetch<FAQ[]>(`*[_type == "faq"] | order(displayOrder asc)`);
}

export async function getTeam(): Promise<TeamMember[]> {
  return sanityFetch<TeamMember[]>(`*[_type == "teamMember"] | order(displayOrder asc)`);
}

export async function getHero(): Promise<Hero | null> {
  return sanityFetch<Hero | null>(`*[_type == "hero"][0]`);
}

export async function getSoiree(): Promise<Soiree | null> {
  return sanityFetch<Soiree | null>(`*[_type == "soiree"][0]`);
}

export async function getLineup(): Promise<LineupItem[]> {
  return sanityFetch<LineupItem[]>(`*[_type == "lineup"] | order(displayOrder asc)`);
}

export async function getInfosPratiques(): Promise<InfosPratiques | null> {
  return sanityFetch<InfosPratiques | null>(`*[_type == "infosPratiques"][0]`);
}
```

**Conventions :**
- Les singletons (`hero`, `soiree`, `infosPratiques`) sont récupérés avec `[0]` pour obtenir un seul document (ou `null`).
- Les collections ordonnées utilisent `| order(displayOrder asc)`.
- Chaque fonction est **typée explicitement** et peut être appelée directement depuis les Server Components Next.js.

---

## 8. Types TypeScript

Les types se trouvent dans `src/lib/sanity/types.ts`. Ils sont maintenus **manuellement** et reflètent exactement la structure des schémas Sanity.

Chaque type exporte :
- `_id: string` — Identifiant unique du document
- `_type: string` — Le type de document Sanity
- `_createdAt / _updatedAt: string` — Métadonnées temporelles
- Les champs métier typés, avec `?:` pour les champs optionnels

Exemple :

```ts
export interface Partner {
  _id: string;
  _type: "partner";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  logo: SanityImageSource;
  websiteUrl?: string;
  description?: string;
  category: "premium" | "gold" | "silver";
  displayOrder: number;
}
```

Les types d'images utilisent `SanityImageSource` défini dans `client.ts` qui supporte les références d'asset avec crop et hotspot.

---

## 9. Scripts disponibles

Définis dans `package.json` :

| Script | Commande | Description |
|---|---|---|
| `dev` | `next dev` | Lance le serveur de développement Next.js |
| `build` | `next build` | Compile le projet Next.js |
| `cms` | `sanity dev` | Lance le Sanity Studio en mode développement (standalone) |
| `cms:build` | `npx sanity build` | Compile le Sanity Studio pour déploiement standalone |

**Remarque :** En développement local, le Studio est accessible via Next.js à l'URL `http://localhost:3000/studio`. Il n'est pas nécessaire d'utiliser `npm run cms` (mode standalone) sauf pour tester le Studio indépendamment de Next.js.

---

## 10. Dépendances

### Dépendances principales

| Paquet | Version | Rôle |
|---|---|---|
| `sanity` | `^6.1.0` | Noyau Sanity Studio |
| `next-sanity` | `^13.1.1` | Intégration Sanity ↔ Next.js (client, Studio, Visual Editing) |
| `@sanity/client` | `^6.1.0` | Client HTTP GROQ |
| `@sanity/image-url` | `^2.1.1` | Constructeur d'URL d'images optimisées |
| `@sanity/vision` | `^6.1.0` | Plugin GROQ Explorer pour le Studio |
| `groq` | `^6.1.0` | Utilitaire de template pour les requêtes GROQ (non utilisé directement) |

---

## Flux de données (Data Flow)

```
Sanity Content Lake
       │
       │ (GROQ query via `client.fetch`)
       ▼
src/lib/sanity/client.ts  (sanityFetch, urlFor)
       │
       │ (Server Component Next.js)
       ▼
src/lib/sanity/queries.ts  (getEvent, getPartners, etc.)
       │
       │ (appel dans les pages React Server Components)
       ▼
Composants React (pages, sections)
       │
       │ (Visual Editing — Content Source Maps)
       ▼
Sanity Studio (/studio)
```

---

## Notes importantes

1. **Le Studio est embarqué** dans Next.js via `next-sanity/studio` — pas de déploiement séparé de Sanity Studio nécessaire.
2. **Les singletons ne sont pas encore protégés** par une structure personnalisée (`S.structure()`). Pour l'instant, le code applicatif s'assure de ne récupérer qu'un seul document avec `[0]`.
3. **Le client Stega** (`src/sanity/lib/client.ts`) est prêt pour le Visual Editing mais n'est pas encore branché à `SanityLive` dans les composants — c'est le client de `src/lib/sanity/client.ts` qui est utilisé actuellement.
4. **Les types TypeScript** sont maintenus manuellement — ils doivent être mis à jour si les schémas changent (pas de génération automatique pour l'instant).
5. **La version API** par défaut est `2026-06-01` — elle doit être mise à jour si le projet utilise des fonctionnalités plus récentes de Sanity.
