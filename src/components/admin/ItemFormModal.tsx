import { useEffect, useRef, useState } from 'react'
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { compressImage } from '@/lib/firestore'
import { cn } from '@/lib/utils'

export interface ItemFormData {
  title: string
  summary: string
  url: string
  image: string       // base64 or external URL
  tags: string        // comma-separated
  result?: string     // projects only
  active: boolean
  order: number
}

interface ItemFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: ItemFormData) => Promise<void>
  initial?: Partial<ItemFormData>
  title: string
  showResult?: boolean
}

const empty: ItemFormData = {
  title: '',
  summary: '',
  url: '#contact',
  image: '',
  tags: '',
  result: '',
  active: true,
  order: 0,
}

export default function ItemFormModal({
  open,
  onClose,
  onSave,
  initial,
  title,
  showResult = false,
}: ItemFormModalProps) {
  const [form, setForm] = useState<ItemFormData>({ ...empty })
  const [saving, setSaving] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [preview, setPreview] = useState<string>('')
  const [imgSize, setImgSize] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      const merged = { ...empty, ...initial }
      setForm(merged)
      setPreview(merged.image || '')
      setImgSize('')
    }
  }, [open, initial])

  if (!open) return null

  const set = (field: keyof ItemFormData, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }))

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCompressing(true)
    try {
      const base64 = await compressImage(file)
      // Show approx size in kB
      const kb = Math.round((base64.length * 3) / 4 / 1024)
      setImgSize(`${kb} kB`)
      set('image', base64)
      setPreview(base64)
    } finally {
      setCompressing(false)
    }
    // Reset input so same file can be reselected
    e.target.value = ''
  }

  const handleUrlChange = (url: string) => {
    set('image', url)
    setPreview(url)
    setImgSize('')
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.summary.trim()) return
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Image */}
          <div>
            <Label className="mb-2 block">Imagen</Label>
            <div
              onClick={() => !compressing && fileRef.current?.click()}
              className={cn(
                'relative flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border transition-colors hover:border-primary',
                preview && 'border-solid border-transparent',
                compressing && 'pointer-events-none'
              )}
            >
              {compressing ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-sm">Comprimiendo imagen…</span>
                </div>
              ) : preview ? (
                <>
                  <img src={preview} alt="preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="w-10 h-10" />
                  <span className="text-sm">Clic para subir imagen</span>
                  <span className="text-xs">Se comprime automáticamente</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {imgSize && (
              <p className="mt-1 text-xs text-green-600 dark:text-green-400 font-medium">
                ✓ Imagen comprimida · {imgSize} almacenados en Firestore
              </p>
            )}

            <p className="mt-1.5 text-xs text-muted-foreground">
              O pega una URL externa directamente
            </p>
            <Input
              className="mt-1.5"
              placeholder="https://images.unsplash.com/..."
              value={preview.startsWith('data:') ? '' : preview}
              onChange={e => handleUrlChange(e.target.value)}
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="item-title" className="mb-1.5 block">Título *</Label>
            <Input
              id="item-title"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Nombre del item"
            />
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="item-summary" className="mb-1.5 block">Descripción *</Label>
            <Textarea
              id="item-summary"
              rows={3}
              value={form.summary}
              onChange={e => set('summary', e.target.value)}
              placeholder="Breve descripción…"
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="item-tags" className="mb-1.5 block">Tags</Label>
            <Input
              id="item-tags"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="React, TypeScript, Firebase (separados por coma)"
            />
          </div>

          {/* Result — projects only */}
          {showResult && (
            <div>
              <Label htmlFor="item-result" className="mb-1.5 block">Resultado / Métrica</Label>
              <Input
                id="item-result"
                value={form.result ?? ''}
                onChange={e => set('result', e.target.value)}
                placeholder="Ej: 78% menos errores · $120K ahorrados"
              />
            </div>
          )}

          {/* URL */}
          <div>
            <Label htmlFor="item-url" className="mb-1.5 block">Enlace del item</Label>
            <Input
              id="item-url"
              value={form.url}
              onChange={e => set('url', e.target.value)}
              placeholder="#contact o https://…"
            />
          </div>

          {/* Order + Active */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="item-order" className="mb-1.5 block">Orden</Label>
              <Input
                id="item-order"
                type="number"
                value={form.order}
                onChange={e => set('order', Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col justify-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => set('active', !form.active)}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-colors',
                    form.active ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                >
                  <div className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
                    form.active ? 'translate-x-6' : 'translate-x-1'
                  )} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {form.active ? 'Activo' : 'Pausado'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={saving || compressing}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || compressing || !form.title.trim()}
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
