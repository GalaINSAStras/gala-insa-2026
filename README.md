# 🎭 Gala INSA Strasbourg 2026 — 71e Édition

**Site web officiel** du Gala de l'INSA Strasbourg, édition 2026 — Le 21 novembre 2026 à L'Illiade (Illkirch-Graffenstaden).

---

## 🏗️ Stack Technique

| Technologie | Usage |
|------------|-------|
| **Next.js 16** (App Router) | Framework React full-stack |
| **TypeScript** (strict) | Typage statique |
| **Tailwind CSS v4** | Styling utility-first |
| **shadcn/ui** (Radix UI) | Composants UI accessibles |
| **Sanity v3** | CMS headless (contenu dynamique) |
| **Supabase** (Free Tier) | Base de données PostgreSQL + Auth |
| **Umami** | Analytics privacy-first |
| **Vercel** (Hobby) | Hébergement & CI/CD |
| **Resend** | Envoi d'emails (formulaire contact) |

---

## 📁 Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout racine (SEO, fonts, analytics)
│   ├── page.tsx            # Page d'accueil
│   ├── globals.css         # Styles globaux + thème Gala
│   ├── (legal)/            # Pages légales (mentions, confidentialité)
│   ├── api/contact/        # Server Action formulaire contact
│   └── studio/             # Sanity Studio (optionnel)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Footer, MobileMenu
│   ├── sections/           # Sections de la page d'accueil
│   └── shared/             # Composants réutilisables
├── lib/
│   ├── sanity/             # Client Sanity + queries GROQ
│   ├── supabase/           # Client Supabase
│   ├── umami/              # Tracking Umami
│   ├── resend/             # Email Resend
│   ├── constants.ts        # Constantes globales
│   └── utils.ts            # Utilitaires (shadcn/ui)
├── hooks/                  # Custom hooks React
sanity/
├── schemas/                # Schémas Sanity (partner, event, etc.)
└── sanity.config.ts        # Configuration studio
```

---

## 🚀 Installation & Développement

```bash
# 1. Cloner le dépôt
git clone https://github.com/gala-insa-strasbourg/gala-insa-2026.git
cd gala-insa-2026

# 2. Installer les dépendances
npm install

# 3. Copier et configurer les variables d'environnement
cp .env.example .env.local
# ⚠️ Remplir les valeurs dans .env.local

# 4. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

---

## 🔐 Variables d'Environnement Requises

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# Resend (Email)
RESEND_API_KEY=
CONTACT_EMAIL=contact@gala-insa-strasbourg.fr
```

---

## 📜 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |
| `npm run type-check` | Vérification TypeScript |

---

## 🧑‍⚖️ Mentions Légales

**Association du Gala INSA Strasbourg**  
SIRET : 90144794600012  
Siège social : INSA Strasbourg, 24 Boulevard de la Victoire, 67000 Strasbourg  
Email : contact@gala-insa-strasbourg.fr

---

## 📄 Licence

Projet interne — Association du Gala INSA Strasbourg.