import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "Nombre demasiado largo"),
  email: z.string().email("Ingresa un email válido"),
  company: z
    .string()
    .min(1, "La empresa es requerida")
    .max(100, "Nombre demasiado largo"),
  phone: z.string().optional(),
  service: z.enum(
    [
      "knowledge-assistant",
      "voice-calling",
      "other",
    ],
    { error: "Selecciona un servicio" }
  ),
  message: z
    .string()
    .min(50, "El mensaje debe tener al menos 50 caracteres")
    .max(2000, "Mensaje demasiado largo"),
  acceptComms: z.literal(true, { error: "Debes aceptar para continuar" }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const SERVICE_LABELS: Record<string, string> = {
  "knowledge-assistant": "Asistente de conocimiento empresarial",
  "voice-calling": "Sistema de llamadas con IA",
  other: "Otro / Consulta general",
};
