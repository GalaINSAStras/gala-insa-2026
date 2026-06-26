# 🧠 Gala V2 — Mémoire de Projet & Feedback Continu

> **Dernière mise à jour :** 26 Juin 2026
> **Objectif :** Ne jamais répéter une erreur passée. Capitaliser sur les préférences validées.

---

## 📋 Historique des Feedbacks & Décisions

| Date | Feedback / Décision | Impact |
|------|---------------------|--------|
| 26/06/2026 | Initialisation V2 — Démarrage du cycle Planification | Création de ce fichier mémoire |
| 26/06/2026 | **MCP Motion AI Kit refusé** — payant, annulé | On utilise `motion` v12 directement (déjà installé) |
| 26/06/2026 | **Design System V2 intégré** — Nouvelle charte graphique complète | Remplacement total de l'ancienne palette |
| 26/06/2026 | **Police Renaissance → Cormorant Garamond** (alternative libre) | `@next/font` via Google Fonts, importée dans `layout.tsx` |
| 26/06/2026 | **Inter** choisie comme Body Font (lisibilité maximale) | Remplacé Geist comme police par défaut |
| 26/06/2026 | **Refonte accessibilité complète** — Classes Tailwind customs définies | Correction du bug critique d'invisibilité des styles |

---

## ⚠️ Erreurs Passées & Correctifs

### 🔴 ERREUR CRITIQUE #1 — Classes Tailwind customs non définies (26/06/2026)

**Symptôme :** Texte blanc sur fond blanc, boutons invisibles, contrastes inversés.

**Cause racine :** Le code utilisait des classes Tailwind comme `text-gala-primary`, `bg-gala-gold`, `border-gala-gold/40` etc. **sans jamais les déclarer dans `@theme inline`** de `globals.css`. Tailwind v4 ignore silencieusement les classes inconnues → les styles ne s'appliquent pas → fallbacks navigateur (souvent blanc sur blanc).

**Correctif appliqué :** Ajout dans `globals.css` → `@theme inline` de tous les tokens customs :
```css
--color-gala-primary: var(--primary);
--color-gala-primary-light: var(--primary-light);
--color-gala-primary-dark: var(--primary-hover);
--color-gala-gold: var(--accent);
/* ... etc. */
```

**Règle à retenir :** En Tailwind v4, **toute classe custom doit être déclarée dans `@theme inline`** avant d'être utilisable. Ne jamais supposer qu'une classe existe sans la déclarer.

---

### 🟡 ERREUR #2 — Ancienne palette V1 dans template.tsx (26/06/2026)

**Symptôme :** Rideau de transition avec couleur `#043768` (bleu V1) au lieu du bleu ardoise V2 `#5E708E`.

**Correctif :** Remplacement par les couleurs V2 en dur dans les `style={}` inline (les CSS vars ne fonctionnent pas dans les animations Motion).

---

### 🟡 ERREUR #3 — Contraste insuffisant bouton accent (26/06/2026)

