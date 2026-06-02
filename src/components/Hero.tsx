const stats = [
  { value: '40+', label: 'Apps entregadas' },
  { value: '1.2M+', label: 'Ejecuciones automatizadas' },
  { value: '10x', label: 'ROI promedio' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(215,25%,91%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(215,25%,91%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 dark:from-slate-800/60 via-white/0 dark:via-transparent to-white dark:to-slate-900 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Available badge */}
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 dark:text-slate-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Disponible para nuevos proyectos
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground dark:text-slate-50 leading-tight max-w-3xl mb-6">
          Automatizando procesos de negocio con{' '}
          <span className="gradient-text">Power Platform, SQL e IA</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground dark:text-slate-400 max-w-xl mb-10 leading-relaxed">
          Ayudo a las empresas a reemplazar el trabajo manual con aplicaciones de negocio
          seguras y escalables — construidas sobre la nube de Microsoft y medidas con ROI
          real.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Ver Proyectos <span>→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 text-foreground dark:text-slate-100 font-semibold px-7 py-3.5 rounded-full hover:bg-muted dark:hover:bg-slate-700 transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-foreground dark:text-slate-50 mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
