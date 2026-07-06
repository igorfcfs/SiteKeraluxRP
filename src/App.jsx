import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemaSection from './components/ProblemaSection'
import ColetaSection from './components/ColetaSection'
import EcopontosSection from './components/EcopontosSection'
import ImpactosSection from './components/ImpactosSection'
import GaleriaSection from './components/GaleriaSection'
import MapaSection from './components/MapaSection'
import SolucoesSection from './components/SolucoesSection'
import DireitosSection from './components/DireitosSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen overflow-x-hidden transition-colors duration-300">
        <Navbar />
        <Hero />
        <ProblemaSection />
        <ColetaSection />
        <EcopontosSection />
        <ImpactosSection />
        <GaleriaSection />
        <MapaSection />
        <SolucoesSection />
        <DireitosSection />
        <Footer />
      </div>
    </MotionConfig>
  )
}
