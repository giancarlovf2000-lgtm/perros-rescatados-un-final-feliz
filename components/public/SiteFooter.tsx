import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-amber-900 text-amber-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🐾</span>
              <div>
                <p className="font-bold text-white text-base leading-tight">Perros Rescatados</p>
                <p className="text-xs text-amber-300 leading-tight">Un Final Feliz</p>
              </div>
            </div>
            <p className="text-xs text-amber-300 italic leading-relaxed mt-3">
              "Rescatamos, curamos y preparamos vidas<br />para un verdadero Final Feliz." 🐾
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-3">Páginas</p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
                { href: '/foster-adoption', label: 'Foster to Adoption' },
                { href: '/angeles-cuidadores', label: 'Ángeles Cuidadores' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-amber-200 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-3">Nuestra Misión</p>
            <p className="text-sm text-amber-200 leading-relaxed">
              Rescatar, curar, preparar y dar en adopción responsable a perritos que alguna vez estuvieron desamparados.
            </p>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          <p className="text-xs text-amber-400">© {new Date().getFullYear()} Un Final Feliz · Todos los derechos reservados</p>
          <p className="text-xs text-amber-500">Hecho con ❤️ para los rescatados</p>
        </div>
      </div>
    </footer>
  )
}
