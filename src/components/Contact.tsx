import { Linkedin, Mail } from "lucide-react";
import { Contact2 } from "@/components/ui/contact-2";

const contactLinks = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "hola@bleaksproductions.com",
    href: "mailto:hola@bleaksproductions.com",
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: "LinkedIn",
    value: "linkedin.com/in/tu-usuario",
    href: "#",
  },
];

export default function Contact() {
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
