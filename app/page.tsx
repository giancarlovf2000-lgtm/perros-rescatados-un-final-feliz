import { createClient } from '@/lib/supabase/server'
import { DogGrid } from '@/components/public/DogGrid'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import type { Perro } from '@/lib/types'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()
  const { data: perros } = await supabase
    .from('perros')
    .select('*')
    .eq('disponible', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-amber-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 py-14 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl sm:text-6xl mb-4">🐾</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-sm mb-4 leading-tight">
            Dales el hogar<br />que merecen
          </h1>
          <p className="text-base sm:text-lg text-orange-50 mb-3 max-w-xl mx-auto leading-relaxed">
            Cada perro rescatado sueña con una familia que lo ame.
            Encuentra a tu compañero ideal y dale su <strong>final feliz</strong>.
          </p>
          <p className="text-sm text-orange-100 italic mb-8 opacity-90">
            "Rescatamos, curamos y preparamos vidas para un verdadero Final Feliz." 🐾
          </p>
          <a
            href="#perros"
            className="inline-block bg-white text-orange-600 font-bold px-6 sm:px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all text-base sm:text-lg"
          >
            Ver perros disponibles
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-6 sm:py-8 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 sm:gap-24">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-500">{perros?.length ?? 0}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-500">100%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Rescatados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-500">🐾</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Con amor</p>
          </div>
        </div>
      </section>

      {/* Dogs Grid */}
      <section id="perros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">Perros en adopción</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-10">
          Toca en <strong>"¡Adóptame!"</strong> para enviar tu solicitud de adopción.
        </p>
        <DogGrid perros={(perros as Perro[]) ?? []} />
      </section>

      {/* Adoption quote */}
      <section className="bg-orange-500 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg sm:text-xl font-medium text-white leading-relaxed italic">
            "Adoptar es darle a un animal abandonado la oportunidad de volver a confiar,
            amar y tener un hogar lleno de cariño. No cambias solo una vida…
            ambos se rescatan mutuamente."
          </p>
          <p className="text-orange-200 mt-3 text-2xl">🐾</p>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="bg-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-8 sm:mb-10">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '🔍', step: '1. Explora', desc: 'Conoce a todos nuestros perros disponibles para adopción.' },
              { icon: '📝', step: '2. Solicita', desc: 'Llena el formulario de adopción del perro que te conquistó.' },
              { icon: '🏠', step: '3. Adopta', desc: 'Nos ponemos en contacto y coordinamos la adopción.' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center p-4">
                <div className="text-4xl sm:text-5xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-base sm:text-lg text-amber-800 mb-2">{item.step}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
