import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, HardHat, HelpCircle, Building2, BookOpen } from 'lucide-react'

const cards = [
  {
    icon: MapPin,
    color: 'cyan',
    title: 'Onde fica?',
    content: 'Na fronteira entre Jardim Keralux e Vila Guaraciaba, junto à portaria da EACH-USP (R. Arlindo Béttio, 1000), subprefeitura de Ermelino Matarazzo, zona leste de SP.',
  },
  {
    icon: HardHat,
    color: 'amber',
    title: 'O que é descartado?',
    items: ['Entulho de construção civil (predominante)', 'Móveis e eletrodomésticos velhos', 'Lixo doméstico misturado', 'Materiais recicláveis'],
  },
  {
    icon: HelpCircle,
    color: 'rose',
    title: 'Por que acontece?',
    items: ['Ruas estreitas bloqueiam caminhões', 'Cata-Bagulho NÃO recolhe entulho', 'Ecoponto mais próximo a ≈ 2,6 km', 'Falta de fiscalização contínua'],
  },
  {
    icon: Building2,
    color: 'violet',
    title: 'Contexto Urbano',
    items: ['Ocupação irregular de antigo terreno industrial', 'Moradores próximos a córregos', 'Esgotos a céu aberto', 'Alta densidade de moradias'],
  },
]

const colorMap = {
  cyan:   { glass: 'glass-cyan',    icon: 'text-cyan-400',   border: 'border-cyan-500/20'   },
  amber:  { glass: 'glass-amber',   icon: 'text-amber-400',  border: 'border-amber-500/20'  },
  rose:   { glass: 'glass-rose',    icon: 'text-rose-400',   border: 'border-rose-500/20'   },
  violet: { glass: 'glass',         icon: 'text-violet-400', border: 'border-violet-500/20' },
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
      {children}
    </span>
  )
}

export default function ProblemaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="problema" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel>01 — O Problema</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Um problema <span className="text-gradient">estrutural</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            O descarte irregular não é falta de consciência — é consequência de um descompasso entre o serviço disponível e o resíduo predominante.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(({ icon: Icon, color, title, content, items }, i) => {
            const c = colorMap[color]
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${c.glass} rounded-2xl p-6 flex flex-col gap-3 border ${c.border} hover:scale-[1.02] transition-transform`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${c.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100">{title}</h3>
                {content && <p className="text-slate-400 text-sm leading-relaxed">{content}</p>}
                {items && (
                  <ul className="space-y-1.5">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.icon} bg-current`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Academic reference box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-6 flex items-start gap-4 border border-white/8"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200 mb-1">Embasamento acadêmico publicado</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Esta situação é documentada em pesquisa publicada especificamente sobre este bairro:{' '}
              <span className="text-violet-300 font-medium">Magalhães; Cseh; Gonçalves-Dias (2022)</span> —
              conflitos na coleta de resíduos no Jardim Keralux — e{' '}
              <span className="text-violet-300 font-medium">Magalhães; Gonçalves-Dias (2023)</span> —
              riscos, vulnerabilidades e (in)justiça ambiental na comunidade.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
