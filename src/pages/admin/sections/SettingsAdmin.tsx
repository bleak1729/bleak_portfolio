import { useEffect, useState } from 'react'
import { Save, CheckCircle, Database, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSettings, saveSettings, SiteSettings } from '@/lib/firestore'
import { seedInitialData } from '@/lib/seed'

export default function SettingsAdmin() {
  const [form, setForm] = useState<SiteSettings>({ email: '', linkedin: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<string>('')

  useEffect(() => {
    getSettings().then(s => {
      setForm(s)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await saveSettings(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSeed = async () => {
    if (!confirm('¿Cargar los datos iniciales en Firestore? Solo se insertan si las colecciones están vacías.')) return
    setSeeding(true)
    setSeedResult('')
    try {
      const { seeded, skipped } = await seedInitialData()
      const parts = []
      if (seeded.length) parts.push(`✅ Cargado: ${seeded.join(', ')}`)
      if (skipped.length) parts.push(`⏭ Ya tenía datos: ${skipped.join(', ')}`)
      setSeedResult(parts.join(' · '))
    } catch (e: unknown) {
      setSeedResult(`❌ Error: ${e instanceof Error ? e.message : 'desconocido'}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Datos de contacto y herramientas de base de datos
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Cargando…</div>
      ) : (
        <div className="max-w-lg space-y-6">
          {/* Contact settings */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <h3 className="font-semibold text-foreground">Datos de contacto</h3>

            <div>
              <Label htmlFor="settings-email" className="mb-1.5 block">Email de la empresa</Label>
              <Input
                id="settings-email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="hola@tuempresa.com"
              />
            </div>

            <div>
              <Label htmlFor="settings-linkedin" className="mb-1.5 block">URL de LinkedIn</Label>
              <Input
                id="settings-linkedin"
                value={form.linkedin}
                onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/tu-usuario"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 min-w-[140px]"
          >
            {saved
              ? <><CheckCircle className="w-4 h-4" /> Guardado</>
              : <><Save className="w-4 h-4" /> {saving ? 'Guardando…' : 'Guardar cambios'}</>
            }
          </Button>

          {/* Seed section */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Datos iniciales</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Carga los proyectos y servicios de ejemplo en Firestore.
                Solo se insertan si la colección está vacía — no duplica datos.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleSeed}
              disabled={seeding}
              className="gap-2"
            >
              {seeding
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Cargando…</>
                : <><Database className="w-4 h-4" /> Cargar datos iniciales</>
              }
            </Button>

            {seedResult && (
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                {seedResult}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
