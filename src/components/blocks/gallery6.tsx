"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ItemDetailModal, { DetailItem } from "@/components/ui/item-detail-modal";
import { FadeUp } from "@/components/ui/fade-up";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  tags?: string[];
  result?: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
  sectionId?: string;
  sectionLabel?: string;
  ctaLabel?: string;
}

const Gallery6 = ({
  heading = "Gallery",
  demoUrl = "#",
  items = [],
  sectionId = "gallery",
  sectionLabel,
  ctaLabel = "Agendar consulta",
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);

  // Update scroll buttons whenever the API is ready or items change
  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    carouselApi.reInit();
    updateSelection();

    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi, items]);

  return (
    <section id={sectionId} className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <FadeUp>
            {sectionLabel && <div className="section-label">{sectionLabel}</div>}
            <h2 className="mb-3 text-3xl font-extrabold text-foreground sm:text-4xl md:mb-4">
              {heading}
            </h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:text-base"
            >
              {ctaLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </FadeUp>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto rounded-full"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <div className="group flex flex-col justify-between cursor-pointer">
                  {/* Image */}
                  <div className="flex h-56 md:h-64 overflow-clip rounded-xl">
                    <div className="flex-1">
                      <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <div className="mb-2 line-clamp-2 break-words pt-4 text-lg font-semibold text-foreground md:mb-3 md:text-xl lg:text-2xl font-display">
                    {item.title}
                  </div>

                  {/* Description */}
                  <div className="mb-4 line-clamp-3 text-sm text-muted-foreground md:text-base">
                    {item.summary}
                  </div>

                  {/* Result metric */}
                  {item.result && (
                    <div className="mb-6 flex items-start gap-2 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-foreground">
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item.result}
                    </div>
                  )}

                  {/* Ver detalle — opens modal */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center text-sm font-medium text-primary hover:gap-3 transition-all gap-2"
                  >
                    Ver detalle
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Detail modal */}
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export { Gallery6 };
