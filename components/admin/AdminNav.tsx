'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const links = [
  { href: '/admin/dashboard', label: 'Inicio', icon: '🏠' },
  { href: '/admin/perros', label: 'Perros', icon: '🐾' },
  { href: '/admin/solicitudes', label: 'Solicitudes', icon: '📋' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="bg-amber-900 text-white min-h-screen w-56 flex flex-col">
      <div className="p-6 border-b border-amber-800">
        <p className="text-xs text-amber-300 uppercase tracking-wider">Panel Admin</p>
        <h2 className="font-bold text-lg leading-tight mt-1">Un Final Feliz</h2>
      </div>

      <ul className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-amber-700 text-white font-medium'
                  : 'text-amber-200 hover:bg-amber-800 hover:text-white'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-amber-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-amber-200 hover:bg-amber-800 hover:text-white transition-colors"
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
