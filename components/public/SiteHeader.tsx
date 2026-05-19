'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/#perros', label: 'Adoptar', anchor: true },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/foster-adoption', label: 'Foster to Adoption' },
  { href: '/angeles-cuidadores', label: 'Ángeles Cuidadores' },
  { href: '/#contacto', label: 'Contacto', anchor: true },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    !href.includes('#') && pathname === href

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="Un Final Feliz" width={36} height={36} className="rounded-full flex-shrink-0" />
            <div>
              <span className="font-bold text-orange-600 text-sm sm:text-base leading-tight block">Perros Rescatados</span>
              <span className="text-xs text-amber-700 leading-tight block">Un Final Feliz</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-orange-600 font-semibold bg-orange-50'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Abrir menú"
          >
            <div className="w-5 h-0.5 bg-gray-700 mb-1.5" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1.5" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Un Final Feliz" width={36} height={36} className="rounded-full flex-shrink-0" />
            <div>
              <p className="font-bold text-orange-600 text-sm leading-tight">Perros Rescatados</p>
              <p className="text-xs text-amber-700 leading-tight">Un Final Feliz</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 text-lg"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                isActive(link.href)
                  ? 'bg-orange-50 text-orange-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 italic">
            "Rescatamos, curamos y preparamos vidas<br />para un verdadero Final Feliz." 🐾
          </p>
        </div>
      </div>
    </>
  )
}
