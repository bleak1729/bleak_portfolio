import IntegrationsSection from '@/components/ui/integrations-section'

// Logos: Wikipedia Commons for Microsoft brands, devicons for tech, simpleicons for SAP
const stackTools = [
  {
    name: 'Power Apps',
    logo: '/icon-powerapps.svg',
  },
  {
    name: 'Power Automate',
    logo: '/icon-powerautomate.svg',
  },
  {
    name: 'Dataverse',
    logo: '/icon-dataverse.svg',
  },
  {
    name: 'Power BI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
  },
  {
    name: 'SQL Server',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
  {
    name: 'Azure',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  },
  {
    name: 'Azure OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  },
  {
    name: 'SharePoint',
    logo: '/icon-sharepoint.svg',
  },
  {
    name: 'SAP',
    logo: 'https://cdn.simpleicons.org/sap',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
]

export default function Stack() {
  return (
    <IntegrationsSection
      sectionLabel="Stack Tecnológico"
      heading="Herramientas con las que entrego cada día"
      description="Un stack pragmático centrado en Microsoft y React, extendido con Python e IA donde aportan valor real."
      primaryLink="#projects"
      primaryText="Ver Proyectos"
      secondaryLink="#contact"
      secondaryText="Agendar consulta →"
      tools={stackTools}
    />
  )
}
