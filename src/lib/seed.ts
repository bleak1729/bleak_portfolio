import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const projects = [
  {
    title: 'App de Gestión de Inventario',
    summary: 'Power App canvas sobre Dataverse para controlar stock en múltiples almacenes con escaneo de código de barras, alertas de bajo stock y sincronización con SAP.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Dataverse', 'Power Automate', 'SAP'],
    result: 'Reducción del 78% en reconciliación de stock · $120K/año en mermas eliminadas',
    active: true, order: 0,
  },
  {
    title: 'Sistema de Órdenes de Compra',
    summary: 'App model-driven con aprobaciones multinivel, validación presupuestal contra SQL Server y generación automática de documentos de OC.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    tags: ['Model-Driven Apps', 'SQL Server', 'Power Automate', 'SharePoint'],
    result: 'Ciclo de OC de 6 días → menos de 18 horas en 14 unidades de negocio',
    active: true, order: 1,
  },
  {
    title: 'Plataforma de Evaluación de Desempeño',
    summary: 'Plataforma de evaluaciones 360° con scoring calibrado, dashboards para líderes y analítica de talento en Power BI para Recursos Humanos.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Power BI', 'Azure SQL', 'SharePoint'],
    result: '96% de evaluaciones completadas · 40+ candidatos a promoción detectados',
    active: true, order: 2,
  },
  {
    title: 'Asistente de Conocimiento con IA',
    summary: 'Asistente RAG sobre Azure OpenAI indexado en políticas, SOPs y tickets — embebido en Teams para respuestas instantáneas y verificables.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80',
    tags: ['Azure OpenAI', 'Python', 'Azure AI Search', 'Power Platform'],
    result: '62% de tickets desviados · ~3,200 horas ahorradas en el primer trimestre',
    active: true, order: 3,
  },
]

const services = [
  {
    title: 'Desarrollo de Power Apps',
    summary: 'Aplicaciones canvas y model-driven a medida que reemplazan hojas de cálculo, herramientas legadas y procesos manuales con experiencias intuitivas basadas en roles.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Apps', 'Canvas', 'Model-Driven', 'Dataverse'],
    active: true, order: 0,
  },
  {
    title: 'Flujos de Power Automate',
    summary: 'Automatización integral en Microsoft 365, Dataverse, SharePoint, SAP y APIs de terceros — desde aprobaciones hasta generación de documentos.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    tags: ['Power Automate', 'Microsoft 365', 'SharePoint', 'SAP'],
    active: true, order: 1,
  },
  {
    title: 'SQL y Soluciones de Datos',
    summary: 'Diseño robusto de SQL Server, tuning de rendimiento, pipelines ETL y dashboards en Power BI que convierten datos en decisiones operativas.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    tags: ['SQL Server', 'Power BI', 'ETL', 'Azure SQL'],
    active: true, order: 2,
  },
  {
    title: 'Soluciones de IA',
    summary: 'Copilotos con Azure OpenAI, asistentes de conocimiento RAG y procesamiento inteligente de documentos integrados a tus aplicaciones de negocio.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80',
    tags: ['Azure OpenAI', 'RAG', 'Copilot', 'Python'],
    active: true, order: 3,
  },
  {
    title: 'Automatización de Procesos',
    summary: 'Descubrimiento, rediseño y automatización de procesos interdepartamentales — reduciendo esfuerzo manual y acelerando tiempos de ciclo.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    tags: ['BPA', 'Power Platform', 'Integración SAP', 'RPA'],
    active: true, order: 4,
  },
  {
    title: 'Desarrollo Web',
    summary: 'Sitios corporativos, landing pages y portales de alto rendimiento con React y Next.js — diseño moderno, SEO técnico y despliegue en la nube.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    active: true, order: 5,
  },
  {
    title: 'Productos SaaS',
    summary: 'Desarrollo end-to-end de productos SaaS: arquitectura multi-tenant, autenticación, billing, panel de administración y API — desde cero hasta producción.',
    url: '#contact',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    tags: ['SaaS', 'Next.js', 'Azure', 'Stripe'],
    active: true, order: 6,
  },
]

export async function seedInitialData(): Promise<{ seeded: string[]; skipped: string[] }> {
  const seeded: string[] = []
  const skipped: string[] = []

  for (const [colName, items] of [['projects', projects], ['services', services]] as const) {
    const snap = await getDocs(collection(db, colName))
    if (!snap.empty) {
      skipped.push(colName)
      continue
    }
    for (const item of items) {
      const payload = colName === 'projects'
        ? { ...item, createdAt: serverTimestamp() }
        : item
      await addDoc(collection(db, colName), payload)
    }
    seeded.push(colName)
  }

  return { seeded, skipped }
}
