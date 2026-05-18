import type { Metadata } from 'next'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'

export const metadata: Metadata = {
  title: 'Ángeles Cuidadores (Foster)',
  description: 'Sé un Ángel Cuidador — abre temporalmente las puertas de tu hogar a un rescatado mientras encuentra familia permanente.',
}

const ofrecemos = [
  'Orientación y apoyo durante todo el proceso de foster.',
  'Coordinación de vacunas, esterilización y preventivos.',
  'Acompañamiento en la preparación del rescatado para adopción.',
  'Trabajo en equipo — nunca estarás solo(a).',
]

export default function AngelesCuidadoresPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">👼</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-sm">
            Ángeles Cuidadores
          </h1>
          <p className="text-yellow-50 text-base sm:text-lg max-w-xl mx-auto">
            Personas que abren temporalmente las puertas de su hogar para cambiar una vida.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">

        {/* Qué son */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐾</span>
            <h2 className="text-2xl font-bold text-amber-900">¿Qué son los Ángeles Cuidadores?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Los <strong className="text-orange-600">Ángeles Cuidadores (Foster)</strong> son personas
            que abren temporalmente las puertas de su hogar para brindarle amor, seguridad y cuidados
            a un animal rescatado <strong>mientras encuentra una familia permanente</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ser foster <strong>salva vidas</strong>, ya que nos permite seguir ayudando a más
            animalitos aun con espacios limitados. Muchos de nuestros rescatados necesitan tiempo para:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              'Recuperarse física y emocionalmente.',
              'Socializar con personas y otros animales.',
              'Aprender a confiar nuevamente.',
              'Prepararse para una adopción definitiva.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-400 flex-shrink-0 mt-0.5">🐾</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Qué ofrecemos */}
        <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🤝</span>
            <h2 className="text-xl font-bold text-amber-900">¿Qué ofrecemos?</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Nosotros orientamos durante el proceso y trabajamos en equipo:
          </p>
          <ul className="space-y-3">
            {ofrecemos.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Importante */}
        <div className="bg-amber-50 rounded-2xl border-l-4 border-amber-400 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">💛</span>
            <h3 className="font-bold text-amber-800 text-lg">Importante comprender</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Cada animal tiene procesos diferentes. Algunos consiguen hogar rápidamente, mientras
            otros pueden tardar más tiempo en recuperarse o encontrar la familia correcta.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Por eso, ser foster requiere <strong>paciencia, empatía y compromiso</strong>, sin presión
            ni prisa, siempre pensando en el bienestar del animal.
          </p>
        </div>

        {/* Mensaje final */}
        <div className="bg-amber-900 rounded-2xl p-6 sm:p-10 text-center">
          <div className="text-4xl mb-4">🐾</div>
          <p className="text-lg sm:text-xl font-medium text-amber-100 leading-relaxed italic">
            "Ser foster no significa quedarte con la mascota para siempre…
            significa ser parte de su segunda oportunidad."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-amber-900">¿Quieres ser un Ángel Cuidador?</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Contáctanos para conocer más sobre el proceso y cómo puedes ayudar.
        </p>
        <a
          href="mailto:giancarlovf2000@gmail.com"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
        >
          Quiero ser Foster 🐾
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
