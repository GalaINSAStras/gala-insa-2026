"use server";

import { z } from "zod";
import { Resend } from "resend";

/**
 * Action serveur — Alerte de programmation
 * Collecte une adresse e-mail pour prévenir l'utilisateur
 * lorsque la programmation de la soirée sera dévoilée.
 */

const notifySchema = z.object({
  email: z.string().email("Adresse email invalide"),
  honeypot: z.string().max(0, "Bot détecté").optional(),
});

export type NotifyState = {
  success: boolean;
  error?: string;
};

// Rate limiting simple (par email)
const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const lastAttempt = rateLimiter.get(key);

  if (!lastAttempt || now - lastAttempt > RATE_LIMIT_WINDOW) {
    rateLimiter.set(key, now);
    return true;
  }

  const attempts = Array.from(rateLimiter.entries()).filter(
    ([, time]) => now - time < RATE_LIMIT_WINDOW
  ).length;

  return attempts < RATE_LIMIT_MAX;
}

export async function subscribeProgramme(
  _prevState: NotifyState,
  formData: FormData
): Promise<NotifyState> {
  const email = (formData.get("email") as string) ?? "";
  const honeypot = (formData.get("website") as string) ?? "";

  if (!checkRateLimit(email)) {
    return {
      success: false,
      error: "Trop de tentatives. Veuillez réessayer dans une minute.",
    };
  }

  const result = notifySchema.safeParse({ email, honeypot });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Adresse email invalide",
    };
  }

  // Honeypot rempli → on « réussit » silencieusement sans rien envoyer
  if (result.data.honeypot) {
    return { success: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[INFRASTRUCTURE ERROR]: Resend API Key is not configured. " +
        "Set RESEND_API_KEY in environment variables."
    );
    return {
      success: false,
      error: "Le service d'envoi est temporairement indisponible.",
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Gala INSA <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "gala.insastras@gmail.com"],
      subject: "[Gala INSA 2026] Nouvelle demande d'alerte programmation",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#FFFDF8;">
          <div style="padding:32px;">
            <h1 style="font-size:20px;color:#2C3E5C;">🎭 Gala INSA Strasbourg</h1>
            <p style="font-size:15px;color:#3F5B76;">
              Une personne souhaite être prévenue dès que la programmation sera dévoilée :
            </p>
            <p style="font-size:15px;">
              <a href="mailto:${result.data.email}" style="color:#A8863F;">${result.data.email}</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Erreur lors de l'envoi. Veuillez réessayer plus tard.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Programme notify action error:", err);
    return {
      success: false,
      error: "Erreur serveur. Veuillez réessayer plus tard.",
    };
  }
}
