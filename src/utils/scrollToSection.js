function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(href) {
  const id = href.replace(/^#/, '')
  if (!id) return false

  const el = document.getElementById(id)
  if (!el) return false

  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

  if (id === 'inicio') {
    window.scrollTo({ top: 0, left: 0, behavior })
  } else {
    el.scrollIntoView({ behavior, block: 'start' })
  }

  if (window.location.hash !== `#${id}`) {
    history.pushState(null, '', `#${id}`)
  }

  return true
}

export function handleSectionNavClick(event, href, { closeMenu } = {}) {
  event.preventDefault()

  const runScroll = () => scrollToSection(href)

  if (closeMenu) {
    closeMenu()
    // Aguarda o menu mobile recolher antes de calcular a posição do scroll
    window.setTimeout(runScroll, 280)
  } else {
    runScroll()
  }
}
