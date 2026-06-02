import { useEffect, useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSettings, saveSettings, SiteSettings } from '@/lib/firestore'

export default function SettingsAdmin() {
  const [form, setForm] = useState<SiteSettings>({ email: '', linkedin: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Datos de contacto visibles en el portfolio
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Cargando…</div>
      ) : (
        <div className="max-w-lg space-y-6">
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
        </div>
      )}
    </div>
  )
}
