import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ItemFormModal, { ItemFormData } from '@/components/admin/ItemFormModal'
import {
  getServices,
  addService,
  updateService,
  deleteService,
  Service,
} from '@/lib/firestore'
import { cn } from '@/lib/utils'

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; item?: Service }>({ open: false })

  const load = async () => {
    setLoading(true)
    setServices(await getServices())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleSave = async (data: ItemFormData) => {
    const base = {
      title: data.title,
      summary: data.summary,
      url: data.url,
      image: data.image,
      tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      active: data.active,
      order: data.order,
    }
    if (modal.item) {
      await updateService(modal.item.id, base, data.imageFile)
    } else {
      await addService({ ...base, imageRef: '' }, data.imageFile)
    }
    await load()
  }

  const toggleActive = async (s: Service) => {
    await updateService(s.id, { active: !s.active })
    await load()
  }

  const handleDelete = async (s: Service) => {
    if (!confirm(`¿Eliminar "${s.title}"?`)) return
    await deleteService(s.id, s.imageRef)
    await load()
  }

  const toFormData = (s: Service): Partial<ItemFormData> => ({
    title: s.title,
    summary: s.summary,
    url: s.url,
    image: s.image,
    tags: s.tags.join(', '),
    active: s.active,
    order: s.order,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Servicios</h2>
          <p className="text-sm text-muted-foreground mt-1">{services.length} items en total</p>
        </div>
        <Button onClick={() => setModal({ open: true })} className="gap-2">
          <Plus className="w-4 h-4" /> Nuevo servicio
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Cargando…</div>
      ) : (
        <div className="space-y-3">
          {services.map(s => (
            <div
              key={s.id}
              className={cn(
                'flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-opacity',
                !s.active && 'opacity-50'
              )}
            >
              <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground truncate">{s.title}</span>
                  <span className={cn(
                    'shrink-0 text-xs px-2 py-0.5 rounded-full font-medium',
                    s.active
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {s.active ? 'Activo' : 'Pausado'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{s.summary}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(s)}
                  title={s.active ? 'Pausar' : 'Activar'}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {s.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setModal({ open: true, item: s })}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No hay servicios. Crea el primero.
            </div>
          )}
        </div>
      )}

      <ItemFormModal
        open={modal.open}
        title={modal.item ? 'Editar servicio' : 'Nuevo servicio'}
        initial={modal.item ? toFormData(modal.item) : undefined}
        onClose={() => setModal({ open: false })}
        onSave={handleSave}
      />
    </div>
  )
}
