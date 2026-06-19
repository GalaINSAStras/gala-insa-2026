# 📖 Wiki — Gala INSA Strasbourg 2026

**Guide d'utilisation du CMS Sanity pour le site web du Gala.**

---

## 0. 🖥️ Lancer le projet (site web + Studio intégré)

### Terminal unique — Site web Next.js + Studio embarqué
```powershell
cd C:\Users\rudyv\Documents\GALA 2026\Website\gala-insa-2026
& fnm env --use-on-cd | Out-String | Invoke-Expression; fnm use 24
npm run dev
```

➡️ **Site web :** http://localhost:3000
➡️ **Studio CMS :** http://localhost:3000/studio

> Le Studio Sanity est embarqué directement dans Next.js sur la route `/studio`.
> Un seul terminal suffit — plus besoin de lancer deux serveurs séparés.

---

## 1. 🚀 Accéder au CMS Sanity

### 1.1 URL d'accès

- **En développement local :** `http://localhost:3000/studio`
- **En production :** `https://<URL-VERCEL>/studio`

### 1.2 Connexion

1. Rendez-vous sur l'URL ci-dessus
2. Cliquez sur **"Sign in"**
3. Connectez-vous avec votre compte **Google** ou **GitHub**
4. Si c'est votre première connexion, demandez au propriétaire du projet de vous ajouter comme **Contributor** sur [sanity.io/manage](https://www.sanity.io/manage) → Projet **gala-insa-2026** → onglet **Members**

### 1.3 Rôles

| Rôle | Permissions |
|------|------------|
| **Administrator** | Accès complet : créer, lire, modifier, supprimer, gérer les membres |
| **Editor** | Peut créer, modifier, publier et dépublier du contenu |
| **Viewer** | Lecture seule — ne peut pas modifier le contenu |

---

## 2. ✏️ Modifier le contenu

### 2.1 Événement (page d'accueil)

Le document **Événement** contrôle les informations principales affichées sur la page d'accueil (Hero section).

**Champs à remplir :**

| Champ | Type | Description |
|-------|------|-------------|
| Titre | Texte | "Gala INSA Strasbourg 2026" |
| Numéro d'édition | Nombre | 71 |
| Date de l'événement | Date/heure | 2026-11-21 |
| Lieu | Texte | "L'Illiade, Illkirch-Graffenstaden" |
| Adresse complète | Texte | Adresse postale complète |
| Description | Texte long | Présentation de l'événement |
| Affiche | Image | Image de fond pour la Hero section |
| Statut | Liste | "À venir" / "En cours" / "Terminé" |
| Lien de billetterie | URL | Lien externe vers la plateforme de vente |

### 2.2 Partenaires

Chaque partenaire est un document individuel.

**Champs à remplir :**

