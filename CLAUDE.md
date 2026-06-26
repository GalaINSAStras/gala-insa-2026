@AGENTS.md

# 🎭 Gala INSA Strasbourg 2026 — Règles du Projet

## Architecture
- Next.js 16 App Router + Sanity v6 embarqué (`/studio`)
- Tailwind CSS v4 + shadcn/ui + base-ui/react
- Animations : `motion` (framer-motion)
- CMS headless : Sanity (tous les textes et médias)

## Routes
| Page | Route | ISR |
|------|-------|-----|
| Accueil | `/` | 60s |
| Billetterie | `/billetterie` | 60s |
| La Soirée | `/la-soiree` | 60s |
| Infos Pratiques | `/infos-pratiques` | 60s |
| Partenaires | `/partenaires` | 60s |
| Mentions légales | `/mentions-legales` | Static |

## Principes clés
1. **ZERO texte hardcodé** — tout le contenu vient de Sanity (sauf navigation, métadonnées)
2. **Priorité bleu `#043768`** — utiliser `text-gala-primary`, `bg-gala-primary`
3. **Motion.dev** pour toutes les animations client
4. **Transition clip-wipe** entre les pages via `app/template.tsx`
5. **Build check** obligatoire après chaque modification majeure
6. **Live test** via MCP Browser après chaque nouveau composant

## Workflow auto-évaluation
1. Créer/modifier les fichiers
2. Lancer `npm run build` — corriger les erreurs TS
3. Vérifier avec `npx next build` la liste des routes
4. Mettre à jour `TODO.md`
5. Tester le rendu dans le navigateur

## Schémas Sanity (9 types)
- `event`, `partner`, `ticket`, `faq`, `teamMember`
- `hero`, `soiree`, `lineup`, `infosPratiques`

Voir `TODO.md` pour le suivi détaillé des étapes.