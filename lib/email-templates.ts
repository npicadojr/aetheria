import { ContactFormValues } from "./validations";
import { SERVICE_LABELS } from "./validations";

export function notificationEmail(data: ContactFormValues): {
  subject: string;
  html: string;
} {
  const serviceName =
    SERVICE_LABELS[data.service] || data.service;

  return {
    subject: `Nueva consulta - ${serviceName} - ${data.company}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E293B; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .body { background: #F8FAFC; padding: 24px; border: 1px solid #E2E8F0; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { font-size: 15px; color: #1E293B; margin-top: 4px; }
    .message-box { background: white; border: 1px solid #E2E8F0; border-radius: 6px; padding: 16px; margin-top: 4px; }
    .footer { text-align: center; font-size: 12px; color: #64748B; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin:0;font-size:22px;">Nueva consulta — Aether AI</h1>
    <p style="margin:8px 0 0;opacity:0.9;">${serviceName}</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">Nombre</div>
      <div class="value">${data.fullName}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
    </div>
    <div class="field">
      <div class="label">Empresa</div>
      <div class="value">${data.company}</div>
    </div>
    ${
      data.phone
        ? `<div class="field">
      <div class="label">Teléfono</div>
      <div class="value"><a href="https://wa.me/${data.phone.replace(/\D/g, "")}">${data.phone}</a></div>
    </div>`
        : ""
    }
    <div class="field">
      <div class="label">Servicio de interés</div>
      <div class="value">${serviceName}</div>
    </div>
    <div class="field">
      <div class="label">Mensaje</div>
      <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
    </div>
  </div>
  <div class="footer">Aether AI · Panamá, Panamá</div>
</body>
</html>`,
  };
}

export function confirmationEmail(
  name: string,
  email: string
): { subject: string; html: string } {
  return {
    subject: "Recibimos tu consulta - Aether AI",
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E293B; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center; }
    .body { background: #F8FAFC; padding: 32px 24px; border: 1px solid #E2E8F0; }
    .cta { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 24px; }
    .footer { text-align: center; font-size: 12px; color: #64748B; margin-top: 24px; }
    .divider { border: none; border-top: 1px solid #E2E8F0; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size:40px;line-height:1;margin-bottom:12px;font-weight:700;">OK</div>
    <h1 style="margin:0;font-size:24px;">¡Consulta recibida!</h1>
  </div>
  <div class="body">
    <p>Hola <strong>${name}</strong>,</p>
    <p>Gracias por contactarnos. Hemos recibido tu consulta y nos comunicaremos contigo en las próximas <strong>24 horas hábiles</strong>.</p>
    <p>Mientras tanto, puedes conocer más sobre los sistemas que construimos visitando nuestra página.</p>
  </div>
  <div class="footer">
    © 2026 Aether AI · Panamá, Panamá<br>
    <small>Este email fue enviado a ${email}</small>
  </div>
</body>
</html>`,
  };
}
