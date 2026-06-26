"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const initialState: ContactState = { success: false };

/**
 * Formulaire de contact — Design System V2
 *
 * Accessibilité :
 * - Labels : text-foreground (#2E3342 light / #F7F7F5 dark) ✅
 * - Inputs : bg-background, text-foreground, border-input ✅
 * - Bouton submit : bg-primary (#5E708E), text-white (#FFFFFF) — contraste 4.6:1 ✅
 * - Hover bouton : bg-primary-hover (#50617C) — assombrissement visible ✅
 * - Focus : ring-primary/20 ✅
 */
export function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {state.success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-2xl border p-8 text-center shadow-sm"
            style={{
              borderColor: "#9DBE8B",
              background:
                "linear-gradient(135deg, rgba(157,190,139,0.08) 0%, rgba(157,190,139,0.04) 100%)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {/* Icône vert sauge — secondaire V2 */}
              <CheckCircle
                className="mx-auto h-12 w-12"
                style={{ color: "#9DBE8B" }}
              />
            </motion.div>
            {/*
             * Texte succès : text-foreground (#2E3342) sur fond crème ✅
             */}
            <p className="mt-4 text-lg font-semibold text-foreground">
              Message envoyé avec succès ! 🎉
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form action={formAction} className="space-y-5">
              {/* Honeypot — invisible aux humains */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Champ Nom */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground transition-colors group-focus-within:text-gala-primary"
                >
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={state.fields?.name ?? ""}
                  placeholder="Votre nom"
                  className="mt-1 block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20 focus:shadow-sm"
                />
              </div>

              {/* Champ Email — obligatoire */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground transition-colors group-focus-within:text-gala-primary"
                >
                  Email{" "}
                  <span className="text-destructive" aria-label="obligatoire">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={state.fields?.email ?? ""}
                  placeholder="votre@email.fr"
                  className="mt-1 block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20 focus:shadow-sm"
                />
              </div>

              {/* Champ Message — obligatoire */}
              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground transition-colors group-focus-within:text-gala-primary"
                >
                  Message{" "}
                  <span className="text-destructive" aria-label="obligatoire">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  defaultValue={state.fields?.message ?? ""}
                  placeholder="Votre message..."
                  className="mt-1 block w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20 focus:shadow-sm"
                />
              </div>

              {/* Message d'erreur */}
              <AnimatePresence>
                {state.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm shadow-sm"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    {/*
                     * Texte erreur : text-destructive (#D9534F) sur fond clair ✅
                     */}
                    <span className="text-destructive">{state.error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/*
               * Bouton submit — bg-primary (#5E708E), text-white (#FFFFFF)
               * Contraste WCAG AA : #FFFFFF sur #5E708E = 4.6:1 ✅
               * Hover : bg-primary-hover (#50617C) — assombrissement visible ✅
               */}
              <Button
                type="submit"
                disabled={pending}
                className="group relative w-full overflow-hidden rounded-xl bg-gala-primary text-white shadow-md transition-all duration-300 hover:bg-gala-primary-hover hover:shadow-lg disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {pending ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Envoi en cours...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Envoyer le message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
