import {
  ContainerStagger,
  ContainerAnimated,
} from "@/components/blocks/cta-section-with-gallery";
import { Search, ShieldCheck, Repeat, TrendingUp } from "lucide-react";

const skills = ["Power Platform", "SQL Server", "Azure", "IA / OpenAI", "React / Next.js", "SaaS", "Integración SAP"];

const howIWork = [
  {
    icon: Search,
    title: "Descubrimiento real",
    description: "Mapeo el proceso tal como ocurre en el día a día, no el documentado en el manual.",
  },
  {
    icon: ShieldCheck,
    title: "Diseño gobernado",
    description: "Arquitectura pensada para escalar, con seguridad y gobierno de datos desde el inicio.",
  },
  {
    icon: Repeat,
    title: "Entrega iterativa",
    description: "Construyo junto al equipo, en ciclos cortos, con retroalimentación constante.",
  },
  {
    icon: TrendingUp,
    title: "Medición de impacto",
    description: "Adopción y ROI se miden desde el día uno, no como una ocurrencia tardía.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 md:grid-cols-2 md:gap-12">
        {/* ── Left: Bio ── */}
        <ContainerStagger>
          <ContainerAnimated className="section-label mb-1">
            Acerca
          </ContainerAnimated>

          <ContainerAnimated className="text-3xl font-extrabold text-foreground leading-tight sm:text-4xl md:text-[2.4rem] tracking-tight mb-5 font-display">
            Desarrollador de Aplicaciones de Negocio y consultor en automatización
          </ContainerAnimated>

          <ContainerAnimated className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
            Diseño y entrego soluciones de nivel productivo sobre Microsoft Power Platform,
            páginas web modernas con React / Next.js y productos SaaS end-to-end —
            combinando la velocidad del low-code con el rigor de SQL, Azure e IA.
          </ContainerAnimated>

          <ContainerAnimated className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
            Con experiencia profunda en{" "}
            <strong className="text-foreground">
              Power Apps, Power Automate, SQL Server, Azure, IA, SharePoint e integraciones
              con SAP
            </strong>
            , colaboro con líderes de operaciones, finanzas y TI para digitalizar los procesos
            que silenciosamente erosionan el margen.
          </ContainerAnimated>

          <ContainerAnimated className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-7">
            Mi trabajo abarca automatización empresarial, portales y plataformas web, e-commerce
            y productos SaaS — siempre fundamentado en datos limpios, arquitectura gobernada y
            métricas claras de adopción.
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-xs sm:text-sm font-medium bg-secondary text-primary border border-primary/20 px-3 sm:px-4 py-1.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </ContainerAnimated>
        </ContainerStagger>

        {/* ── Right: Cómo trabajo ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6 pl-1">
            Cómo trabajo
          </p>

          <ul className="space-y-7">
            {howIWork.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
