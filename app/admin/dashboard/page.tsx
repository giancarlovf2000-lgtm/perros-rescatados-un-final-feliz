import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: totalPerros }, { count: disponibles }, { count: solicitudes }, { count: pendientes }] =
    await Promise.all([
      supabase.from('perros').select('*', { count: 'exact', head: true }),
      supabase.from('perros').select('*', { count: 'exact', head: true }).eq('disponible', true),
      supabase.from('solicitudes').select('*', { count: 'exact', head: true }),
      supabase.from('solicitudes').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
    ])

  const stats = [
    { label: 'Total perros', value: totalPerros ?? 0, icon: '🐾', href: '/admin/perros' },
    { label: 'Disponibles', value: disponibles ?? 0, icon: '✅', href: '/admin/perros' },
    { label: 'Solicitudes', value: solicitudes ?? 0, icon: '📋', href: '/admin/solicitudes' },
    { label: 'Pendientes', value: pendientes ?? 0, icon: '⏳', href: '/admin/solicitudes' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
        <p className="text-gray-500 mt-1">Bienvenido, aquí puedes gestionar todo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/perros/nuevo"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <span>+</span> Añadir perro
        </Link>
        <Link
          href="/admin/solicitudes"
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-200 transition-colors"
        >
          Ver solicitudes
        </Link>
      </div>
    </div>
  )
}
