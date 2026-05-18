'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const links = [
  { href: '/admin/dashboard', label: 'Inicio', icon: '🏠' },
  { href: '/admin/perros', label: 'Perros', icon: '🐾' },
  { href: '/admin/solicitudes', label: 'Solicitudes', icon: '📋' },
  { href: '/admin/mensajes', label: 'Mensajes Foster', icon: '💌' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <ul className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-amber-700 text-white font-medium'
                  : 'text-amber-200 hover:bg-amber-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-amber-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-amber-200 hover:bg-amber-800 hover:text-white transition-colors"
        >
          <span className="text-lg">🚪</span>
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex bg-amber-900 text-white min-h-screen w-56 flex-col flex-shrink-0">
        <div className="p-6 border-b border-amber-800">
          <p className="text-xs text-amber-300 uppercase tracking-wider">Panel Admin</p>
          <h2 className="font-bold text-lg leading-tight mt-1">Un Final Feliz</h2>
        </div>
        <NavLinks />
      </nav>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-amber-900 text-white h-14 flex items-center justify-between px-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span>🐾</span>
          <span className="font-bold text-sm">Un Final Feliz — Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="p-2 rounded-lg hover:bg-amber-800 transition-colors"
          aria-label="Abrir menú"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-amber-900 text-white flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-amber-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-300 uppercase tracking-wider">Panel Admin</p>
            <h2 className="font-bold text-lg leading-tight mt-1">Un Final Feliz</h2>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-amber-800 text-amber-300 text-xl"
          >
            ✕
          </button>
        </div>
        <NavLinks onLinkClick={() => setMobileOpen(false)} />
      </div>
    </>
  )
}
