import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-neutral-950 px-6 py-16 text-center text-white">
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

      <nav className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400">
        <a
          href="https://instagram.com/COMPTE_A_REMPLACER"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          Instagram
        </a>
        <a
          href="mailto:EMAIL_A_REMPLACER"
          className="transition-colors hover:text-white"
        >
          Contact
        </a>
      </nav>
    </div>
  );
}