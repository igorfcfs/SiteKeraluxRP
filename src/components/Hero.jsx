import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, ArrowDown, Camera } from 'lucide-react'
import heroFoto from '../assets/galeria/lixao_rua.jpg'

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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 dark:from-slate-950/20 via-slate-200/60 dark:via-slate-950/60 to-slate-50 dark:to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-6">
          <span className="glass-cyan inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Ermelino Matarazzo · Zona Leste · São Paulo
          </span>
        </motion.div>

        {/* Hero photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-5xl mx-auto mb-10 mt-2"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: 'clamp(200px, 38vw, 420px)' }}>
            <img
              src={heroFoto}
              alt="Ponto viciado de descarte irregular no Jardim Keralux — colchões, entulho e caçambas acumulados na calçada"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.82) saturate(0.9)' }}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.2) 50%, transparent 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(2,6,23,0.4) 0%, transparent 40%, rgba(2,6,23,0.3) 100%)' }} />
            {/* Caption */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <span className="text-xs text-white/70 font-medium flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <Camera className="w-3 h-3 flex-shrink-0" />
                Ponto viciado junto à portaria da EACH-USP — Rua Arlindo Béttio
              </span>
              <span className="hidden sm:inline-block text-[10px] text-white/40 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-md">
                Jardim Keralux · 2026
              </span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...fadeUp(0.3)} className="text-center text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
          Gestão de Resíduos no{' '}
          <span className="text-gradient block sm:inline">
            Jardim Keralux
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.35)} className="text-center text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Informações sobre coleta, ecopontos, impactos e soluções para a comunidade da{' '}
          <span className="text-slate-800 dark:text-slate-200 font-medium">Vila Guaraciaba</span> e regiões vizinhas.
        </motion.p>

        {/* Alert */}
        <motion.div {...fadeUp(0.45)} className="max-w-xl mx-auto mb-10">
          <div className="glass-amber rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-800 dark:text-amber-300">Atenção:</span> Ratos, quatis e escorpiões foram relatados no ponto de descarte junto à portaria da EACH-USP. A área fica próxima a uma escola infantil.
            </p>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center gap-3 mb-20">
          <a
            href="#coleta"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950"
          >
            Ver sistema de coleta
          </a>
          <a
            href="#ecopontos"
            className="glass border border-slate-200 dark:border-white/10 hover:bg-slate-900/5 dark:hover:bg-white/8 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Encontrar ecopontos
          </a>
          <a
            href="tel:156"
            className="glass-emerald border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/35 text-emerald-700 dark:text-emerald-300 font-semibold px-6 py-3 rounded-xl transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{label}</div>
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
