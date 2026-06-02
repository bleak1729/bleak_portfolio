import { Gallery6 } from '@/components/blocks/gallery6'

const serviceItems = [
  {
    id: 'powerapps',
    title: 'Desarrollo de Power Apps',
    summary:
      'Aplicaciones canvas y model-driven a medida que reemplazan hojas de cálculo, herramientas legadas y procesos manuales con experiencias intuitivas basadas en roles.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Canvas', 'Model-Driven', 'Dataverse'],
  },
  {
    id: 'automate',
    title: 'Flujos de Power Automate',
    summary:
      'Automatización integral en Microsoft 365, Dataverse, SharePoint, SAP y APIs de terceros — desde aprobaciones hasta generación de documentos.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Automate', 'Microsoft 365', 'SharePoint', 'SAP'],
  },
  {
    id: 'sql',
    title: 'SQL y Soluciones de Datos',
    summary:
      'Diseño robusto de SQL Server, tuning de rendimiento, pipelines ETL y dashboards en Power BI que convierten datos en decisiones operativas.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    tags: ['SQL Server', 'Power BI', 'ETL', 'Azure SQL'],
  },
  {
    id: 'ai',
    title: 'Soluciones de IA',
    summary:
      'Copilotos con Azure OpenAI, asistentes de conocimiento RAG y procesamiento inteligente de documentos integrados a tus aplicaciones de negocio.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80',
    tags: ['Azure OpenAI', 'RAG', 'Copilot', 'Python'],
  },
  {
    id: 'bpa',
    title: 'Automatización de Procesos',
    summary:
      'Descubrimiento, rediseño y automatización de procesos interdepartamentales — reduciendo esfuerzo manual y acelerando tiempos de ciclo.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    tags: ['BPA', 'Power Platform', 'Integración SAP', 'RPA'],
  },
  {
    id: 'web',
    title: 'Desarrollo Web',
    summary:
      'Sitios corporativos, landing pages y portales de alto rendimiento con React y Next.js — diseño moderno, SEO técnico y despliegue en la nube.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'saas',
    title: 'Productos SaaS',
    summary:
      'Desarrollo end-to-end de productos SaaS: arquitectura multi-tenant, autenticación, billing, panel de administración y API — desde cero hasta producción.',
    url: '#contact',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    tags: ['SaaS', 'Next.js', 'Azure', 'Stripe'],
  },
]

export default function Services() {
  return (
    <div className="bg-muted/40 dark:bg-slate-800/30">
      <Gallery6
        heading="Lo que construyo"
        demoUrl="#contact"
        items={serviceItems}
        sectionId="services"
        sectionLabel="Servicios"
        ctaLabel="Agendar consulta"
      />
    </div>
  )
}
