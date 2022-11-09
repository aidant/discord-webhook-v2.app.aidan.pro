import type { Action } from 'svelte/action'

export const text: Action<Window, Record<string, string>> = (el, options = {}) => {
  const element = el.document.createElement('span')
  element.style.whiteSpace = 'pre'
  el.document.body.append(element)

  for (const [label, value] of Object.entries(options)) {
    element.innerText = value
    const width = element.getBoundingClientRect().width
    el.document.documentElement.style.setProperty(`--text-width-${label}`, width.toString())
  }

  element.remove()
}
