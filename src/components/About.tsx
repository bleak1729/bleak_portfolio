import {
  ContainerStagger,
  ContainerAnimated,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/blocks/cta-section-with-gallery";

const skills = ["Power Platform", "SQL Server", "Azure", "IA / OpenAI", "React / Next.js", "SaaS", "Integración SAP"];

const howIWork = [
  {
    step: "01",
    label: "Descubrir el proceso real, no el documentado",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop",
  },
  {
    step: "02",
    label: "Diseñar con gobierno, seguridad y escala",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80&auto=format&fit=crop",
  },
  {
    step: "03",
    label: "Entregar iterativamente con el equipo en la sala",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop",
  },
  {
    step: "04",
    label: "Medir adopción y ROI desde el día uno",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
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

        {/* ── Right: Cómo trabajo gallery ── */}
        <div>
          {/* Title above grid */}
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6 pl-1">
            Cómo trabajo
          </p>

          <GalleryGrid>
            {howIWork.map((item, index) => (
              <GalleryGridCell key={item.step} index={index}>
                {/* Photo */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="size-full object-cover object-center"
                />
                {/* Overlay label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-6">
                  <span className="block text-[10px] font-bold text-primary/80 mb-0.5 leading-none">
                    {item.step}
                  </span>
                  <span className="block text-[11px] font-semibold text-white leading-snug">
                    {item.label}
                  </span>
                </div>
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>
      </div>
    </section>
  );
}
