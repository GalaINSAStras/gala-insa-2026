import Image from "next/image";
import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-marine px-6 py-16 text-center text-white">
      <Image
        src="/logo/signature-logo.png"
        alt="Logo Gala 2026"
        width={220}
        height={220}
        priority
      />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Le Gala revient
        </h1>
        <p className="max-w-md text-lg text-neutral-400">
          Édition 2026 — informations et billetterie très bientôt.
        </p>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
        <a
          href="https://www.instagram.com/gala_insa_strasbourg/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <InstagramIcon className="h-5 w-5" />
          Instagram
        </a>
        <a
          href="https://www.facebook.com/GalaINSA2026"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <FacebookIcon className="h-5 w-5" />
          Facebook
        </a>
        <a
          href="mailto:gala@insa-strasbourg.fr"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <Mail className="h-5 w-5" />
          Contact
        </a>
      </nav>
    </div>
  );
}