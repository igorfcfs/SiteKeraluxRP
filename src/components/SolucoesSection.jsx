import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  CheckCircle2, XCircle, Zap, Package, Megaphone, GraduationCap, HandshakeIcon,
  Lightbulb, Globe, MapPin, Recycle, Building2, Users, Smartphone, Shield, ExternalLink,
} from 'lucide-react'

function ReferenciaLink({ href, children }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline underline-offset-2 transition-colors mt-1.5"
    >
      <ExternalLink className="w-3 h-3 flex-shrink-0" aria-hidden />
      <span>{children}</span>
    </a>
  )
}

const propostasPriorizadas = [
  {
    icon: Package,
    color: 'cyan',
    titulo: 'Caçamba temporária para entulho',
    descricao: 'No modelo do Projeto Descarte Correto: caçambas de 15 m³ instaladas diretamente no ponto viciado. Ataca a causa raiz — o descompasso entre entulho e serviço disponível.',
    impacto: 'Alto',
    viabilidade: 'Média',
    referencia: 'Modelo já testado em Ermelino Matarazzo',
    link: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/coleta_de_lixo/descarte_correto/',
  },
  {
    icon: Zap,
    color: 'emerald',
    titulo: 'Confirmar frequência real de coleta',
    descricao: 'Contato direto com a subprefeitura ou pelo 156 para obter a data exata da coleta de volumosos. Base factual necessária para todas as informações do site.',
    impacto: 'Alto',
    viabilidade: 'Alta',
    referencia: 'Central 156 — Prefeitura de São Paulo',
    link: 'https://www.capital.sp.gov.br/web/servicos/w/servicos-156',
  },
  {
    icon: Megaphone,
    color: 'violet',
    titulo: 'Site informativo com dados verificados',
    descricao: 'Este site. Disseminação de informações confiáveis sobre coleta, ecopontos e direitos. Alcance além da comunidade local.',
    impacto: 'Médio',
    viabilidade: 'Alta',
    referencia: 'Lei nº 12.305/2010 — Política Nacional de Resíduos Sólidos',
    link: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm',
  },
  {
    icon: GraduationCap,
    color: 'amber',
    titulo: 'Educação ambiental contínua',
    descricao: 'Não pontual. Soluções técnicas sem engajamento da população tendem a falhar — os próprios projetos anteriores confirmam isso.',
    impacto: 'Médio-alto',
    viabilidade: 'Média',
    referencia: 'Ministério do Meio Ambiente — educação ambiental',
    link: 'https://www.gov.br/mma/pt-br/assuntos/educacao-ambiental',
  },
  {
    icon: HandshakeIcon,
    color: 'rose',
    titulo: 'Parceria institucional EACH-USP',
    descricao: 'Extensão universitária com continuidade planejada além do semestre. O fator que diferencia este projeto de todos os anteriores que falharam.',
    impacto: 'Alto',
    viabilidade: 'Média',
    referencia: 'EACH-USP — Escola de Artes, Ciências e Humanidades',
    link: 'https://www.each.usp.br/',
  },
]

const sucessos = [
  {
    nome: 'Projeto Descarte Correto — Prefeitura de SP',
    resultado: 'Eliminou 88 pontos viciados na zona leste, incluindo Ermelino Matarazzo. Instalou caçambas temporárias de 15 m³ (entulho) e 40 m³ (volumosos) nos pontos críticos.',
    destaque: '88 pontos eliminados · Ermelino Matarazzo',
    referencia: 'Prefeitura de SP — Descarte Correto',
    link: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/coleta_de_lixo/descarte_correto/',
  },
  {
    nome: 'Ecopontos — Araçatuba (SP)',
    resultado: 'Pontos estruturados com equipamentos adequados, aliados a coleta eficiente, reduziram significativamente o acúmulo de entulho em regiões periféricas.',
    destaque: 'Redução significativa do entulho irregular',
    referencia: 'Prefeitura de Araçatuba — Ecopontos',
    link: 'https://www.aracatuba.sp.gov.br/servicos/ecoponto',
  },
  {
    nome: 'Projeto Revitaliza SP',
    resultado: 'Converte pontos de descarte irregular em praças e parques públicos. A transformação do espaço desincentiva o retorno dos resíduos e promove o cuidado com o local.',
    destaque: 'Transformação física do espaço',
    referencia: 'Prefeitura de SP — Revitaliza',
    link: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/parques_e_areas_verdes/revitaliza/',
  },
  {
    nome: 'Programa Lixo Zero — Curitiba (PR)',
    resultado: 'Integração de coleta seletiva porta a porta, ecopontos e educação ambiental contínua. Referência nacional em gestão integrada de resíduos sólidos urbanos.',
    destaque: 'Coleta seletiva + ecopontos + educação',
    referencia: 'Prefeitura de Curitiba — Lixo Zero',
    link: 'https://lixozero.curitiba.pr.gov.br/',
  },
]

