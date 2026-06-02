import { ArrowRight } from "lucide-react";

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
    <section id={sectionId} className="py-24">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col gap-16 lg:px-16">
        <div className="lg:max-w-lg">
          {sectionLabel && <div className="section-label">{sectionLabel}</div>}
          <h2 className="mb-3 text-4xl font-extrabold text-foreground md:mb-4">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">{description}</p>
          <a
            href={linkUrl}
            className="group flex items-center text-sm font-medium text-primary md:text-base"
          >
            {linkText}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col overflow-clip rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-[16/9] h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10">
                <h3 className="mb-3 text-lg font-semibold text-foreground md:mb-4 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
