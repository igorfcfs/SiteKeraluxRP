import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PhotoGallery from './ui/photo-gallery'

import quatis_calcada    from '../assets/galeria/quatis_calcada.jpg'
import entulho_portaria  from '../assets/galeria/entulho_portaria.jpg'
import quati_cacamba     from '../assets/galeria/quati_cacamba.jpg'
import lixao_rua         from '../assets/galeria/lixao_rua.jpg'
import entulho_calcada   from '../assets/galeria/entulho_calcada.jpg'
import colchao_avenida   from '../assets/galeria/colchao_avenida.jpg'
import mata_abandono     from '../assets/galeria/mata_abandono.jpg'
import entulho_avenida   from '../assets/galeria/entulho_avenida.jpg'
import lixo_misturado    from '../assets/galeria/lixo_misturado.jpg'
import sacas_muro        from '../assets/galeria/sacas_muro.jpg'
import cacambas_quati    from '../assets/galeria/cacambas_quati.jpg'
import cacambas_cheias   from '../assets/galeria/cacambas_cheias.jpg'
import quati_lixo        from '../assets/galeria/quati_lixo.jpg'
import pilha_lixo        from '../assets/galeria/pilha_lixo.jpg'
import descarte_rua      from '../assets/galeria/descarte_rua.jpg'
import ponto_viciado     from '../assets/galeria/ponto_viciado.jpg'
import placa_proibido    from '../assets/galeria/placa_proibido.jpg'
import placa_bancas      from '../assets/galeria/placa_bancas.jpg'
import descarte_moveis   from '../assets/galeria/descarte_moveis.jpg'
import entulho_grafite   from '../assets/galeria/entulho_grafite.jpg'
import pracinha          from '../assets/galeria/pracinha.jpg'
import encosta_lixo      from '../assets/galeria/encosta_lixo.jpg'

const FOTOS = [
  { imgUrl: cacambas_quati,   alt: 'Quatis sobre caçambas lotadas na rua Arlindo Béttio' },
  { imgUrl: cacambas_cheias,  alt: 'Caçambas transbordando com lixo espalhado no chão' },
  { imgUrl: quati_lixo,       alt: 'Quati vasculhando lixo no topo da caçamba' },
  { imgUrl: quati_cacamba,    alt: 'Quati dentro da caçamba junto ao entulho' },
  { imgUrl: quatis_calcada,   alt: 'Quatis sobre caçambas, morador de bicicleta ao fundo' },
  { imgUrl: lixao_rua,        alt: 'Ponto viciado com colchões, entulho e caçambas' },
  { imgUrl: entulho_avenida,  alt: 'Entulho e colchões acumulados na calçada da avenida' },
  { imgUrl: colchao_avenida,  alt: 'Colchão descartado na calçada em frente à avenida' },
  { imgUrl: entulho_calcada,  alt: 'Móveis e entulho empilhados na calçada' },
  { imgUrl: lixo_misturado,   alt: 'Lixo doméstico e entulho misturados em grande volume' },
  { imgUrl: pilha_lixo,       alt: 'Pilha de sacos e resíduos transbordando da caçamba' },
  { imgUrl: descarte_rua,     alt: 'Descarte irregular tomando a calçada inteira' },
  { imgUrl: ponto_viciado,    alt: 'Ponto viciado com caçambas e entulho — portaria da EACH ao fundo' },
  { imgUrl: descarte_moveis,  alt: 'Morador jogando móvel sobre a pilha de lixo na rua' },
  { imgUrl: entulho_grafite,  alt: 'Entulho e tijolos em frente ao muro de grafite' },
  { imgUrl: sacas_muro,       alt: 'Sacas de entulho encostadas no muro com pichação' },
  { imgUrl: entulho_portaria, alt: 'Entulho e caçambas em frente à portaria da EACH-USP' },
  { imgUrl: placa_proibido,   alt: 'Placa "Proibido Descarte Irregular — Multa R$ 25.000"' },
  { imgUrl: placa_bancas,     alt: 'Placa de proibição ao lado de bancos da pracinha' },
  { imgUrl: pracinha,         alt: 'Pracinha com bancos coloridos sob as árvores' },
  { imgUrl: mata_abandono,    alt: 'Vegetação com estrutura abandonada ao fundo' },
  { imgUrl: encosta_lixo,     alt: 'Encosta com resíduos e mural artístico ao fundo' },
]

export default function GaleriaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="galeria" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-slate-950 via-slate-200/60 dark:via-slate-900/40 to-slate-50 dark:to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            Galeria — Registros do local
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            A realidade do{' '}
            <span className="text-gradient">Jardim Keralux</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Fotos tiradas no local entre março e junho de 2026. Caçambas transbordando, quatis, entulho na calçada e a placa de multa ignorada — a evidência está nas imagens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PhotoGallery photos={FOTOS} />
        </motion.div>
      </div>
    </section>
  )
}
