'use client'

import { useEffect, useRef } from 'react'
import { event } from '@/libs/gtab'

interface Options {
  action: string
  category?: string
  label?: string
  threshold?: number // 0 à 1 (ex: 0.5 = 50% visible)
  delay?: number // min de temps en ms avant de trigger l'event
}

export function useViewTracker({ action, category, label, threshold = 0.5, delay = 1000 }: Options) {
  const ref = useRef<HTMLElement | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const hasSent = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof window === 'undefined' || hasSent.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer.current = setTimeout(() => {
            if (!hasSent.current) {
              event({ 
                action, 
                category: category || 'default', 
                label: label || 'default',
                value: 1 
              })
              hasSent.current = true
            }
          }, delay)
        } else {
          if (timer.current) clearTimeout(timer.current)
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timer.current) clearTimeout(timer.current)
    }
  }, [action, category, label, threshold, delay])

  return ref
}
