import { useEffect } from 'react'
import { X, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export interface DetailItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
  tags?: string[]
  result?: string
}

interface ItemDetailModalProps {
  item: DetailItem | null
  onClose: () => void
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const containerRef = useFocusTrap(!!item)

  // Close on Escape key
  useEffect(() => {
    if (!item) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item, onClose])

  // Lock body scroll
  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={item?.title}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-foreground mb-4 leading-tight">
            {item.title}
          </h2>

          {/* Full description */}
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            {item.summary}
          </p>

          {/* Result metric */}
          {item.result && (
            <div className="flex items-start gap-2 rounded-xl bg-secondary px-4 py-3 mb-6">
              <ArrowUpRight className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.result}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {item.url && item.url !== '#' && (
              <Button asChild className="gap-2 rounded-full px-6">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Ver proyecto <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              className="rounded-full px-6"
              asChild
            >
              <a href="#contact" onClick={onClose}>Contactar →</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
