import type { Action } from 'svelte/action'
import type { KebabCase } from 'type-fest'

export const style: Action<
  HTMLElement,
  { name?: string; styles?: KebabCase<keyof CSSStyleDeclaration>[]; observe?: 'resize'[] }
> = (el, { name, styles = [], observe = [] } = {}) => {
  const setStyles = () => {
    const style = (el.ownerDocument.defaultView || window).getComputedStyle(el)
    const root = name ? el.ownerDocument.documentElement : el
    const prefix = name ? `--style-${name}-` : '--style-'

    for (const key of styles) {
      root.style.setProperty(
        `${prefix}${key as string}`,
        style.getPropertyValue(key as string).replace(/px$/, ''),
      )
    }
  }

  setStyles()

  const set: Function[] = []
  const del: Function[] = []

  if (observe.includes('resize')) {
    const observer = new ResizeObserver(() => setStyles())
    set.push(() => observer.observe(el))
    del.push(() => observer.unobserve(el))
  }

  for (const cb of set) cb()
  return {
    destroy: () => {
      for (const cb of del) cb()
    },
  }
}
