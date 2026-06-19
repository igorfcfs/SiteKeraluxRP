import { Leaf } from 'lucide-react'

const refs = [
  'Magalhães; Cseh; Gonçalves-Dias (2022) — Blucher',
  'Magalhães; Gonçalves-Dias (2023) — Blucher',
  'Lei nº 12.305/2010 — PNRS',
  'Prefeitura SP — Projeto Descarte Correto',
  'Ennes (2025); Mendonça et al. (2025)',
]

const links = [
  { href: '#problema',  label: 'O Problema' },
  { href: '#coleta',    label: 'Sistema de Coleta' },
  { href: '#ecopontos', label: 'Ecopontos' },
  { href: '#impactos',  label: 'Impactos' },
  { href: '#solucoes',  label: 'Soluções' },
  { href: '#direitos',  label: 'Direitos' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-slate-200">Keralux / Vila Guaraciaba</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Projeto de Resolução de Problemas I — EACH-USP (2026). Desenvolvido para disseminar informações sobre gestão de resíduos para moradores da zona leste de São Paulo e comunidades em contexto semelhante.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Seções</h4>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Referências</h4>
            <ul className="space-y-2">
              {refs.map(r => (
                <li key={r} className="text-xs text-slate-500 leading-relaxed">{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Eduardo · Elbio · Eric · Evandro · Gabriel · Gustavo · Igor · Pedro
          </p>
          <a
            href="tel:156"
            className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/15 transition-colors font-semibold"
          >
            📞 156 — Central da Prefeitura SP
          </a>
        </div>
      </div>
    </footer>
  )
}