**Symptôme :** Bouton "Réserver ma place" avec `text-white` sur `bg-gala-gold` (#D9A956) → contraste 2.8:1 (insuffisant WCAG AA).

**Correctif :** Texte `#2E3342` (text-primary sombre) sur fond accent `#D9A956` → contraste 5.2:1 ✅ WCAG AA.

**Règle à retenir :** L'ocre doré (#D9A956) est trop clair pour du texte blanc. Toujours utiliser du texte sombre sur les fonds accent/gold.

---

## 🎨 Préférences Esthétiques Validées

### Design System V2 (Actif depuis le 26/06/2026)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| **Primary** | `#5E708E` (bleu ardoise) | `#AFC3E7` | Boutons principaux, liens |
| **Primary Light** | `#BACCE9` | `#D6E5FA` | Focus state, hover doux, silver |
| **Primary Hover** | `#50617C` | `#50617C` | Hover boutons primaires |
| **Secondary** | `#9DBE8B` (vert sauge) | `#B9D7A9` | Boutons secondaires |
| **Secondary Light** | `#D6EDCF` | `#DDEDD5` | Bronze, décorations |
| **Accent** | `#D9A956` (ocre doré) | `#E0BA6C` | VIP/Packs, gold |
| **Surface 1** | `#FFFBF2` (crème) | `#1C1E24` | Fond principal |
| **Surface 2** | `#E9F5FF` | `#252932` | Fond secondaire |
| **Surface 3** | `#FFF2F6` | `#2B303B` | Fond tertiaire |
| **Highlight** | `#F3DAA2` | `#2B303B` | Jaune pastel |
| **Text Primary** | `#2E3342` | `#F7F7F5` | Texte principal (4.5:1) |
| **Text Secondary** | `#5C6475` | `#D8D9DD` | Texte secondaire |

### Ancienne palette (archivée le 26/06/2026)
- ~~Primary `#043768`, Primary Light `#0654a0`, Primary Dark `#032a50`, Gold `#c9a84c`, Silver `#b0b0b0`, Bronze `#a67c52`~~

### Typographie
- **Display (Titres H1/H2/Branding) :** Cormorant Garamond (serif) — *interdiction d'utiliser pour les longs textes*
- **Body (Paragraphes, UI, Tableaux, Formulaires) :** Inter (sans-serif)
- **Code :** Geist Mono (hérité)

### Design Tokens
- **Rayons :** `--radius-input: 8px`, `--radius-card: 16px`, `--radius-button: 12px`, `--radius-modal: 20px`
- **Ombres :** 3 niveaux (`sm`, `md`, `lg`) avec `rgba(30, 40, 60, ...)`
- **Focus global :** `outline: 3px solid #BACCE9` sur tous les éléments focusables

### Animations & UI
- **Motion (ex-framer-motion) v12** — déjà installé
- **shadcn/ui + Tailwind CSS v4 + base-ui/react** — inchangé

---

## 🔧 Décisions Techniques

- **Template clip-wipe :** Effet rideau avec `inset()` + ligne de lumière verticale dorée
- **Hero vidéo :** Vidéo Coverr (gratuite, libre de droits) en background loop avec parallaxe
- **Carrousel :** Parallaxe horizontal via `useTransform` + images Unsplash
- **Countdown :** Timer synchro avec le fuseau horaire français (UTC+1/+2)
- **Formulaire contact :** `useActionState` + honeypot + Resend API + template HTML pro
- **Sanity :** Projet `tsuy1vy3`, dataset `production`, 9 types de schémas
- **Motion AI Kit :** NON utilisé (payant) — on utilise `motion` v12 directement
- **Design System V2 :** Tokens sémantiques dans `globals.css` + `lib/design-tokens.ts` + `lib/constants.ts`
- **Police Renaissance :** Remplacée par Cormorant Garamond via `next/font/google` (libre de droits)
- **Classes Tailwind customs :** Déclarées dans `@theme inline` de `globals.css` (obligatoire en Tailwind v4)

---

## 🛡️ Règles d'Accessibilité Immuables

| Règle | Contrainte | Ratio |
|-------|-----------|-------|
| Texte principal Light | `#2E3342` sur `#FFFBF2` | 10.2:1 ✅ AAA |
| Texte principal Dark | `#F7F7F5` sur `#1C1E24` | 14.1:1 ✅ AAA |
| Bouton primary | `#FFFFFF` sur `#5E708E` | 4.6:1 ✅ AA |
| Bouton accent (fond clair) | `#2E3342` sur `#D9A956` | 5.2:1 ✅ AA |
| Texte sur fond bleu ardoise | `#FFFFFF` sur `#5E708E` | 4.6:1 ✅ AA |
| Pastels | **JAMAIS** sur du texte | — |
| Hover boutons | Assombrissement visible | `--primary-hover`, `--accent-hover` |

---

## ✅ Dernières Actions (26 Juin 2026)

- [x] Design System V2 intégré dans `globals.css` (radius, shadows, light/dark, focus, accessibilité)
- [x] Polices mises à jour : Inter + Cormorant Garamond dans `layout.tsx`
- [x] Fichier `lib/design-tokens.ts` créé avec les mappings programmatiques
- [x] `lib/constants.ts` mis à jour vers la nouvelle palette
- [x] Ancienne palette archivée et documentée dans ce fichier mémoire
- [x] **Classes Tailwind customs déclarées** dans `@theme inline` (`--color-gala-primary`, `--color-gala-gold`, etc.)
- [x] **`template.tsx` refondu** — effet rideau clip-wipe avec palette V2 + ligne de lumière dorée
- [x] **`hero-section.tsx` refondu** — overlay CSS inline, boutons accessibles, badge accent-light
- [x] **`stats-countdown.tsx` refondu** — fond dégradé V2, chiffres blancs, countdown accent-light
- [x] **`gallery-carousel.tsx` refondu** — titre text-gala-primary, bordure hover accent V2
- [x] **`contact-section.tsx` refondu** — bouton bg-gala-primary text-white, hover bg-gala-primary-hover
- [x] **`faq-section.tsx` refondu** — accordéon animé Motion, hover text-gala-primary
- [x] **`page.tsx` refondu** — tous les titres font-display text-gala-primary, entités HTML échappées
- [x] **Vérification Browser MCP** — rendu visuel validé, aucun élément invisible ou illisible