const estrategiasGlobais = [
  {
    icon: Smartphone,
    color: 'cyan',
    titulo: 'Cobrar pelo volume descartado (PAYT)',
    descricao: 'Quando cada saco de lixo tem custo visível e há alternativa legal para volumosos, o incentivo ao descarte irregular cai.',
    referencia: 'Seoul — Volume-based Waste Fee System',
    link: 'https://english.seoul.go.kr/service-environment/wastes-recycling/',
  },
  {
    icon: Building2,
    color: 'violet',
    titulo: 'Infraestrutura densa e acessível',
    descricao: 'Pontos de entrega próximos, agendamento de coleta e caçambas temporárias em pontos críticos — não apenas campanhas educativas.',
    referencia: 'Área Metropolitana de Barcelona — gestão de resíduos',
    link: 'https://www.metropolitan.cat/en/area-metropolitan/environment-and-sustainability/waste',
  },
  {
    icon: Users,
    color: 'emerald',
    titulo: 'Engajamento comunitário contínuo',
    descricao: 'Moradores, catadores e instituições locais como parte da solução — não público passivo de palestras pontuais.',
    referencia: 'Kamikatsu Zero Waste Academy',
    link: 'https://zerowasteacademy.jp/',
  },
  {
    icon: Shield,
    color: 'amber',
    titulo: 'Fiscalização + transformação do espaço',
    descricao: 'Multas e monitoramento combinados com redesign urbano (praças, iluminação, uso do espaço) para impedir o retorno do ponto viciado.',
    referencia: 'NEA Singapura — gestão de resíduos sólidos',
    link: 'https://www.nea.gov.sg/our-services/waste-management',
  },
]

