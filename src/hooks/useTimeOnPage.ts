'use client'

import { useEffect, useRef } from 'react'
import { event } from '@/libs/gtab'

export function useTimeOnPage({ label = 'page', threshold = 10_000 } = {}) {
  const start = useRef<number | null>(null)

  useEffect(() => {
    start.current = Date.now()

    const handleBeforeUnload = () => {
      if (!start.current) return
      const duration = Date.now() - start.current
      if (duration >= threshold) {
        event({
          action: 'time_on_page',
          category: 'engagement',
          label,
          value: Math.round(duration / 1000),
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      handleBeforeUnload()
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [label, threshold])
}
