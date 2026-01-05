"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function HorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { dictionary } = useLanguage()
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const items = [
    { id: 1, title: dictionary.showcase.item1.title, description: dictionary.showcase.item1.description },
    { id: 2, title: dictionary.showcase.item2.title, description: dictionary.showcase.item2.description },
    { id: 3, title: dictionary.showcase.item3.title, description: dictionary.showcase.item3.description },
    { id: 4, title: dictionary.showcase.item4.title, description: dictionary.showcase.item4.description },
    { id: 5, title: dictionary.showcase.item5.title, description: dictionary.showcase.item5.description },
    { id: 6, title: dictionary.showcase.item6.title, description: dictionary.showcase.item6.description },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollLeft -= scrollAmount
      } else {
        current.scrollLeft += scrollAmount
      }

      // Check if we can scroll more in either direction
      setTimeout(() => {
        if (current) {
          setShowLeftArrow(current.scrollLeft > 0)
          setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
        }
      }, 100)
    }
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 py-4 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={() => {
          if (scrollRef.current) {
            const { current } = scrollRef
            setShowLeftArrow(current.scrollLeft > 0)
            setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
          }
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[280px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}
