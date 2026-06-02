import { useEffect, useState } from 'react'
import { Trash2, Mail, MailOpen, ChevronDown, ChevronUp } from 'lucide-react'
import {
  getMessages,
  markMessageRead,
  deleteMessage,
  Message,
} from '@/lib/firestore'
import { cn } from '@/lib/utils'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setMessages(await getMessages())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleExpand = async (m: Message) => {
    if (expanded === m.id) {
      setExpanded(null)
      return
    }
    setExpanded(m.id)
    if (!m.read) {
      await markMessageRead(m.id, true)
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, read: true } : x))
    }
  }

  const handleDelete = async (m: Message) => {
    if (!confirm('¿Eliminar este mensaje?')) return
    await deleteMessage(m.id)
    setMessages(prev => prev.filter(x => x.id !== m.id))
  }

  const formatDate = (ts: Message['createdAt']) => {
    if (!ts) return ''
    const d = ts.toDate()
    return d.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Mensajes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {messages.length} mensajes · <span className="text-primary font-medium">{unread} sin leer</span>
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Cargando…</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No hay mensajes aún.</div>
      ) : (
        <div className="space-y-2">
          {messages.map(m => (
            <div
              key={m.id}
              className={cn(
                'rounded-xl border border-border bg-card overflow-hidden transition-all',
                !m.read && 'border-primary/30 bg-primary/5 dark:bg-primary/10'
              )}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => handleExpand(m)}
              >
                <div className={cn(
                  'shrink-0 w-9 h-9 rounded-full flex items-center justify-center',
                  m.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                )}>
                  {m.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('font-semibold text-foreground', !m.read && 'text-primary')}>
                      {m.firstName} {m.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{m.email}</span>
                    {!m.read && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    <span className="font-medium text-foreground">{m.subject}</span>
                    {' — '}
                    {m.message}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {formatDate(m.createdAt)}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(m) }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expanded === m.id
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  }
                </div>
              </div>

              {/* Expanded message */}
              {expanded === m.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3 sm:grid-cols-4">
                    <div><span className="font-medium text-foreground block">Nombre</span>{m.firstName} {m.lastName}</div>
                    <div><span className="font-medium text-foreground block">Email</span>{m.email}</div>
                    <div><span className="font-medium text-foreground block">Asunto</span>{m.subject}</div>
                    <div><span className="font-medium text-foreground block">Fecha</span>{formatDate(m.createdAt)}</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {m.message}
                  </div>
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" /> Responder por email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
