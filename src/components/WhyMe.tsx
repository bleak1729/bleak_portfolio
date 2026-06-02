import { Feature72 } from '@/components/ui/feature-72'

const whyMeFeatures = [
  {
    id: 'negocio',
    title: 'Soluciones enfocadas al negocio',
    description:
      'Cada proyecto inicia con resultados medibles — tiempo de ciclo, costo, adopción — no solo features.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'automatizacion',
    title: 'Experiencia en automatización',
    description:
      'Años entregando automatizaciones con Power Platform e integraciones SAP en entornos regulados.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'datos',
    title: 'Decisiones basadas en datos',
    description:
      'Dominio de SQL y Power BI: las métricas correctas quedan integradas desde el día uno.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura escalable',
    description:
      'Diseños que crecen contigo: Dataverse gobernado, Azure seguro y separación de responsabilidades clara.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  },
]

export default function WhyMe() {
  return (
    <Feature72
      sectionLabel="Por qué trabajar conmigo"
      heading="Un consultor que codifica, entrega y responde por el resultado"
      description="La combinación de profundidad técnica y visión de negocio que convierte la automatización en ROI sostenido."
      sectionId="whyme"
      linkUrl="#contact"
      linkText="Agendar llamada"
      features={whyMeFeatures}
    />
  )
}
