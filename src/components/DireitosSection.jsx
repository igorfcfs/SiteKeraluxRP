import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'

const faqs = [
  {
    q: 'Tenho direito ao serviço de coleta de resíduos?',
    a: 'Sim. A Lei nº 12.305/2010 (PNRS — Política Nacional de Resíduos Sólidos) garante a todos os cidadãos o direito ao sistema de limpeza urbana e manejo de resíduos. Se a coleta não está funcionando na sua rua, ligue 156 e registre uma reclamação formal.',
  },
  {
    q: 'Quem é responsável pelo entulho de uma reforma?',
    a: 'Quem gerou o resíduo. Para pequenos volumes (até 1 m³), leve ao Ecoponto gratuitamente. Para grandes volumes (obras maiores), é responsabilidade do contratante ou da empresa de construção contratar transportadores e destinação licenciados. Não é obrigação da coleta doméstica.',
  },
  {
    q: 'Posso denunciar quem descarta lixo irregularmente?',
    a: 'Sim. O descarte irregular é infração ambiental prevista na Lei de Crimes Ambientais (Lei nº 9.605/1998). Denuncie pelo 156 ou pelo app SP156. Registre foto com local, data e horário. A Subprefeitura pode aplicar multas e acionar a fiscalização.',
  },
  {
    q: 'O Cata-Bagulho recolhe entulho?',
    a: 'Não. Por definição do próprio programa da Prefeitura de São Paulo, a Operação Cata-Bagulho recolhe apenas objetos volumosos inservíveis (móveis, colchões, eletrodomésticos, pneus). Entulho de obras, lixo doméstico, lixo hospitalar e industrial estão explicitamente fora do escopo. Para entulho, use o Ecoponto.',
  },
  {
    q: 'Qual é o horário e como funciona o Ecoponto?',
    a: 'Os Ecopontos são gratuitos e funcionam de segunda a sábado das 6h às 22h, e domingos e feriados das 6h às 18h. Aceitam entulho de pequenas obras (até 1 m³ por entrega), volumosos, recicláveis e eletrodomésticos. Não é necessário agendamento.',
  },
  {
    q: 'Como posso ajudar a comunidade?',
    a: 'Descarte corretamente seus resíduos. Informe vizinhos sobre o Ecoponto mais próximo. Denuncie descartes irregulares pelo 156. Participe de iniciativas comunitárias de educação ambiental. A melhoria depende de continuidade — não de ações pontuais.',
  },
]

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`glass rounded-2xl border overflow-hidden transition-colors ${open ? 'border-cyan-500/20' : 'border-slate-200 dark:border-white/8 hover:border-slate-300 dark:hover:border-white/14'}`}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500/40"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-snug">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-slate-200 dark:bg-white/6 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function DireitosSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="direitos" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/90 dark:bg-slate-900/50">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            06 — Direitos &amp; Deveres
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Você tem <span className="text-gradient">direitos</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            A legislação garante. Saiba como acionar os responsáveis e o que fazer quando o serviço falha.
          </p>
        </motion.div>

        {/* FAQ */}
        <div className="space-y-3 mb-10">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>

        {/* CTA 156 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-center"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Precisa de ajuda? Ligue 156</h3>
          <p className="text-cyan-100 mb-6 text-sm leading-relaxed">
            Central de Atendimento da Prefeitura de São Paulo. Disponível para registrar reclamações, solicitar a Cata-Bagulho, denunciar descarte irregular e obter informações sobre ecopontos e coleta.
          </p>
          <a
            href="tel:156"
            className="inline-flex items-center gap-2 bg-white text-cyan-700 font-black text-xl px-8 py-4 rounded-xl hover:bg-cyan-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            156
          </a>
        </motion.div>
      </div>
    </section>
  )
}
