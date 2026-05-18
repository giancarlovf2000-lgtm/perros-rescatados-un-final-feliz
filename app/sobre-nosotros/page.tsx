import type { Metadata } from 'next'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce la misión y el equipo detrás de Perros Rescatados — Un Final Feliz.',
}

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-sm">
            Sobre Nosotros
          </h1>
          <p className="text-orange-100 text-base sm:text-lg italic">
            "Rescatamos, curamos y preparamos vidas para un verdadero Final Feliz." 🐾
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧡</span>
            <h2 className="text-2xl font-bold text-amber-900">Un Final Feliz</h2>
          </div>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            En <strong className="text-orange-600">Un Final Feliz</strong> creemos que cada vida merece una segunda oportunidad.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Nuestra misión es rescatar, curar, preparar y dar en adopción responsable a perritos y
            gatitos que alguna vez estuvieron desamparados, abandonados o en peligro.
          </p>

          <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-orange-400">
            <p className="text-gray-700 leading-relaxed">
              No somos un refugio. Somos <strong>rescatistas independientes</strong> que trabajan con
              espacios limitados, tiempo limitado y recursos que muchas veces salen de nuestro propio
              bolsillo. Aun así, seguimos esforzándonos cada día para cambiar la vida de aquellos que
              no tienen voz para pedir ayuda.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Cada rescate requiere alimentación, cuidados, medicamentos, vacunas, esterilizaciones,
            transportación, tiempo, amor y compromiso. Por eso trabajamos cuidadosamente cada caso,
            enfocándonos en brindarles <strong>protección, recuperación</strong> y la oportunidad de
            encontrar una familia verdaderamente responsable.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Aunque sabemos que aún hay muchos animalitos en las calles, rescatamos según nuestra
            capacidad para poder ofrecerles una <strong>ayuda real y segura</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Nuestra labor no es solo salvar vidas… también es <strong>educar, orientar y crear
            conciencia</strong> sobre la importancia de la responsabilidad, la empatía y el respeto
            hacia los animales.
          </p>
        </div>
      </section>

      {/* Quote adopción */}
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

      {/* Responsabilidad */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-amber-900 rounded-2xl p-6 sm:p-10 text-center">
          <div className="text-4xl mb-4">💛</div>
          <p className="text-lg sm:text-xl font-medium text-amber-100 leading-relaxed italic">
            "Adoptar no es un impulso ni una emoción momentánea. Es un compromiso de amor,
            paciencia, cuidados y responsabilidad para toda la vida de la mascota."
          </p>
          <p className="text-amber-300 mt-3 text-xl">🐾</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <a
          href="/#perros"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
        >
          Ver perros disponibles
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
