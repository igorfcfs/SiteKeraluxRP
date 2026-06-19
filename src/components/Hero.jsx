import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, ArrowDown } from 'lucide-react'

const stats = [
  { value: '88',     label: 'pontos viciados eliminados pelo Descarte Correto na zona leste' },
  { value: '2,6 km', label: 'distância mínima ao ecoponto mais próximo' },
  { value: '6+',     label: 'projetos anteriores sem continuidade' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500" />
        <div className="blob absolute top-1/3 -right-40 w-[400px] h-[400px] bg-indigo-500" style={{ animationDelay: '3s' }} />
        <div className="blob absolute -bottom-20 left-1/3 w-[360px] h-[360px] bg-emerald-500" style={{ animationDelay: '6s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-6">
          <span className="glass-cyan inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Ermelino Matarazzo · Zona Leste · São Paulo
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 {...fadeUp(0.2)} className="text-center text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
          Gestão de Resíduos no{' '}
          <span className="text-gradient block sm:inline">
            Jardim Keralux
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.35)} className="text-center text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Informações sobre coleta, ecopontos, impactos e soluções para a comunidade da{' '}
          <span className="text-slate-200 font-medium">Vila Guaraciaba</span> e regiões vizinhas.
        </motion.p>

        {/* Alert */}
        <motion.div {...fadeUp(0.45)} className="max-w-xl mx-auto mb-10">
          <div className="glass-amber rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300">Atenção:</span> Ratos, quatis e escorpiões foram relatados no ponto de descarte junto à portaria da EACH-USP. A área fica próxima a uma escola infantil.
            </p>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center gap-3 mb-20">
          <a
            href="#coleta"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Ver sistema de coleta
          </a>
          <a
            href="#ecopontos"
            className="glass border border-white/10 hover:bg-white/8 hover:border-white/20 text-slate-200 font-semibold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Encontrar ecopontos
          </a>
          <a
            href="tel:156"
            className="glass-emerald border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/35 text-emerald-300 font-semibold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            Ligar 156
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {stats.map(({ value, label }) => (
            <div key={value} className="glass rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-gradient mb-1">{value}</div>
              <div className="text-xs text-slate-400 leading-snug">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs uppercase tracking-widest">Role para ver</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
