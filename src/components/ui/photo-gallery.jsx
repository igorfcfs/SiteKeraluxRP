import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react'

const SWIPE_THRESHOLD = 50
const THUMB_SCROLL_STEP = 180

export default function PhotoGallery({ photos }) {
  const [index, setIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const touchStart = useRef(null)
  const stripRef = useRef(null)
  const thumbRefs = useRef([])
  const reduceMotion = useReducedMotion()
  const total = photos.length

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + total) % total)
  }, [total])

  const updateScrollState = useCallback(() => {
    const el = stripRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 6)
    setCanScrollRight(el.scrollLeft < maxScroll - 6)
  }, [])

  const scrollStrip = useCallback((direction) => {
    const el = stripRef.current
    if (!el) return
    el.scrollBy({
      left: direction * THUMB_SCROLL_STEP,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [reduceMotion])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  useEffect(() => {
    const el = stripRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, total])

  useEffect(() => {
    const thumb = thumbRefs.current[index]
    if (!thumb) return

    thumb.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })

    requestAnimationFrame(updateScrollState)
  }, [index, reduceMotion, updateScrollState])

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
    'absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/80 dark:bg-slate-950/70 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900/90 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50'

  const stripNavBtn =
    'absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/30 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/40 shadow-lg'

  return (
    <div className="w-full select-none">
      <div
        className="relative rounded-2xl overflow-hidden glass border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-slate-900/40 shadow-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-200 dark:bg-slate-900">
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

          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 dark:from-slate-950/90 via-slate-50/20 dark:via-slate-950/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-medium leading-snug line-clamp-3 flex items-start gap-2">
              <Camera className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden />
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
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums shrink-0 min-w-[4.5rem]">
          {index + 1} <span className="text-slate-500 font-normal">de</span> {total}
        </span>
        <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-white/8 overflow-hidden" aria-hidden>
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="relative mt-3">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-14 bg-gradient-to-r from-slate-50 dark:from-slate-950 via-slate-50/80 dark:via-slate-950/80 to-transparent transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-14 bg-gradient-to-l from-slate-50 dark:from-slate-950 via-slate-50/80 dark:via-slate-950/80 to-transparent transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden
        />

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollStrip(-1)}
            className={`${stripNavBtn} left-1`}
            aria-label="Rolar miniaturas para a esquerda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollStrip(1)}
            className={`${stripNavBtn} right-1`}
            aria-label="Rolar miniaturas para a direita"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <div
          ref={stripRef}
          className="gallery-thumb-strip flex gap-2.5 py-2 px-1 overflow-x-auto scrollbar-none snap-x snap-mandatory touch-pan-x"
          role="tablist"
          aria-label="Miniaturas da galeria"
        >
          {photos.map((photo, i) => {
            const isActive = i === index
            return (
              <button
                key={`${i}-${photo.alt}`}
                ref={(el) => { thumbRefs.current[i] = el }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Foto ${i + 1}: ${photo.alt}`}
                onClick={() => setIndex(i)}
                className={`snap-center shrink-0 w-[3.75rem] h-[3.75rem] sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  isActive
                    ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950 opacity-100 scale-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                    : 'opacity-45 hover:opacity-75 scale-[0.97] hover:scale-100'
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
    </div>
  )
}
