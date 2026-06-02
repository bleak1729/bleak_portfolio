import { useEffect, useState } from "react";
import { Linkedin, Mail } from "lucide-react";
import { Contact2 } from "@/components/ui/contact-2";
import { getSettings, SiteSettings } from "@/lib/firestore";

const defaults: SiteSettings = {
  email: "hola@bleaksproductions.com",
  linkedin: "https://linkedin.com/in/tu-usuario",
};

export default function Contact() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    getSettings()
      .then(s => {
        setSettings({
          email: s.email || defaults.email,
          linkedin: s.linkedin || defaults.linkedin,
        });
      })
      .catch(() => {});
  }, []);

  const contactLinks = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      value: settings.linkedin.replace("https://", ""),
      href: settings.linkedin,
    },
  ];

  return (
    <Contact2
      sectionId="contact"
      title="Automaticemos el trabajo que te está frenando."
      description="Trae un proceso, un backlog o una idea borrosa. La definimos juntos y te entrego un plan creíble en menos de una semana."
      links={contactLinks}
      contactDetailsLabel="Canales directos"
      formLabels={{
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Email",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Iniciar conversación →",
      }}
    />
  );
}
