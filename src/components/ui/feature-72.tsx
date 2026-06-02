import { ArrowRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/fade-up";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Feature72Props {
  heading?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  sectionLabel?: string;
  sectionId?: string;
  features?: Feature[];
}

export const Feature72 = ({
  heading = "Powerful Features",
  description = "Discover the powerful features that make our platform stand out.",
  linkUrl = "#",
  linkText = "Book a demo",
  sectionLabel,
  sectionId,
  features = [],
}: Feature72Props) => {
  return (
    <section id={sectionId} className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6 flex flex-col gap-10 md:gap-16 lg:px-16">

        {/* Header */}
        <FadeUp className="lg:max-w-lg">
          {sectionLabel && <div className="section-label">{sectionLabel}</div>}
          <h2 className="mb-3 text-3xl font-extrabold text-foreground sm:text-4xl md:mb-4">
            {heading}
          </h2>
          <p className="mb-6 text-sm sm:text-base text-muted-foreground lg:text-lg">{description}</p>
          <a
            href={linkUrl}
            className="group flex items-center text-sm font-medium text-primary md:text-base"
          >
            {linkText}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeUp>

        {/* Cards: horizontal scroll on mobile, grid on md+ */}
        <StaggerContainer className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.id} className="flex-none w-[80vw] sm:w-[60vw] md:w-auto snap-start">
              <div className="flex flex-col overflow-clip rounded-2xl border border-border bg-card hover:shadow-md hover:border-border/80 transition-all duration-300 h-full">
                <div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="aspect-[16/9] h-full w-full object-cover object-center"
                  />
                </div>
                <div className="px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                  <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg md:mb-4 md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
