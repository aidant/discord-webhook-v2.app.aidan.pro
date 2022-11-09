import type { Action } from 'svelte/action'

export const motion: Action<Window> = (el) => {
  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth - 0.5) / 0.5
    const y = (event.clientY / window.innerHeight - 0.5) / 0.5
    el.document.documentElement.style.setProperty('--motion-x', x.toString())
    el.document.documentElement.style.setProperty('--motion-y', y.toString())
  }

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!event.beta || !event.gamma) return
    const x = (event.gamma / 90) * 2.5
    const y = ((event.beta - 45) / 90) * 2.5
    el.document.documentElement.style.setProperty('--motion-x', x.toString())
    el.document.documentElement.style.setProperty('--motion-y', y.toString())
  }

  const removeMouseMove = () => el.removeEventListener('mousemove', handleMouseMove)

  el.document.documentElement.style.setProperty('--motion-x', '0')
  el.document.documentElement.style.setProperty('--motion-y', '0')

  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('deviceorientation', removeMouseMove, { once: true })
  el.addEventListener('deviceorientation', handleDeviceOrientation)
  return {
    destroy: () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('deviceorientation', removeMouseMove)
      el.removeEventListener('deviceorientation', handleDeviceOrientation)
    },
  }
}
