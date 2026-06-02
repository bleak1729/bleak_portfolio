import { Button } from "@/components/ui/button";

interface StackTool {
  name: string;
  logo: string;
}

interface IntegrationsSectionProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  primaryLink?: string;
  primaryText?: string;
  secondaryLink?: string;
  secondaryText?: string;
  tools?: StackTool[];
}

export default function IntegrationsSection({
  sectionLabel = "Stack Tecnológico",
  heading = "Herramientas con las que entrego cada día",
  description = "Un stack pragmático centrado en Microsoft, extendido con Python e IA donde aportan valor real.",
  primaryLink = "#projects",
  primaryText = "Ver Proyectos",
  secondaryLink = "#contact",
  secondaryText = "Agendar consulta →",
  tools = [],
}: IntegrationsSectionProps) {
  return (
    <section
      id="stack"
      className="py-24 px-6 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center border border-border bg-card rounded-3xl p-8 md:p-12">
        {/* Left Side */}
        <div>
          <div className="section-label">{sectionLabel}</div>
          <h2 className="text-4xl font-extrabold text-foreground mt-2 mb-4 leading-tight">
            {heading}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <a href={primaryLink}>{primaryText}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <a href={secondaryLink}>{secondaryText}</a>
            </Button>
          </div>
        </div>

        {/* Right Side — octagon grid */}
        <div className="grid grid-cols-5 gap-4 items-center justify-items-center">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              title={tool.name}
              className="relative w-16 h-16 bg-white shadow-sm border-2 border-gray-200 flex items-center justify-center transition-transform hover:scale-110"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                loading="lazy"
                decoding="async"
                className="w-9 h-9 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