const casosMundo = [
  {
    icon: MapPin,
    color: 'cyan',
    local: 'Seul · Coreia do Sul',
    regiao: 'Ásia',
    estrategia: 'Pague pelo que joga',
    titulo: 'Sacos padronizados com chip RFID',
    resultado: 'Desde os anos 1990, a cobrança por volume (PAYT) com sacos oficiais reduziu drasticamente o descarte irregular em áreas residenciais densas. Lixo fora do padrão simplesmente não é coletado.',
    licao: 'Para o Keralux: sem serviço claro para entulho e sem custo percebido pelo gerador, o descarte na calçada continua racional para quem não tem carro.',
    referencia: 'Seoul Metropolitan Government — Volume-based Waste Fee System',
    link: 'https://english.seoul.go.kr/service-environment/wastes-recycling/',
  },
  {
    icon: Recycle,
    color: 'emerald',
    local: 'Kamikatsu · Japão',
    regiao: 'Ásia',
    estrategia: 'Zero resíduo comunitário',
    titulo: '45 categorias de separação no “Gomi Station”',
    resultado: 'Cidade de ~1.500 habitantes alcançou mais de 80% de desvio de aterro com separação rigorosa, centro comunitário de triagem e orgulho local na meta “Zero Waste”.',
    licao: 'Educação funciona quando há infraestrutura no bairro e a comunidade participa da operação — não só de campanhas semestrais.',
    referencia: 'Kamikatsu Zero Waste Academy',
    link: 'https://zerowasteacademy.jp/',
  },
  {
    icon: Building2,
    color: 'violet',
    local: 'Barcelona · Espanha',
    regiao: 'Europa',
    estrategia: 'Rede de puntos limpios',
    titulo: 'Dezenas de pontos fixos + coleta agendada de volumosos',
    resultado: 'Rede municipal densa de ecopontos (“punto limpio”) com horários estendidos e agendamento gratuito de recolha de móveis e entulho reduz a pressão sobre calçadas e vias.',
    licao: 'O ecoponto a 2,6 km não basta — densidade e horário ampliado são decisivos em bairros periféricos.',
    referencia: 'Àrea Metropolitana de Barcelona — puntos limpios',
    link: 'https://www.metropolitan.cat/en/area-metropolitan/environment-and-sustainability/waste',
  },
  {
    icon: Package,
    color: 'amber',
    local: 'Rotterdam · Países Baixos',
    regiao: 'Europa',
    estrategia: 'Coleta fora da calçada',
    titulo: 'Contêineres subterrâneos e pontos de acesso controlado',
    resultado: 'Em ruas estreitas, contêineres enterrados ou concentrados em pontos de acesso com sensor liberam espaço na via e reduzem o acúmulo visível de resíduos.',
    licao: 'Ruas estreitas no Keralux bloqueiam caminhões — soluções que retiram o volume da calçada são especialmente relevantes aqui.',
    referencia: 'Gemeente Rotterdam — resíduos e reciclagem',
    link: 'https://www.rotterdam.nl/en/residents/waste/',
  },
  {
    icon: Globe,
    color: 'rose',
    local: 'Medellín · Colômbia',
    regiao: 'América Latina',
    estrategia: 'Urbanismo + serviço nas periferias',
    titulo: 'Bibliotecas-parque em antigos lixões e expansão de coleta',
    resultado: 'Transformação de áreas degradadas em espaços públicos de qualidade, aliada à expansão gradual de coleta formal em assentamentos informais nas encostas.',
    licao: 'Revitalizar o espaço físico sem ampliar o serviço de coleta não sustenta — as duas frentes precisam andar juntas.',
    referencia: 'UN-Habitat — transformação urbana em Medellín',
    link: 'https://unhabitat.org/metropolitan-mobility-and-urban-poverty-reduction-interventions-medellin',
  },
  {
    icon: Users,
    color: 'cyan',
    local: 'Cidade do Cabo · África do Sul',
    regiao: 'África',
    estrategia: 'Cooperativas de reciclagem',
    titulo: 'Integração formal de catadores ao sistema municipal',
    resultado: 'Cooperativas de catadores recebem contratos municipais, equipamentos e treinamento — aumentando taxa de reciclagem e renda digna para quem já atuava informalmente.',
    licao: 'Quem já lida com o material no local pode ser aliado estratégico, não apenas “problema” a ser removido.',
    referencia: 'City of Cape Town — recicladores e resíduos',
    link: 'https://www.capetown.gov.za/City-Connect/Apply/Environmental-health-and-solid-waste/waste-recyclers',
  },
  {
    icon: Shield,
    color: 'emerald',
    local: 'Singapura',
    regiao: 'Ásia',
    estrategia: 'Infraestrutura + fiscalização rigorosa',
    titulo: 'Coleta diária em áreas densas e multas pesadas',
    resultado: 'Alta densidade habitacional com coleta porta a porta frequente, ecopontos modernos e fiscalização severa para descarte irregular — cidade entre as mais limpas do mundo.',
    licao: 'Infraestrutura sem fiscalização falha; fiscalização sem alternativa legal gera ressentimento. Os dois lados importam.',
    referencia: 'National Environment Agency — solid waste management',
    link: 'https://www.nea.gov.sg/our-services/waste-management',
  },
]

const fracassos = [
  {
    nome: 'Projeto Mobilização (USP, 2019)',
    razao: 'Sem continuidade após o fim da disciplina.',
    referencia: 'EACH-USP — extensão universitária',
    link: 'https://www.each.usp.br/',
  },
  {
    nome: 'Transcendendo Fronteiras (USP, 2016/2017)',
    razao: 'Foco educativo sem ação estrutural.',
    referencia: 'EACH-USP — extensão universitária',
    link: 'https://www.each.usp.br/',
  },
  {
    nome: 'Operação Cata-Bagulho (Prefeitura)',
    razao: 'Instrumento errado: não recolhe entulho de obra.',
    referencia: 'Prefeitura de SP — Cata-Bagulho (o que recolhe)',
    link: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/coleta_de_lixo/coleta_de_objetos_volumosos__cata-bagulho_/',
  },
  {
    nome: 'Transformação de Lixão em Área Verde (Subprefeitura)',
    razao: 'Ação pontual, sem planejamento de longo prazo.',
    referencia: 'Prefeitura de SP — Revitaliza (referência de transformação)',
    link: 'https://www.prefeitura.sp.gov.br/cidade/secretarias/meio_ambiente/parques_e_areas_verdes/revitaliza/',
  },
  {
    nome: 'Fábrica Verde (Prefeitura + USP)',
    razao: 'Descontinuidade de política pública.',
    referencia: 'USP — projetos de extensão e sustentabilidade',
    link: 'https://uspdigital.usp.br/apolo/',
  },
  {
    nome: 'Projeto de Diagnóstico (USP)',
    razao: 'Ficou sem implementação prática contínua.',
    referencia: 'Blucher — publicações sobre o Jardim Keralux',
    link: 'https://www.blucher.com.br/',
  },
]

