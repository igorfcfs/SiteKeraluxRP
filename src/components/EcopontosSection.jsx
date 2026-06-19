import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Package, ChevronDown, ChevronUp, Navigation } from 'lucide-react'

const ecopontos = [
  {
    nome: 'Ecoponto Boturussu',
    endereco: 'R. Nélio Batista Guimarães, 174',
    distancia: '≈ 2,6 km',
    distanciaNum: 2.6,
    horario: 'Seg–Sáb 6h–22h · Dom/Feriados 6h–18h',
    aceita: ['Entulho de reformas e construção civil (até 1 m³)', 'Resíduos volumosos (móveis, eletrodomésticos)', 'Materiais recicláveis (papel, vidro, metal, plástico)', 'Óleos vegetais usados'],
    cor: 'cyan',
  },
  {
    nome: 'Ecoponto Jardim São Nicolau',
    endereco: 'R. Agreste de Itabaiana, 590',
    distancia: '≈ 4,7 km',
    distanciaNum: 4.7,
    horario: 'Seg–Sáb 6h–22h · Dom/Feriados 6h–18h',
    aceita: ['Entulho de reformas e construção civil (até 1 m³)', 'Resíduos volumosos (móveis, eletrodomésticos)', 'Materiais recicláveis (papel, vidro, metal, plástico)', 'Materiais de jardinagem e poda'],
    cor: 'violet',
  },
]

function DistanceBar({ value }) {
  const max = 6
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>Aqui</span>
        <span>{value} km</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${value <= 3 ? 'bg-cyan-500' : 'bg-violet-500'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">* Distância em linha reta. O trajeto real por ruas é maior.</p>
    </div>
  )
}

function EcopontoCard({ eco, delay }) {
  const [open, setOpen] = useState(false)
  const colorMap = {
    cyan:   { border: 'border-cyan-500/25',   icon: 'text-cyan-400',   bg: 'bg-cyan-500/10',   badge: 'bg-cyan-500/15 text-cyan-300'   },
    violet: { border: 'border-violet-500/25', icon: 'text-violet-400', bg: 'bg-violet-500/10', badge: 'bg-violet-500/15 text-violet-300' },
  }
  const c = colorMap[eco.cor]
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className={`glass rounded-2xl border ${c.border} overflow-hidden`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${c.badge}`}>
              Gratuito
            </span>
            <h3 className="font-black text-slate-100 text-xl">{eco.nome}</h3>
          </div>
          <div className={`text-3xl font-black ${c.icon} text-right flex-shrink-0`}>
            {eco.distancia}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className={`w-4 h-4 flex-shrink-0 ${c.icon}`} />
            {eco.endereco}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className={`w-4 h-4 flex-shrink-0 ${c.icon}`} />
            {eco.horario}
          </div>
        </div>

        <DistanceBar value={eco.distanciaNum} />
      </div>

      {/* Expandable "O que aceita" */}
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-6 py-3.5 text-sm font-semibold border-t border-white/6 ${c.icon} hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500/40`}
        aria-expanded={open}
        aria-label={`${open ? 'Recolher' : 'Expandir'} lista de materiais aceitos`}
      >
        <span className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          O que aceita
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <ul className="px-6 pb-5 space-y-2 pt-2">
          {eco.aceita.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${eco.cor === 'cyan' ? 'bg-cyan-400' : 'bg-violet-400'}`} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function EcopontosSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="ecopontos" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            03 — Ecopontos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Descarte o entulho <span className="text-gradient">corretamente</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            O Ecoponto é gratuito e o lugar certo para entulho de obras e volumosos. Veja os mais próximos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {ecopontos.map((eco, i) => (
            <EcopontoCard key={eco.nome} eco={eco} delay={i * 0.1} />
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl p-6 border border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="font-bold text-slate-200 mb-1">Volumes acima de 1 m³</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Para grandes volumes de entulho (obras maiores), a responsabilidade é de quem gerou. Empresas de construção devem contratar transportadores licenciados (caçambas autorizadas). Ligue <span className="text-amber-300 font-semibold">156</span> para mais informações.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
