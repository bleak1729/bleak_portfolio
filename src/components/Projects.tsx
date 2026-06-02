import { Gallery6 } from '@/components/blocks/gallery6'

const projectItems = [
  {
    id: 'inv',
    title: 'App de Gestión de Inventario',
    summary:
      'Power App canvas sobre Dataverse para controlar stock en múltiples almacenes con escaneo de código de barras, alertas de bajo stock y sincronización con SAP.',
    url: '#',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Dataverse', 'Power Automate', 'SAP'],
    result:
      'Reducción del 78% en reconciliación de stock · $120K/año en mermas eliminadas',
  },
  {
    id: 'po',
    title: 'Sistema de Órdenes de Compra',
    summary:
      'App model-driven con aprobaciones multinivel, validación presupuestal contra SQL Server y generación automática de documentos de OC.',
    url: '#',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    tags: ['Model-Driven Apps', 'SQL Server', 'Power Automate', 'SharePoint'],
    result:
      'Ciclo de OC de 6 días → menos de 18 horas en 14 unidades de negocio',
  },
  {
    id: 'perf',
    title: 'Plataforma de Evaluación de Desempeño',
    summary:
      'Plataforma de evaluaciones 360° con scoring calibrado, dashboards para líderes y analítica de talento en Power BI para Recursos Humanos.',
    url: '#',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Power BI', 'Azure SQL', 'SharePoint'],
    result:
      '96% de evaluaciones completadas · 40+ candidatos a promoción detectados',
  },
  {
    id: 'ai',
    title: 'Asistente de Conocimiento con IA',
    summary:
      'Asistente RAG sobre Azure OpenAI indexado en políticas, SOPs y tickets — embebido en Teams para respuestas instantáneas y verificables.',
    url: '#',
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80',
    tags: ['Azure OpenAI', 'Python', 'Azure AI Search', 'Power Platform'],
    result:
      '62% de tickets desviados · ~3,200 horas ahorradas en el primer trimestre',
  },
]

export default function Projects() {
  return (
    <Gallery6
      heading="Resultados seleccionados con clientes"
      demoUrl="#contact"
      sectionId="projects"
      sectionLabel="Proyectos Destacados"
      items={projectItems}
    />
  )
}