| Champ | Type | Description |
|-------|------|-------------|
| Nom | Texte | Nom de l'entreprise/organisation |
| Logo | Image | Logo du partenaire (PNG/SVG/WEBP) |
| Site web | URL | Lien vers le site du partenaire |
| Catégorie | Liste | **Or** / **Argent** / **Bronze** (influence le style d'affichage) |
| Ordre d'affichage | Nombre | Plus le chiffre est petit, plus tôt il apparaît |

**💡 Astuce :** Pour recadrer le logo, cliquez sur l'icône **recadrer** dans l'éditeur d'image. Utilisez le **hotspot** pour définir le point focal.

### 2.3 Billetterie

Les billets sont affichés sous forme de cartes sur la page d'accueil.

**Champs à remplir :**

| Champ | Type | Description |
|-------|------|-------------|
| Type de billet | Texte | Ex: "Étudiant", "Plein tarif", "VIP" |
| Prix | Nombre | Prix en euros (ex: 25) |
| Description | Texte long | Ce qui est inclus dans ce billet |
| Quantité disponible | Nombre | 0 = indisponible |
| Épuisé | Booléen | Cochez si stock épuisé |
| Ordre d'affichage | Nombre | Ordre d'apparition sur la page |
| Lien de vente externe | URL | Lien vers la plateforme de paiement |

### 2.4 FAQ

Les questions sont affichées sous forme d'accordéon sur la page d'accueil.

**Champs à remplir :**

| Champ | Type | Description |
|-------|------|-------------|
| Question | Texte | La question (ex: "Quelle est la date du Gala ?") |
| Réponse | Texte long | La réponse détaillée |
| Ordre d'affichage | Nombre | Ordre d'apparition |

### 2.5 Membres de l'équipe (optionnel)

| Champ | Type | Description |
|-------|------|-------------|
| Nom complet | Texte | Prénom et nom |
| Rôle | Texte | Fonction dans l'association |
| Photo | Image | Photo portrait |
| Biographie courte | Texte long | Description du rôle |

---

## 3. 🔄 Cycle de vie d'une modification

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Sanity     │ ──► │  Publish     │ ──► │  Sanity CDN  │
│  Studio     │     │  (bouton)    │     │  (cache)     │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                │
                                                ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Site web   │ ◄── │  Next.js     │ ◄── │  Fetch       │
│  visible    │     │  (build)     │     │  (GROQ)      │
└─────────────┘     └──────────────┘     └──────────────┘
```

### Étapes :

1. **Éditer** — Connectez-vous au Sanity Studio et modifiez le contenu
2. **Prévisualiser** — Vérifiez les modifications dans l'interface Sanity (mode Draft)
3. **Publier** — Cliquez sur le bouton **Publish** (vert)
4. **Propagation** — Les données sont propagées via le CDN Sanity (quelques secondes)
5. **Affichage** — La page web se met à jour automatiquement (ISR activé toutes les 60s)
6. **🔁 En développement** — Rechargez `http://localhost:3000` pour voir les changements

> ⚠️ **Important :** En production (Vercel), les pages statiques ne se mettent à jour qu'après un nouveau déploiement. Pour des mises à jour en temps réel, il faudra configurer un webhook Sanity → Vercel.

---

## 4. 🖼️ Images — Bonnes pratiques

### Formats acceptés
- JPEG, PNG, WebP, SVG, GIF
- Taille maximale : **10 Mo**

### Recommandations
| Usage | Dimensions recommandées | Format |
|-------|------------------------|--------|
| Logo partenaire | 400×200 px max | PNG (transparent) ou SVG |
| Affiche (poster) | 1920×1080 px | WebP ou JPEG |
| Photo d'équipe | 500×500 px (carré) | JPEG |

### Recadrage et hotspot
1. Cliquez sur l'image après l'avoir uploadée
2. Utilisez l'outil **Crop** pour recadrer
3. Déplacez le **Hotspot** (cercle bleu) pour définir le point focal
4. Le site web utilisera ce point focal pour centrer l'image sur tous les écrans

---

## 5. 🚢 Déploiement

### Automatique (CI/CD)
Un push sur la branche `main` de [GitHub](https://github.com/GalaINSAStras/gala-insa-2026) déclenche automatiquement :

1. **GitHub Actions** : Lint, TypeScript check, Build
2. **Vercel** : Déploiement automatique

### Manuel
1. Aller sur [vercel.com](https://vercel.com) (compte partagé de l'association)
2. Naviguer vers le projet **gala-insa-2026**
3. Cliquer sur **Deploy** → Deploy

---

## 6. 🛠️ Dépannage

### "Le site n'affiche pas mes modifications"
- Vérifiez que vous avez bien cliqué sur **Publish** (et non seulement Save)
- Attendez quelques secondes (cache CDN)
- En développement, redémarrez le serveur Next.js : `npm run dev`

### "Je ne vois pas le studio Sanity"
- Vérifiez que le projet Sanity est bien lié (Project ID : `tsuy1vy3`)
- Rendez-vous sur `http://localhost:3000/studio` (Studio embarqué dans l'app Next.js)

### "Erreur de connexion"
- Vérifiez votre compte Google/GitHub
- Contactez un administrateur du projet sur [sanity.io/manage](https://www.sanity.io/manage)

---

## 7. 📚 Rappels techniques

- **Framework :** Next.js 16 (App Router)
- **CMS :** Sanity v6 (embarqué via `next-sanity`)
- **Client :** `@sanity/image-url` pour les images, `next-sanity` pour les requêtes
- **Langage de requêtes :** **GROQ** (prononcer "grok")
- **Hébergement :** Vercel (Hobby)
- **Base de données :** PostgreSQL via Supabase
- **Analytics :** Umami (auto-hébergé)
- **UI :** shadcn/ui (Radix UI) + Tailwind CSS v4

---

> 📍 **Association du Gala INSA Strasbourg** — SIRET : 90144794600012
> Édition 2026 — Dernière mise à jour : Juin 2026