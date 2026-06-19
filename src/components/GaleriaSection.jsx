import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CardFanCarousel from './ui/card-fan-carousel'

import montanha  from '../assets/galeria/montanha.jpg'
import floresta  from '../assets/galeria/floresta.jpg'
import mata      from '../assets/galeria/mata.jpg'
import praia     from '../assets/galeria/praia.jpg'
import porDoSol  from '../assets/galeria/por_do_sol.jpg'
import lago      from '../assets/galeria/lago.jpg'
import vale      from '../assets/galeria/vale.jpg'
import bosque    from '../assets/galeria/bosque.jpg'
import estrelas  from '../assets/galeria/estrelas.jpg'
import rio       from '../assets/galeria/rio.jpg'

const FOTOS = [
  { imgUrl: montanha,  alt: 'Montanha refletida em lago cristalino' },
  { imgUrl: floresta,  alt: 'Floresta envoluta em neblina' },
  { imgUrl: mata,      alt: 'Mata atlântica iluminada pelo sol' },
  { imgUrl: praia,     alt: 'Praia tropical de águas claras' },
  { imgUrl: porDoSol,  alt: 'Pôr do sol dourado sobre a natureza' },
  { imgUrl: lago,      alt: 'Lago sereno ao entardecer' },
  { imgUrl: vale,      alt: 'Vale verde exuberante' },
  { imgUrl: bosque,    alt: 'Bosque com raios de sol filtrando' },
  { imgUrl: estrelas,  alt: 'Montanha sob céu estrelado' },
  { imgUrl: rio,       alt: 'Rio em meio à vegetação nativa' },
]

export default function GaleriaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="galeria" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Galeria — O que defendemos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Um planeta que vale{' '}
            <span className="text-gradient">preservar</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            O descarte irregular ameaça muito mais do que a vizinhança. Cada ação correta protege ecossistemas inteiros.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CardFanCarousel cards={FOTOS} />
        </motion.div>
      </div>
    </section>
  )
}
