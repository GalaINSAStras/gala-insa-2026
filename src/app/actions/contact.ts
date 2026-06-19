"use server";

import { z } from "zod";
import { Resend } from "resend";
import { LEGAL } from "@/lib/constants";

// -- Validation schema ------------------------------------------------

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),
  email: z.string().email("Adresse email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message est trop long"),
  honeypot: z.string().max(0, "Bot détecté").optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

// -- Rate limiting simple ---------------------------------------------

const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requêtes par minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastAttempt = rateLimiter.get(ip);

  if (!lastAttempt || now - lastAttempt > RATE_LIMIT_WINDOW) {
    rateLimiter.set(ip, now);
    return true;
  }

  const attempts = Array.from(rateLimiter.entries()).filter(
    ([, time]) => now - time < RATE_LIMIT_WINDOW
  ).length;

  return attempts < RATE_LIMIT_MAX;
}

// -- Server Action ---------------------------------------------------

export type ContactState = {
  success: boolean;
  error?: string;
  fields?: ContactInput;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    honeypot: formData.get("website") as string,
  };

  // Rate limiting basé sur l'email
  if (!checkRateLimit(data.email)) {
    return {
      success: false,
      error: "Trop de tentatives. Veuillez réessayer dans une minute.",
      fields: data,
    };
  }

  // Validation
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Données invalides";
    return { success: false, error: firstError, fields: data };
  }

  // Honeypot check
  if (result.data.honeypot) {
    // Silently "succeed" to not give away the honeypot
    return { success: true };
  }

  // Envoi de l'email via Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Contact Gala INSA <onboarding@resend.dev>",
      to: [LEGAL.email],
      replyTo: result.data.email,
      subject: `[Gala INSA 2026] Nouveau message de ${result.data.name}`,
      html: `
        <h2>Nouveau message depuis le site du Gala</h2>
        <p><strong>Nom :</strong> ${result.data.name}</p>
        <p><strong>Email :</strong> ${result.data.email}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${result.data.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error:
          "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
        fields: data,
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Contact action error:", err);
    return {
      success: false,
      error: "Erreur serveur. Veuillez réessayer plus tard.",
      fields: data,
    };
  }
}