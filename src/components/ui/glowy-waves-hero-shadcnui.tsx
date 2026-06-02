import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const portfolioPills = ["Power Platform", "SQL Server", "IA / Azure", "React / Web", "SaaS"] as const;

const heroStats: { label: string; value: string }[] = [
  { label: "Apps entregadas", value: "40+" },
  { label: "Ejecuciones automatizadas", value: "1.2M+" },
  { label: "ROI promedio", value: "10x" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
  // Re-initialize canvas when theme toggles
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // KEY FIX: use hsl(var(--variable)) so raw-channel CSS vars resolve correctly
    const resolveColor = (variables: string[], alpha = 1): string => {
      const tempEl = document.createElement("div");
      tempEl.style.cssText =
        "position:absolute;visibility:hidden;width:1px;height:1px";
      document.body.appendChild(tempEl);

      let color = alpha < 1 ? `rgba(99,130,255,${alpha})` : "rgb(99,130,255)";

      for (const variable of variables) {
        // Use hsl(var()) wrapper — our CSS vars store raw HSL channels
        tempEl.style.backgroundColor = `hsl(var(${variable}))`;
        const computed = getComputedStyle(tempEl).backgroundColor;

        if (computed && computed !== "rgba(0, 0, 0, 0)") {
          if (alpha < 1) {
            const m = computed.match(
              /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
            );
            color = m
              ? `rgba(${m[1]},${m[2]},${m[3]},${alpha})`
              : computed;
          } else {
            color = computed;
          }
          break;
        }
      }

      document.body.removeChild(tempEl);
      return color;
    };

    const computeThemeColors = () => ({
      backgroundTop: resolveColor(["--background"], 1),
      backgroundBottom: resolveColor(["--muted", "--background"], 0.98),
      wavePalette: [
        {
          offset: 0,
          amplitude: 70,
          frequency: 0.003,
          color: resolveColor(["--primary"], 0.8),
          opacity: 0.45,
        },
        {
          offset: Math.PI / 2,
          amplitude: 90,
          frequency: 0.0026,
          color: resolveColor(["--accent", "--primary"], 0.7),
          opacity: 0.35,
        },
        {
          offset: Math.PI,
          amplitude: 60,
          frequency: 0.0034,
          color: resolveColor(["--primary"], 0.5),
          opacity: 0.28,
        },
        {
          offset: Math.PI * 1.5,
          amplitude: 80,
          frequency: 0.0022,
          color: resolveColor(["--accent"], 0.4),
          opacity: 0.22,
        },
        {
          offset: Math.PI * 2,
          amplitude: 55,
          frequency: 0.004,
          color: resolveColor(["--primary"], 0.3),
          opacity: 0.18,
        },
      ] satisfies WaveConfig[],
    });

    let themeColors = computeThemeColors();

    // Re-read colors if dark/light class changes mid-session
    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;
    // On mobile: skip every other wave and use larger x-steps to reduce GPU load
    const xStep = isMobile ? 8 : 4;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = c;
      targetMouseRef.current = c;
    };

    const handleResize = () => { resizeCanvas(); recenterMouse(); };
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => recenterMouse();

    resizeCanvas();
    recenterMouse();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += xStep) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect;

        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      if (!isMobile) {
        ctx.shadowBlur = 35;
        ctx.shadowColor = wave.color;
      }
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, themeColors.backgroundTop);
      grad.addColorStop(1, themeColors.backgroundBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      const waves = isMobile ? themeColors.wavePalette.slice(0, 3) : themeColors.wavePalette;
      waves.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  // Re-run when theme changes so canvas reads fresh CSS variables
  }, [theme]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      role="region"
      aria-label="Hero"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* subtle radial glows — desktop only, too GPU-heavy on mobile */}
      <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.03] blur-[140px] dark:bg-foreground/[0.06]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.02] blur-[120px] dark:bg-foreground/[0.05]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-[150px] dark:bg-primary/[0.05]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-28 pb-16 text-center sm:px-8 md:px-8 md:py-24 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Available badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/70 sm:px-4 sm:py-2 sm:text-sm sm:backdrop-blur dark:border-border/60 dark:bg-background/80 dark:text-foreground/80"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Disponible para nuevos proyectos
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-5 text-[2rem] font-extrabold tracking-tight text-foreground leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-display"
          >
            Procesos de negocio, Páginas Web y SaaS con{" "}
            <span className="bg-gradient-to-r from-primary via-primary/70 to-accent bg-clip-text text-transparent">
              Power Platform y React
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-base text-foreground/70 sm:text-lg md:text-xl leading-relaxed"
          >
            Diseño y entrego aplicaciones de negocio, páginas web y productos SaaS
            — sobre Microsoft Power Platform, React y Azure, siempre medidos con ROI real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              className="group gap-2 rounded-full px-7 text-sm font-semibold sm:px-8 sm:text-base w-full sm:w-auto"
              asChild
            >
              <a href="#projects">
                Ver Proyectos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border/50 bg-background/70 px-7 text-sm font-semibold sm:px-8 sm:text-base sm:backdrop-blur hover:bg-background/80 dark:border-border/50 dark:bg-background/50 dark:hover:bg-background/60 w-full sm:w-auto"
              asChild
            >
              <a href="#contact">Contacto</a>
            </Button>
          </motion.div>

          {/* Pills — 2-col grid on mobile, flex on larger */}
          <motion.ul
            variants={itemVariants}
            className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 text-xs font-medium uppercase tracking-widest text-foreground/60"
          >
            {portfolioPills.map((pill) => (
              <li
                key={pill}
                className="flex items-center justify-center rounded-full border border-border/40 bg-background/70 px-3 py-2 sm:px-4 sm:backdrop-blur dark:border-border/60 dark:bg-background/80"
              >
                {pill}
              </li>
            ))}
          </motion.ul>

          {/* Stats — row on mobile with dividers, grid on sm+ */}
          <motion.div
            variants={statsVariants}
            className="rounded-2xl border border-border/30 bg-background/70 sm:backdrop-blur-sm dark:border-border/50 dark:bg-background/80 overflow-hidden"
          >
            <div className="grid grid-cols-3 divide-x divide-border/30 sm:gap-0 p-4 sm:p-6">
              {heroStats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} className="flex flex-col items-center gap-0.5 px-2 sm:px-4">
                  <div className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-foreground/50 dark:text-foreground/60 text-center leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
