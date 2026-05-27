"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";

const SERVICES = [
  { value: "Conocimiento empresarial", label: "Conocimiento empresarial" },
  { value: "Sistema de llamadas con IA", label: "Sistema de llamadas con IA" },
  { value: "Consulta general", label: "Consulta general" },
];

const shakeVariants = {
  shake: { x: [0, -8, 8, -6, 6, -4, 4, 0], transition: { duration: 0.4 } },
};

const inputStyle = {
  fontFamily: "var(--font-dm-sans, sans-serif)",
  fontSize: "0.9rem",
  borderRadius: "0.6rem",
  border: "1px solid color-mix(in oklab, var(--border) 85%, transparent)",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const watchService = watch("service");
  const watchAccept = watch("acceptComms");

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Error al enviar. Intenta de nuevo.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  };

  const FieldError = ({ name }: { name: keyof ContactFormValues }) =>
    errors[name] ? (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert">
        <AlertTriangle size={13} aria-hidden="true" /> {errors[name]?.message as string}
      </p>
    ) : null;

  return (
    <section
      id="contacto"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)" }}
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
      {/* Blob */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #a78bfa, #667eea)" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-violet-200 uppercase mb-3"
          >
            Contacto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-fluid-h2 text-white mb-4"
            style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
          >
            ¿Listo para dejar de perder tiempo?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-violet-100 text-base leading-relaxed max-w-xl mx-auto"
          >
            Agenda una consulta gratuita de 30 minutos. Identificaremos tu mayor
            cuello de botella y te mostraremos exactamente cómo la IA puede resolverlo.
          </motion.p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: "color-mix(in oklab, var(--card) 96%, transparent)",
            border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="flex justify-center mb-5"
                >
                  <CheckCircle2 size={64} className="text-green-500" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
                  ¡Gracias!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  Recibimos tu consulta. Te contactaremos en las próximas 24 horas.
                </p>
                <button
                  onClick={() => { reset(); setStatus("idle"); }}
                  className="text-sm font-semibold text-violet-600 hover:text-violet-700 underline underline-offset-2"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <motion.div variants={shakeVariants} animate={errors.fullName ? "shake" : ""}>
                      <Input id="fullName" placeholder="Juan Pérez" style={inputStyle} aria-invalid={!!errors.fullName} {...register("fullName")} />
                    </motion.div>
                    <FieldError name="fullName" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <motion.div variants={shakeVariants} animate={errors.email ? "shake" : ""}>
                      <Input id="email" type="email" placeholder="juan@empresa.com" style={inputStyle} aria-invalid={!!errors.email} {...register("email")} />
                    </motion.div>
                    <FieldError name="email" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                      Empresa / Organización <span className="text-red-500">*</span>
                    </label>
                    <motion.div variants={shakeVariants} animate={errors.company ? "shake" : ""}>
                      <Input id="company" placeholder="Mi Empresa S.A." style={inputStyle} aria-invalid={!!errors.company} {...register("company")} />
                    </motion.div>
                    <FieldError name="company" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                      Teléfono <span className="text-slate-400 font-normal text-xs">(opcional)</span>
                    </label>
                    <Input id="phone" type="tel" placeholder="+507 6000-0000" style={inputStyle} {...register("phone")} />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    ¿Qué servicio te interesa? <span className="text-red-500">*</span>
                  </label>
                  <motion.div variants={shakeVariants} animate={errors.service ? "shake" : ""}>
                    <Select
                      value={watchService}
                      onValueChange={(val) => setValue("service", val as ContactFormValues["service"], { shouldValidate: true })}
                    >
                      <SelectTrigger id="service" className="w-full text-[13px]" style={{ ...inputStyle, height: "2.6rem" }} aria-invalid={!!errors.service}>
                        <SelectValue placeholder="Selecciona un servicio..." />
                      </SelectTrigger>
                      <SelectContent className="min-w-[15rem]">
                        {SERVICES.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="text-[13px]">{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  <FieldError name="service" />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    Cuéntanos tu problema <span className="text-red-500">*</span>
                  </label>
                  <motion.div variants={shakeVariants} animate={errors.message ? "shake" : ""}>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Describe qué proceso manual está matando tu productividad..."
                      style={{ ...inputStyle, resize: "none" }}
                      aria-invalid={!!errors.message}
                      {...register("message")}
                    />
                  </motion.div>
                  <FieldError name="message" />
                </div>

                <div className="flex items-start gap-3 mb-6">
                  <Checkbox
                    id="acceptComms"
                    checked={watchAccept === true}
                    onCheckedChange={(checked) =>
                      setValue("acceptComms", checked === true ? true : (false as unknown as true), { shouldValidate: true })
                    }
                    className="mt-0.5"
                    aria-invalid={!!errors.acceptComms}
                  />
                  <div>
                    <label htmlFor="acceptComms" className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                      Acepto recibir comunicaciones de Aether AI <span className="text-red-500">*</span>
                    </label>
                    {errors.acceptComms && (
                      <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert">
                        <AlertTriangle size={13} aria-hidden="true" /> {errors.acceptComms.message}
                      </p>
                    )}
                  </div>
                </div>

                {status === "error" && errorMsg && (
                  <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60 glow-pulse"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                  }}
                  whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.99 } : {}}
                >
                  {status === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                  ) : (
                    "Agendar Consulta Gratuita →"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
