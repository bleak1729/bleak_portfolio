import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <section id={sectionId} className="py-24">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          {/* ── Left: info ── */}
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
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
          </div>

          {/* ── Right: form ── */}
          <div className="mx-auto flex w-full max-w-screen-md flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm lg:p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">{labels.firstName}</Label>
                <Input type="text" id="firstname" placeholder={labels.firstName} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">{labels.lastName}</Label>
                <Input type="text" id="lastname" placeholder={labels.lastName} />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">{labels.email}</Label>
              <Input type="email" id="email" placeholder="tu@email.com" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">{labels.subject}</Label>
              <Input type="text" id="subject" placeholder="¿En qué te puedo ayudar?" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">{labels.message}</Label>
              <Textarea
                placeholder="Describe tu proceso, backlog o idea borrosa..."
                id="message"
                rows={5}
              />
            </div>
            <Button className="w-full" size="lg">
              {labels.submit}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
