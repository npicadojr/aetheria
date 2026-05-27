import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations";
import { notificationEmail, confirmationEmail } from "@/lib/email-templates";

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? "developernpicado@gmail.com";

/* In-memory rate limiter: max 3 per IP per hour */
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );
  if (timestamps.length >= 3) return false;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

async function tryDbSave(
  data: ReturnType<typeof contactSchema.parse>,
  ip: string
) {
  if (!process.env.POSTGRES_URL) return;
  try {
    const { saveLead } = await import("@/lib/db");
    await saveLead({
      ...data,
      acceptComms: data.acceptComms as boolean,
      ipAddress: ip,
    });
  } catch {
    /* DB errors should not block the user response */
  }
}

async function sendEmails(data: ReturnType<typeof contactSchema.parse>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const notification = notificationEmail(data);
  await resend.emails.send({
    from: "Aether AI <onboarding@resend.dev>",
    to: NOTIFICATION_EMAIL,
    subject: notification.subject,
    html: notification.html,
  });

  const confirmation = confirmationEmail(data.fullName, data.email);
  await resend.emails.send({
    from: "Aether AI <onboarding@resend.dev>",
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  });
}

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en una hora." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  await tryDbSave(data, ip);
  await sendEmails(data);

  return Response.json({ success: true }, { status: 200 });
}
