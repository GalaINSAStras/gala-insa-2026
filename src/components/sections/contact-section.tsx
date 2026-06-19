"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { success: false };

export function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <div className="mx-auto max-w-2xl">
      {state.success ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-semibold text-green-800">
            Message envoyé avec succès ! 🎉
          </p>
          <p className="mt-2 text-sm text-green-600">
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      ) : (
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

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
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
              className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={state.fields?.email ?? ""}
              placeholder="votre@email.fr"
              className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              defaultValue={state.fields?.message ?? ""}
              placeholder="Votre message..."
              className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gala-primary focus:outline-none focus:ring-2 focus:ring-gala-primary/20 resize-y"
            />
          </div>

          {state.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-gala-primary text-white hover:bg-gala-primary-dark"
          >
            {pending ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      )}
    </div>
  );
}