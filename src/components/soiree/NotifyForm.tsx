"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BellRing, CheckCircle } from "lucide-react";
import { subscribeProgramme, type NotifyState } from "@/app/actions/programme";

const initialState: NotifyState = { success: false };

/**
 * Champ de notification par e-mail — affiché lorsque la
 * programmation n'est pas encore dévoilée.
 */
export function NotifyForm() {
  const [state, formAction, pending] = useActionState(
    subscribeProgramme,
    initialState
  );

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <AnimatePresence mode="wait">
        {state.success ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 text-sm text-[var(--sauge-texte)]"
          >
            <CheckCircle className="h-4 w-4" aria-hidden />
            Merci ! Nous vous préviendrons dès l&rsquo;ouverture.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="notify-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="notify-email"
              name="email"
              type="email"
              required
              placeholder="votre@email.fr"
              className="h-11 flex-1 rounded-full border border-[var(--or-moyen)]/40 bg-white/70 px-4 text-sm text-marine placeholder:text-ardoise/50 focus:border-[var(--or-fonce)] focus:outline-none focus:ring-2 focus:ring-[var(--or-moyen)]/40"
            />
            {/* Honeypot — invisible aux humains */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-marine px-5 text-sm font-semibold text-[#F5F0E4] transition-colors hover:bg-[var(--marine-fonce)] disabled:opacity-60"
            >
              <BellRing className="h-4 w-4" aria-hidden />
              {pending ? "Envoi…" : "Me prévenir"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {state.error && (
        <p role="alert" className="mt-2 text-center text-sm text-destructive">
          {state.error}
        </p>
      )}
    </div>
  );
}
