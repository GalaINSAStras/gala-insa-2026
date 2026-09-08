import Link from "next/link";
import { LEGAL, SOCIAL, APP_URLS } from "@/lib/constants";

/** Icône Instagram SVG */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** Icône LinkedIn SVG */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Icône Facebook SVG */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gala-primary text-white">
      <div className="container mx-auto px-5 py-10 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-20 lg:gap-32">
          {/* Colonne 1 : Logo & description */}
          <div className="space-y-3 text-center md:text-right">
            <h3 className="font-garamond text-lg font-bold italic">
              Gala INSA Strasbourg
            </h3>
            <p className="text-sm text-white/70">
              72<sup>e</sup> &Eacute;dition &mdash; 21 Novembre 2026
            </p>
            <p className="text-sm text-white/60">
              L{'\''}Illiade, Illkirch-Graffenstaden
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div className="space-y-3 text-center md:text-center">
            <h4 className="font-titre text-sm md:text-lg font-semibold uppercase tracking-wider text-gala-gold">
              Accès rapide
            </h4>
            <nav className="grid grid-cols-2 gap-2 md:flex md:flex-col">
              <Link
                href="/#about"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                À propos
              </Link>
              <Link
                href="/#partners"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Partenaires
              </Link>
              <Link
                href="/billetterie"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Billetterie
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Colonne 3 : Réseaux sociaux & mentions légales */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="font-titre text-sm md:text-lg font-semibold uppercase tracking-wider text-gala-gold">
              Suivez-nous
            </h4>
            <div className="flex gap-6 justify-center md:justify-start">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gala-gold hover:text-gala-gold-light transition-colors"
                aria-label="Instagram du Gala INSA Strasbourg"
              >
                <InstagramIcon className="h-7 w-7" />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gala-gold hover:text-gala-gold-light transition-colors"
                aria-label="LinkedIn du Gala INSA Strasbourg"
              >
                <LinkedinIcon className="h-7 w-7" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gala-gold hover:text-gala-gold-light transition-colors"
                aria-label="Facebook du Gala INSA Strasbourg"
              >
                <FacebookIcon className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Barre inférieure : séparateur doré à bords fondus + mentions légales obligatoires */}
        <div className="mt-8 text-xs text-white/40">
          <div className="h-px w-full bg-gala-gold [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]" />
          <div className="pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center">
              <div className="text-center md:text-left">
                <p>
                  {LEGAL.associationName} — SIRET : {LEGAL.siret}
                </p>
                <p className="mt-1">
                  © {currentYear} Association du Gala INSA Strasbourg. Tous droits
                  réservés.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 md:items-end">
                <Link
                  href={APP_URLS.mentionsLegales}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
                <Link
                  href={APP_URLS.politiqueConfidentialite}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}