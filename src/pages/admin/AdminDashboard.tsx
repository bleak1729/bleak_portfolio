import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FolderKanban,
  Wrench,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'
import ProjectsAdmin from './sections/ProjectsAdmin'
import ServicesAdmin from './sections/ServicesAdmin'
import MessagesAdmin from './sections/MessagesAdmin'
import SettingsAdmin from './sections/SettingsAdmin'

type Tab = 'projects' | 'services' | 'messages' | 'settings'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'projects',  label: 'Proyectos',     icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'services',  label: 'Servicios',      icon: <Wrench className="w-4 h-4" /> },
  { id: 'messages',  label: 'Mensajes',       icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'settings',  label: 'Configuración',  icon: <Settings className="w-4 h-4" /> },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin')
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-border bg-card transition-transform duration-200',
        'md:relative md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Logo />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4 border-t border-border">
          <div className="px-3 mb-3">
            <p className="text-xs text-muted-foreground font-medium">Sesión activa</p>
            <p className="text-sm text-foreground truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-foreground">
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'projects'  && <ProjectsAdmin />}
          {activeTab === 'services'  && <ServicesAdmin />}
          {activeTab === 'messages'  && <MessagesAdmin />}
          {activeTab === 'settings'  && <SettingsAdmin />}
        </main>
      </div>
    </div>
  )
}
