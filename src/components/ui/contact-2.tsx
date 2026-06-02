import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FadeUp } from "@/components/ui/fade-up";
import { addMessage } from "@/lib/firestore";

interface ContactLink {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

interface Contact2Props {
  sectionId?: string;
  title?: string;
  description?: string;
  links?: ContactLink[];
  contactDetailsLabel?: string;
  formLabels?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
    message?: string;
    submit?: string;
  };
}

export const Contact2 = ({
  sectionId = "contact",
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities.",
  links = [],
  contactDetailsLabel = "Contact Details",
  formLabels = {},
}: Contact2Props) => {
  const labels = {
    firstName: formLabels.firstName ?? "Nombre",
    lastName: formLabels.lastName ?? "Apellido",
    email: formLabels.email ?? "Email",
    subject: formLabels.subject ?? "Asunto",
    message: formLabels.message ?? "Mensaje",
    submit: formLabels.submit ?? "Enviar mensaje",
  };

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) return;
    setSending(true);
    setError('');
    try {
      await addMessage(form);
      setSent(true);
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch {
      setError('No se pudo enviar el mensaje. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id={sectionId} className="py-24">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          {/* ── Left: info ── */}
          <FadeUp className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className="section-label mb-4">Contacto</div>
              <h2 className="mb-3 text-4xl font-extrabold text-foreground leading-tight lg:text-5xl">
                {title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {links.length > 0 && (
              <div className="mx-auto w-fit lg:mx-0">
                <h3 className="mb-5 text-center text-lg font-semibold text-foreground lg:text-left">
                  {contactDetailsLabel}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {link.icon}
                      </span>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                          {link.label}
                        </div>
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                          {link.value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeUp>

          {/* ── Right: form ── */}
          <FadeUp delay={0.15} className="mx-auto flex w-full max-w-screen-md flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold text-foreground">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground">Lo revisaré pronto y te respondo a la brevedad.</p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="firstname">{labels.firstName}</Label>
                    <Input
                      type="text" id="firstname" placeholder={labels.firstName}
                      value={form.firstName} onChange={set('firstName')} required
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="lastname">{labels.lastName}</Label>
                    <Input
                      type="text" id="lastname" placeholder={labels.lastName}
                      value={form.lastName} onChange={set('lastName')}
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">{labels.email}</Label>
                  <Input
                    type="email" id="email" placeholder="tu@email.com"
                    value={form.email} onChange={set('email')} required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="subject">{labels.subject}</Label>
                  <Input
                    type="text" id="subject" placeholder="¿En qué te puedo ayudar?"
                    value={form.subject} onChange={set('subject')}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">{labels.message}</Label>
                  <Textarea
                    placeholder="Describe tu proceso, backlog o idea borrosa..."
                    id="message" rows={5}
                    value={form.message} onChange={set('message')} required
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}
                <Button className="w-full" size="lg" type="submit" disabled={sending}>
                  {sending ? 'Enviando…' : labels.submit}
                </Button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
