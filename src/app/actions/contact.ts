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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                  <!-- Header -->
                  <tr>
                    <td style="background:#043768;padding:32px 40px;text-align:center;">
                      <h1 style="margin:0;color:#c9a84c;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                        🎭 Gala INSA Strasbourg
                      </h1>
                      <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">
                        71<sup style="font-size:10px;">e</sup> Édition — 2026
                      </p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:32px 40px;">
                      <h2 style="margin:0 0 20px;color:#1e293b;font-size:20px;font-weight:600;">
                        📬 Nouveau message de contact
                      </h2>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                        <tr>
                          <td style="padding:12px 16px;background:#f8fafc;border-radius:8px;">
                            <p style="margin:0;font-size:14px;color:#64748b;">
                              <strong style="color:#043768;">Nom :</strong> ${result.data.name}
                            </p>
                            <p style="margin:6px 0 0;font-size:14px;color:#64748b;">
                              <strong style="color:#043768;">Email :</strong>
                              <a href="mailto:${result.data.email}" style="color:#0654a0;text-decoration:none;">
                                ${result.data.email}
                              </a>
                            </p>
                          </td>
                        </tr>
                      </table>
                      <div style="border-top:1px solid #e2e8f0;margin-bottom:20px;"></div>
                      <p style="margin:0 0 12px;color:#1e293b;font-size:14px;font-weight:600;">Message :</p>
                      <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#334155;">
                        ${result.data.message.replace(/\n/g, "<br />")}
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;font-size:12px;color:#94a3b8;">
                        Cet email a été envoyé depuis le formulaire de contact du site
                        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://gala-insa-strasbourg.fr'}" style="color:#0654a0;text-decoration:underline;">
                          Gala INSA Strasbourg
                        </a>
                      </p>
                      <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">
                        Vous pouvez répondre directement à cet email pour contacter ${result.data.name}.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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