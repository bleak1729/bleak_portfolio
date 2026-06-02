import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    // Store the element that triggered the modal
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus first focusable element in the container
    const container = containerRef.current
    if (!container) return
    const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE)
    focusable[0]?.focus()

    // Trap Tab / Shift+Tab inside container
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to the triggering element when modal closes
      previousFocusRef.current?.focus()
    }
  }, [active])

  return containerRef
}
