"use client";

import { useState, type FormEvent } from "react";
import { contactInfo, services } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, wait } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initial: FormState = { name: "", email: "", phone: "", service: services[0].title, message: "" };

function validate(f: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = "Please enter a valid email address.";
  if (f.phone && !/^[+\d\s()-]{7,}$/.test(f.phone)) errors.phone = "Please enter a valid phone number.";
  if (f.message.trim().length < 10) errors.message = "Tell us a little more (10+ characters).";
  return errors;
}

const details: { icon: IconName; label: string; value: string }[] = [
  { icon: "phone", label: "Call or WhatsApp", value: contactInfo.phone },
  { icon: "mail", label: "Email", value: contactInfo.email },
  { icon: "pin", label: "Office", value: contactInfo.address },
  { icon: "clock", label: "Hours", value: contactInfo.hours },
];

export function Contact() {
  const scope = useReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await wait(900); // no backend: simulate sending
    setStatus("sent");
    setForm(initial);
  }

  return (
    <section id="contact" ref={scope} className="scroll-mt-20 bg-sand py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact us"
            title="Tell us where you want to go"
            description="Share a few details and a travel advisor will send you a personalised quote within 2 hours."
          />
          <ul className="mt-10 space-y-5">
            {details.map((d) => (
              <li key={d.label} data-reveal className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                  <Icon name={d.icon} size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{d.label}</p>
                  <p className="mt-0.5 font-medium text-ink">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(11,27,43,0.3)] sm:p-10">
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center" role="status">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon name="check" size={32} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Thanks, we&apos;ve got your request!</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-600">
                A travel advisor will reach out shortly. (Demo site — no message was actually sent.)
              </p>
              <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
                Send another enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Full name" value={form.name} onChange={update("name")} error={errors.name} autoComplete="name" />
              <TextField id="email" label="Email" type="email" value={form.email} onChange={update("email")} error={errors.email} autoComplete="email" />
              <TextField id="phone" label="Phone (optional)" type="tel" value={form.phone} onChange={update("phone")} error={errors.phone} autoComplete="tel" />
              <div>
                <label htmlFor="service" className="label-text">Service</label>
                <select id="service" className="input-field" value={form.service} onChange={update("service")}>
                  {services.map((s) => <option key={s.key}>{s.title}</option>)}
                  <option>Full travel package</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="label-text">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className={cn("input-field resize-none", errors.message && "border-red-400")}
                  placeholder="Destination, dates, number of travellers…"
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                  <Icon name="arrow" size={18} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

function TextField({ id, label, value, onChange, error, type = "text", autoComplete }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label-text">{label}</label>
      <input
        id={id}
        type={type}
        className={cn("input-field", error && "border-red-400")}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={!!error}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
