import type { Metadata } from 'next'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'

export const metadata: Metadata = {
  title: 'Foster to Adoption',
  description: 'Conoce nuestro programa Foster to Adoption — cuida a un rescatado antes de adoptarlo definitivamente.',
}

const evaluaciones = [
  'Cómo se lleva el perrito con otras mascotas.',
  'Cómo interactúa con niños o adultos del hogar.',
  'Compatibilidad con gatos u otros animales.',
  'Tiempo, rutina y compromiso familiar.',
  'Si realmente están preparados para asumir la responsabilidad de una mascota.',
]

export default function FosterAdoptionPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 via-orange-400 to-orange-500 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🏡</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-sm">
            Foster to Adoption
          </h1>
          <p className="text-orange-100 text-base sm:text-lg max-w-xl mx-auto">
            Una semana para conocer, evaluar y decidir con responsabilidad.
          </p>
        </div>
      </section>

      {/* Qué es */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">

        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-10 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl font-bold text-amber-900">¿Qué es Foster to Adoption?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            El programa <strong className="text-orange-600">Foster to Adoption</strong> fue creado para
            ayudar a las familias a tomar una decisión responsable y segura antes de adoptar.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Este proceso permite que la persona o familia cuide del perrito por{' '}
            <strong>aproximadamente una semana</strong> mientras evalúan si pueden asumir la
            responsabilidad de una adopción permanente.
          </p>
        </div>

        {/* Lo que puedes evaluar */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">✅</span>
            <h2 className="text-xl font-bold text-amber-900">Algunas familias desean evaluar:</h2>
          </div>
          <ul className="space-y-3">
            {evaluaciones.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-0.5 flex-shrink-0">🐾</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* También aplica para */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <h3 className="text-lg font-bold text-amber-800">¿Primera vez con una mascota?</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            También ayuda a familias que <strong>nunca antes han tenido mascotas</strong> y desean
            experimentar la responsabilidad antes de tomar una decisión definitiva.
          </p>
        </div>

        {/* Enfoque */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💛</span>
            <h3 className="text-lg font-bold text-amber-800">Nuestro enfoque</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Nuestro enfoque siempre será pensar en el <strong>bienestar del animal</strong> y lograr
            adopciones responsables, seguras y conscientes.
          </p>
        </div>
      </section>

      {/* Quote responsabilidad */}
      <section className="bg-amber-900 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg sm:text-xl font-medium text-amber-100 leading-relaxed italic">
            "Adoptar no es un impulso ni una emoción momentánea. Es un compromiso de amor,
            paciencia, cuidados y responsabilidad para toda la vida de la mascota."
          </p>
          <p className="text-amber-400 mt-3 text-2xl">🐾</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-amber-900">¿Listo para conocer a tu compañero?</h3>
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