const colorMap = {
  cyan:    { card: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20', icon: 'text-cyan-600 dark:text-cyan-400' },
  emerald: { card: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: 'text-emerald-600 dark:text-emerald-400' },
  violet:  { card: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20', icon: 'text-violet-600 dark:text-violet-400' },
  amber:   { card: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20', icon: 'text-amber-600 dark:text-amber-400' },
  rose:    { card: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20', icon: 'text-rose-600 dark:text-rose-400' },
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
            Propostas locais, casos de sucesso no Brasil, estratégias inteligentes do mundo e lições do que não durou — com base em evidências.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-1.5 grid grid-cols-2 sm:flex sm:gap-1 mb-8 max-w-2xl mx-auto"
          role="tablist"
          aria-label="Categorias de soluções"
        >
          {[
            { id: 'propostas', icon: Lightbulb,    label: 'Propostas'  },
            { id: 'sucesso',   icon: CheckCircle2, label: 'Brasil'     },
            { id: 'mundo',     icon: Globe,        label: 'No mundo'   },
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
              {propostasPriorizadas.map(({ icon: Icon, color, titulo, descricao, impacto, viabilidade, referencia, link }, i) => (
                <motion.div
                  key={titulo}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/8 flex gap-4 group hover:border-slate-300 dark:hover:border-white/15 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colorMap[color].card}`}>
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
                    <ReferenciaLink href={link}>{referencia}</ReferenciaLink>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Sucessos — Brasil */}
          {tab === 'sucesso' && (
            <motion.div
              key="sucesso"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-2">
                Experiências brasileiras que reduziram pontos viciados ou melhoraram a gestão de resíduos.
              </p>
              {sucessos.map(({ nome, resultado, destaque, referencia, link }, i) => (
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8 mb-1">{resultado}</p>
                  <div className="pl-8">
                    <ReferenciaLink href={link}>{referencia}</ReferenciaLink>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Casos internacionais */}
          {tab === 'mundo' && (
            <motion.div
              key="mundo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="glass-cyan rounded-2xl p-5 border border-cyan-500/20">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  Estratégias inteligentes replicáveis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {estrategiasGlobais.map(({ icon: Icon, color, titulo, descricao, referencia, link }) => (
                    <div
                      key={titulo}
                      className="rounded-xl p-4 border border-slate-200 dark:border-white/8 bg-slate-900/[0.02] dark:bg-white/[0.03]"
                    >
                      <div className="flex items-start gap-2.5">
                        <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colorMap[color].icon}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{titulo}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-0.5">{descricao}</p>
                          <ReferenciaLink href={link}>{referencia}</ReferenciaLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Casos reais de cidades que enfrentaram descarte irregular, ruas estreitas ou periferias densas.
              </p>

              {casosMundo.map(({ icon: Icon, color, local, regiao, estrategia, titulo, resultado, licao, referencia, link }, i) => (
                <motion.div
                  key={local + titulo}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/8 hover:border-slate-300 dark:hover:border-white/15 transition-colors"
                >
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${colorMap[color].card}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{local}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500">
                          {regiao}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                          {estrategia}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{titulo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{resultado}</p>
                  <div className="rounded-xl p-3 bg-emerald-500/8 border border-emerald-500/15 mb-2">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">Lição para o Keralux: </span>
                      {licao}
                    </p>
                  </div>
                  <ReferenciaLink href={link}>{referencia}</ReferenciaLink>
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
                {fracassos.map(({ nome, razao, referencia, link }, i) => (
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
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{razao}</p>
                      <ReferenciaLink href={link}>{referencia}</ReferenciaLink>
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
