import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CheckCircle2, XCircle, Zap, Package, Megaphone, GraduationCap, HandshakeIcon, Lightbulb } from 'lucide-react'

const propostasPriorizadas = [
  {
    icon: Package,
    color: 'cyan',
    titulo: 'Caçamba temporária para entulho',
    descricao: 'No modelo do Projeto Descarte Correto: caçambas de 15 m³ instaladas diretamente no ponto viciado. Ataca a causa raiz — o descompasso entre entulho e serviço disponível.',
    impacto: 'Alto',
    viabilidade: 'Média',
    referencia: 'Modelo já testado em Ermelino Matarazzo',
  },
  {
    icon: Zap,
    color: 'emerald',
    titulo: 'Confirmar frequência real de coleta',
    descricao: 'Contato direto com a subprefeitura ou pelo 156 para obter a data exata da coleta de volumosos. Base factual necessária para todas as informações do site.',
    impacto: 'Alto',
    viabilidade: 'Alta',
    referencia: 'Pré-requisito para informar a comunidade corretamente',
  },
  {
    icon: Megaphone,
    color: 'violet',
    titulo: 'Site informativo com dados verificados',
    descricao: 'Este site. Disseminação de informações confiáveis sobre coleta, ecopontos e direitos. Alcance além da comunidade local.',
    impacto: 'Médio',
    viabilidade: 'Alta',
    referencia: 'Já em desenvolvimento — você está aqui',
  },
  {
    icon: GraduationCap,
    color: 'amber',
    titulo: 'Educação ambiental contínua',
    descricao: 'Não pontual. Soluções técnicas sem engajamento da população tendem a falhar — os próprios projetos anteriores confirmam isso.',
    impacto: 'Médio-alto',
    viabilidade: 'Média',
    referencia: 'Ennes (2025); Mendonça et al. (2025)',
  },
  {
    icon: HandshakeIcon,
    color: 'rose',
    titulo: 'Parceria institucional EACH-USP',
    descricao: 'Extensão universitária com continuidade planejada além do semestre. O fator que diferencia este projeto de todos os anteriores que falharam.',
    impacto: 'Alto',
    viabilidade: 'Média',
    referencia: 'Precedente dos projetos USP anteriores na área',
  },
]

const sucessos = [
  {
    nome: 'Projeto Descarte Correto — Prefeitura de SP',
    resultado: 'Eliminou 88 pontos viciados na zona leste, incluindo Ermelino Matarazzo. Instalou caçambas temporárias de 15 m³ (entulho) e 40 m³ (volumosos) nos pontos críticos.',
    destaque: '88 pontos eliminados · Ermelino Matarazzo',
  },
  {
    nome: 'Ecopontos — Araçatuba (SP)',
    resultado: 'Pontos estruturados com equipamentos adequados, aliados a coleta eficiente, reduziram significativamente o acúmulo de entulho em regiões periféricas.',
    destaque: 'Redução significativa do entulho irregular',
  },
  {
    nome: 'Projeto Revitaliza SP',
    resultado: 'Converte pontos de descarte irregular em praças e parques públicos. A transformação do espaço desincentiva o retorno dos resíduos e promove o cuidado com o local.',
    destaque: 'Transformação física do espaço',
  },
]

const fracassos = [
  { nome: 'Projeto Mobilização (USP, 2019)', razao: 'Sem continuidade após o fim da disciplina.' },
  { nome: 'Transcendendo Fronteiras (USP, 2016/2017)', razao: 'Foco educativo sem ação estrutural.' },
  { nome: 'Operação Cata-Bagulho (Prefeitura)', razao: 'Instrumento errado: não recolhe entulho de obra.' },
  { nome: 'Transformação de Lixão em Área Verde (Subprefeitura)', razao: 'Ação pontual, sem planejamento de longo prazo.' },
  { nome: 'Fábrica Verde (Prefeitura + USP)', razao: 'Descontinuidade de política pública.' },
  { nome: 'Projeto de Diagnóstico (USP)', razao: 'Ficou sem implementação prática contínua.' },
]

const colorMap = {
  cyan:    'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  violet:  'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
  amber:   'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
  rose:    'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
}

const impactoColor = { 'Alto': 'text-emerald-600 dark:text-emerald-400', 'Médio-alto': 'text-cyan-600 dark:text-cyan-400', 'Médio': 'text-amber-600 dark:text-amber-400' }
const viabilidadeColor = { 'Alta': 'text-emerald-600 dark:text-emerald-400', 'Média': 'text-amber-600 dark:text-amber-400', 'Baixa': 'text-rose-600 dark:text-rose-400' }

export default function SolucoesSection() {
  const [tab, setTab] = useState('propostas')
  const ref = useRef(null)
  const contentRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const selectTab = (id) => {
    setTab(id)
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  return (
    <section id="solucoes" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
            05 — Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            O que <span className="text-gradient">funciona</span> — e o que não durou
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Análise de experiências anteriores e proposta de caminhos com base em evidências.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-1.5 flex gap-1 mb-8 max-w-lg mx-auto"
          role="tablist"
          aria-label="Categorias de soluções"
        >
          {[
            { id: 'propostas', icon: Lightbulb,    label: 'Propostas'  },
            { id: 'sucesso',   icon: CheckCircle2, label: 'Funcionou'  },
            { id: 'fracasso',  icon: XCircle,      label: 'Não durou'  },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => selectTab(id)}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/40 min-h-[44px] ${
                tab === id
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="leading-tight text-center">{label}</span>
            </button>
          ))}
        </motion.div>

        <div ref={contentRef}>
        <AnimatePresence mode="wait">
          {/* Propostas */}
          {tab === 'propostas' && (
            <motion.div
              key="propostas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {propostasPriorizadas.map(({ icon: Icon, color, titulo, descricao, impacto, viabilidade, referencia }, i) => (
                <motion.div
                  key={titulo}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/8 flex gap-4 group hover:border-slate-300 dark:hover:border-white/15 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{titulo}</h4>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/8">
                          Impacto: <span className={`font-bold ${impactoColor[impacto]}`}>{impacto}</span>
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/8">
                          Viab.: <span className={`font-bold ${viabilidadeColor[viabilidade]}`}>{viabilidade}</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-1">{descricao}</p>
                    <p className="text-xs text-slate-500 italic">{referencia}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Sucessos */}
          {tab === 'sucesso' && (
            <motion.div
              key="sucesso"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {sucessos.map(({ nome, resultado, destaque }, i) => (
                <motion.div
                  key={nome}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-emerald rounded-2xl p-6 border border-emerald-500/15"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-0.5">{nome}</h4>
                      <span className="inline-block text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">{destaque}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8">{resultado}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Fracassos */}
          {tab === 'fracasso' && (
            <motion.div
              key="fracasso"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="space-y-3 mb-6">
                {fracassos.map(({ nome, razao }, i) => (
                  <motion.div
                    key={nome}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass rounded-xl p-4 border border-rose-500/12 flex items-start gap-3"
                  >
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{nome}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{razao}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="glass-amber rounded-2xl p-5 border border-amber-500/20">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-800 dark:text-amber-300">Padrão identificado:</span> Todos os projetos falharam por falta de continuidade, foco apenas educativo sem ação estrutural, ou por não atacar a causa raiz. Qualquer proposta nova precisa considerar isso explicitamente no seu design.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
