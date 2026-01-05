'use client'

import { useEffect, useRef } from 'react'
import { event } from '@/libs/gtab'

interface Props {
  action: string
  category?: string
  label?: string
  threshold?: number // % visible
  minDuration?: number // min de temps pour envoyer l'event
}

export function useTimeInSection({ action, category, label, threshold = 0.5, minDuration = 1000 }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const entryTime = useRef<number | null>(null)
  const hasSent = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entryTime.current = Date.now()
        } else {
          if (entryTime.current && !hasSent.current) {
            const duration = Date.now() - entryTime.current
            if (duration >= minDuration) {
              event({
                action,
                category: category ?? '',
                label: label ?? '',
                value: Math.round(duration / 1000),
              })
              hasSent.current = true
            }
            entryTime.current = null
          }
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [action, category, label, threshold, minDuration])

  return ref
}
