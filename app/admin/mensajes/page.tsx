import { createClient } from '@/lib/supabase/server'
import type { MensajeFoster } from '@/lib/types'
import { MarkReadButton } from './MarkReadButton'

export const revalidate = 0

export default async function MensajesFosterPage() {
  const supabase = await createClient()
  const { data: mensajes } = await supabase
    .from('mensajes_foster')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = (mensajes as MensajeFoster[]) ?? []
  const unread = rows.filter(m => !m.leido).length

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Mensajes Foster</h1>
        {unread > 0 && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {unread} nuevo{unread !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-amber-100 p-12 text-center text-gray-400">
          <div className="text-4xl mb-3">💌</div>
          <p>No hay mensajes todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map(m => (
            <div
              key={m.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 space-y-3 transition-colors ${
                !m.leido ? 'border-orange-200 bg-amber-50' : 'border-amber-100'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-amber-900">{m.nombre}</p>
                    {!m.leido && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                    {m.email && (
                      <p className="text-sm text-gray-500">{m.email}</p>
                    )}
                    {m.telefono && (
                      <p className="text-sm text-gray-500">{m.telefono}</p>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {m.mensaje}
              </p>

              {!m.leido && (
                <div className="pt-1">
                  <MarkReadButton id={m.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
