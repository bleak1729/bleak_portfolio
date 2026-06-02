import { useEffect, useState } from 'react'
import { Gallery6 } from '@/components/blocks/gallery6'
import { getServices, Service } from '@/lib/firestore'

export default function Services() {
  const [items, setItems] = useState<Service[]>([])

  useEffect(() => {
    getServices()
      .then(data => setItems(data.filter(s => s.active)))
      .catch(console.error)
  }, [])

  return (
    <div className="bg-muted/40 dark:bg-slate-800/30">
      <Gallery6
        heading="Lo que construyo"
        demoUrl="#contact"
        items={items}
        sectionId="services"
        sectionLabel="Servicios"
        ctaLabel="Agendar consulta"
      />
    </div>
  )
}
