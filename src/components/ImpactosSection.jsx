import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Droplets, Wind, Waves, Bug, HeartPulse, Eye, TrendingDown, ShieldAlert } from 'lucide-react'

const ambientais = [
  { icon: Droplets, label: 'Contaminação do solo e lençol freático por substâncias tóxicas de resíduos da construção civil' },
  { icon: Waves,    label: 'Obstrução de córregos, aumentando o risco de enchentes nas chuvas' },
  { icon: Wind,     label: 'Emissão de gases poluentes pela decomposição de resíduos orgânicos misturados' },
  { icon: Bug,      label: 'Proliferação de vetores: ratos, baratas, mosquitos e escorpiões' },
]

const sociais = [
  { icon: HeartPulse, label: 'Risco de dengue, leptospirose e outras doenças transmitidas por vetores' },
  { icon: ShieldAlert, label: 'Risco de acidentes por objetos perfurocortantes descartados no local' },
  { icon: Eye,        label: 'Mau cheiro e poluição visual constantes — moradores e trabalhadores afetados diariamente' },
  { icon: TrendingDown, label: 'Desvalorização imobiliária do entorno e impacto na economia local' },
]

function useCountUp(target, isActive, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const start = performance.now()
    const isFloat = !Number.isInteger(target)
    const raf = requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const value = target * ease
      setCount(isFloat ? parseFloat(value.toFixed(1)) : Math.floor(value))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    })
    return () => cancelAnimationFrame(raf)
  }, [isActive, target, duration])
  return count
}

const kpis = [
  { value: 88,  suffix: '',    label: 'pontos eliminados pelo Descarte Correto na zona leste' },
  { value: 2.6, suffix: ' km', label: 'ao ecoponto mais próximo' },
  { value: 6,   suffix: '+',   label: 'projetos anteriores sem continuidade' },
]

function KpiCard({ kpi, isActive, delay }) {
  const count = useCountUp(kpi.value, isActive, 1400)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 text-center border border-slate-200 dark:border-white/8"
    >
      <div className="text-4xl font-black text-gradient mb-2">
        {count}{kpi.suffix}
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{kpi.label}</p>
    </motion.div>
  )
}

function ImpactCard({ icon: Icon, label, color, delay }) {
  const colors = {
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
    rose:    'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/15',
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: color === 'emerald' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-3"
    >
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{label}</p>
    </motion.div>
  )
}

export default function ImpactosSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="impactos" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/90 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            04 — Impactos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            O lixo não é só <span className="text-gradient-amber">visual</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            O acúmulo irregular contamina, adoece e empobrece. Veja o que está em jogo.
          </p>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} kpi={kpi} isActive={isInView} delay={i * 0.12} />
          ))}
        </div>

        {/* Two-column impacts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Environmental */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Impactos Ambientais
            </motion.h3>
            <div className="space-y-5">
              {ambientais.map((item, i) => (
                <ImpactCard key={item.label} icon={item.icon} label={item.label} color="emerald" delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-5 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Impactos Sociais e à Saúde
            </motion.h3>
            <div className="space-y-5">
              {sociais.map((item, i) => (
                <ImpactCard key={item.label} icon={item.icon} label={item.label} color="rose" delay={i * 0.08 + 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Academic note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 glass rounded-2xl p-5 border border-slate-200 dark:border-white/8 text-sm text-slate-600 dark:text-slate-400 text-center"
        >
          Os impactos acima são consistentes com a literatura acadêmica e com os estudos publicados especificamente sobre este bairro
          {' '}(<span className="text-slate-700 dark:text-slate-300">Magalhães; Gonçalves-Dias, 2022; 2023</span>),
          que documentam a relação entre <span className="text-rose-700 dark:text-rose-300">vulnerabilidade social</span> e exposição desproporcional a riscos ambientais.
        </motion.div>
      </div>
    </section>
  )
}
