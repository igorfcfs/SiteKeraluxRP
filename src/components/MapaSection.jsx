import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Trash2, MapPin, Navigation } from 'lucide-react'
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from './ui/mapcn-map-marker'

const MARKERS = [
  {
    id: 'each',
    label: 'EACH-USP',
    description: 'Escola de Artes, Ciências e Humanidades da USP',
    address: 'R. Arlindo Béttio, 1000 — Ermelino Matarazzo',
    lng: -46.3606,
    lat: -23.5146,
    Icon: GraduationCap,
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.15)',
    border: 'rgba(34,211,238,0.4)',
    tag: 'Universidade',
  },
  {
    id: 'ponto-viciado',
    label: 'Ponto Viciado',
    description: 'Acúmulo crônico de lixo, entulho e caçambas. Quatis, ratos e escorpiões relatados.',
    address: 'Em frente à portaria da EACH-USP — Rua Arlindo Béttio',
    lng: -46.3613,
    lat: -23.5153,
    Icon: Trash2,
    color: '#f87171',
    bg: 'rgba(248,113,113,0.15)',
    border: 'rgba(248,113,113,0.4)',
    tag: 'Descarte irregular',
  },
  {
    id: 'keralux',
    label: 'Jardim Keralux',
    description: 'Bairro residencial com alta incidência de descarte irregular e ausência de coleta seletiva.',
    address: 'Jardim Keralux — Ermelino Matarazzo, São Paulo',
    lng: -46.3738,
    lat: -23.5182,
    Icon: MapPin,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.15)',
    border: 'rgba(52,211,153,0.4)',
    tag: 'Área afetada',
  },
]

function PulsingDot({ color }) {
  return (
    <div className="relative flex items-center justify-center">
      <span
        className="absolute inline-flex h-10 w-10 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-5 w-5 rounded-full border-2 border-white shadow-lg"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

function MarkerPin({ Icon, color, bg, border }) {
  return (
    <div
      className="flex items-center justify-center w-9 h-9 rounded-full shadow-xl border-2 cursor-pointer transition-transform hover:scale-110"
      style={{ background: bg, borderColor: border, boxShadow: `0 0 14px ${color}55` }}
    >
      <Icon style={{ color }} className="w-4 h-4" />
    </div>
  )
}

export default function MapaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [activeMarker, setActiveMarker] = useState(null)

  return (
    <section id="mapa" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            <Navigation className="w-3 h-3" />
            Localização no Mapa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Onde fica o{' '}
            <span className="text-gradient">Jardim Keralux</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ermelino Matarazzo, Zona Leste de São Paulo. O ponto viciado de descarte irregular fica a metros da portaria da EACH-USP.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {MARKERS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMarker(activeMarker === m.id ? null : m.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950"
              style={{
                background: activeMarker === m.id ? m.bg : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeMarker === m.id ? m.border : 'rgba(255,255,255,0.1)'}`,
                color: activeMarker === m.id ? m.color : '#94a3b8',
                focusRingColor: m.color,
              }}
            >
              <m.Icon className="w-3 h-3" />
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
          style={{ height: '480px' }}
        >
          <Map
            center={[-46.366, -23.516]}
            zoom={14}
            theme="dark"
          >
            <MapControls showZoom position="bottom-right" />

            {MARKERS.map((m) => (
              <MapMarker key={m.id} longitude={m.lng} latitude={m.lat}>
                <MarkerContent>
                  <MarkerPin Icon={m.Icon} color={m.color} bg={m.bg} border={m.border} />
                </MarkerContent>
                <MarkerPopup closeButton>
                  <div className="space-y-2 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: m.bg, border: `1px solid ${m.border}` }}
                      >
                        <m.Icon className="w-3 h-3" style={{ color: m.color }} />
                      </div>
                      <span className="font-bold text-sm" style={{ color: '#f1f5f9' }}>{m.label}</span>
                    </div>
                    <span
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}
                    >
                      {m.tag}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{m.description}</p>
                    <p className="text-[10px] font-medium" style={{ color: '#64748b' }}>{m.address}</p>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
        >
          {MARKERS.map((m) => (
            <div
              key={m.id}
              className="glass rounded-xl p-4 flex items-start gap-3 border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: m.bg, border: `1px solid ${m.border}` }}
              >
                <m.Icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200 mb-0.5">{m.label}</p>
                <p className="text-xs text-slate-500 leading-snug">{m.address}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
