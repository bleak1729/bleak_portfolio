import { useEffect, useState } from 'react'
import { Gallery6 } from '@/components/blocks/gallery6'
import { getProjects, Project } from '@/lib/firestore'

export default function Projects() {
  const [items, setItems] = useState<Project[]>([])

  useEffect(() => {
    getProjects()
      .then(data => setItems(data.filter(p => p.active)))
      .catch(console.error)
  }, [])

  return (
    <Gallery6
      heading="Resultados seleccionados con clientes"
      demoUrl="#contact"
      sectionId="projects"
      sectionLabel="Proyectos Destacados"
      items={items}
    />
  )
}
