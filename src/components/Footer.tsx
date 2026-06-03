import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-slate-700 py-8 px-6 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo className="h-7 w-auto" typeClassName="text-xs" />
        <p className="text-sm text-muted-foreground dark:text-slate-500 text-center">
          © 2026 Bleak's Solutions. Power Platform · SQL · IA · Automatización.
        </p>
      </div>
    </footer>
  )
}
