import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Trash2, Truck, Recycle, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'

const tabs = [
  {
    id: 'domestico',
    label: 'Lixo Doméstico',
    icon: Trash2,
    color: 'emerald',
    frequencia: '3× por semana',
    dias: ['Segunda', 'Quarta', 'Sexta-feira'],
    coleta: ['Resíduos orgânicos', 'Lixo doméstico em geral', 'Embalagens (saco preto)'],
    naoColeta: ['Entulho de obras', 'Móveis e eletrodomésticos', 'Materiais volumosos'],
    tip: 'Deixe o lixo na calçada até às 22h na véspera da coleta. Use sacos resistentes.',
  },
  {
    id: 'catabagulho',
    label: 'Cata-Bagulho',
    icon: Truck,
    color: 'amber',
    frequencia: 'Quinzenal',
    dias: ['Consulte o 156 ou site da Prefeitura para o dia exato no seu endereço'],
    coleta: ['Móveis velhos (sofás, camas, armários)', 'Colchões', 'Eletrodomésticos inservíveis', 'Pneus'],
    naoColeta: ['Entulho de obras (cimento, tijolos, cerâmica)', 'Lixo doméstico', 'Lixo hospitalar ou industrial', 'Material de jardinagem/poda'],
    tip: 'O entulho de obras NÃO é recolhido pela Cata-Bagulho por definição do programa. Leve ao Ecoponto.',
    warning: true,
  },
  {
    id: 'ecoponto',
    label: 'Ecoponto',
    icon: Recycle,
    color: 'cyan',
    frequencia: 'Diário · Gratuito',
    dias: ['Seg–Sáb: 6h às 22h', 'Domingos e Feriados: 6h às 18h'],
    coleta: ['Entulho de construção civil (até 1 m³)', 'Resíduos volumosos', 'Materiais recicláveis (papel, plástico, metal)', 'Eletrodomésticos e eletroeletrônicos', 'Óleo de cozinha (em alguns pontos)'],
    naoColeta: ['Volumes acima de 1 m³ (responsabilidade de quem gerou)', 'Lixo orgânico doméstico', 'Resíduos perigosos/hospitalares'],
    tip: 'O Ecoponto é o lugar CORRETO para entulho. O mais próximo fica a ≈ 2,6 km (Ecoponto Boturussu).',
  },
]

const colorMap = {
  emerald: { active: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300', tab: 'hover:bg-emerald-500/5', dot: 'bg-emerald-400', icon: 'text-emerald-600 dark:text-emerald-400' },
  amber:   { active: 'bg-amber-500/15 border-amber-500/30 text-amber-800 dark:text-amber-300',   tab: 'hover:bg-amber-500/5',   dot: 'bg-amber-400',   icon: 'text-amber-600 dark:text-amber-400'   },
  cyan:    { active: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300',       tab: 'hover:bg-cyan-500/5',    dot: 'bg-cyan-400',    icon: 'text-cyan-600 dark:text-cyan-400'    },
}

export default function ColetaSection() {
  const [active, setActive] = useState('domestico')
  const ref = useRef(null)
  const contentRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const selectTab = (id) => {
    setActive(id)
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }
  const tab = tabs.find(t => t.id === active)
  const c = colorMap[tab.color]

  return (
    <section id="coleta" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/90 dark:bg-slate-900/50 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            02 — Sistema de Coleta
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Qual serviço <span className="text-gradient">recolhe o quê?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Entender as diferenças entre os serviços é o primeiro passo para descartar corretamente.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass rounded-2xl p-1.5 flex gap-1 mb-6"
          role="tablist"
          aria-label="Tipos de coleta"
        >
          {tabs.map(({ id, label, icon: Icon, color, warning }) => {
            const isActive = id === active
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(id)}
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/40 min-h-[44px] ${
                  isActive
                    ? `${colorMap[color].active} border`
                    : `text-slate-600 dark:text-slate-400 ${colorMap[color].tab}`
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
                <span className="leading-tight text-center">{label}</span>
                {warning && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 sm:absolute sm:top-2 sm:right-2" aria-hidden />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            ref={contentRef}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {/* Frequency + days */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className={`glass rounded-2xl p-5 border sm:col-span-1 ${tab.warning ? 'border-amber-500/20' : 'border-slate-200 dark:border-white/8'}`}>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Frequência</p>
                <p className={`text-2xl font-black ${c.icon}`}>{tab.frequencia}</p>
              </div>
              <div className={`glass rounded-2xl p-5 border sm:col-span-2 ${tab.warning ? 'border-amber-500/20' : 'border-slate-200 dark:border-white/8'}`}>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Dias / Horários</p>
                <div className="flex flex-wrap gap-2">
                  {tab.dias.map(d => (
                    <span key={d} className={`px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/5 dark:bg-white/5 text-slate-700 dark:text-slate-300`}>{d}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Coleta / Não coleta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="glass rounded-2xl p-5 border border-emerald-500/10">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> O que recolhe
                </p>
                <ul className="space-y-2">
                  {tab.coleta.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl p-5 border border-rose-500/10">
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Não recolhe
                </p>
                <ul className="space-y-2">
                  {tab.naoColeta.map((item, i) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${tab.warning && i === 0 ? 'text-amber-800 dark:text-amber-300 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tip */}
            <div className={`rounded-2xl p-4 flex items-start gap-3 ${tab.warning ? 'glass-amber' : 'glass-cyan'}`}>
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tab.warning ? 'text-amber-600 dark:text-amber-400' : 'text-cyan-600 dark:text-cyan-400'}`} />
              <p className={`text-sm font-medium ${tab.warning ? 'text-amber-800 dark:text-amber-200' : 'text-cyan-800 dark:text-cyan-200'}`}>{tab.tip}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
