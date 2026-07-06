import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react'

const SWIPE_THRESHOLD = 50

export default function PhotoGallery({ photos }) {
  const [index, setIndex] = useState(0)
  const touchStart = useRef(null)
  const reduceMotion = useReducedMotion()
  const total = photos.length

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + total) % total)
  }, [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const diff = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(diff) > SWIPE_THRESHOLD) go(diff > 0 ? -1 : 1)
    touchStart.current = null
  }

  if (!total) return null

  const current = photos[index]
  const progress = ((index + 1) / total) * 100

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-slate-900/90 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50'

  return (
    <div className="w-full select-none">
      <div
        className="relative rounded-2xl overflow-hidden glass border border-white/10 bg-slate-900/40 shadow-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-900">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={current.imgUrl}
              alt={current.alt}
              loading={index < 3 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              draggable={false}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-snug line-clamp-3 flex items-start gap-2">
              <Camera className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden />
              {current.alt}
            </p>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            className={`${navBtn} left-2 sm:left-4`}
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className={`${navBtn} right-2 sm:right-4`}
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 px-1">
        <span className="text-sm font-semibold text-slate-300 tabular-nums shrink-0">
          {index + 1} <span className="text-slate-500 font-normal">de</span> {total}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden" aria-hidden>
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="flex gap-2 mt-4 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1 snap-x snap-mandatory"
        role="tablist"
        aria-label="Miniaturas da galeria"
      >
        {photos.map((photo, i) => {
          const isActive = i === index
          return (
            <button
              key={photo.alt}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Foto ${i + 1}: ${photo.alt}`}
              onClick={() => setIndex(i)}
              className={`snap-start shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                isActive
                  ? 'border-cyan-400 opacity-100 scale-105'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={photo.imgUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
