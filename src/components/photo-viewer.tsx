"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  src: string
  alt: string
}

interface PhotoViewerProps {
  photos: Photo[]
  initialIndex: number
  onClose: () => void
  title?: string
}

export default function PhotoViewer({ photos, initialIndex, onClose, title }: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, onClose])

  // Prevent scrolling when viewer is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const navigateNext = () => {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const navigatePrev = () => {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        aria-label="Close photo viewer"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 z-[110] text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-300">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <button
        onClick={navigatePrev}
        className="absolute left-4 z-[110] rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={navigateNext}
        className="absolute right-4 z-[110] rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Photo */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <Image
            src={photos[currentIndex].src || "/placeholder.svg"}
            alt={photos[currentIndex].alt}
            width={1200}
            height={800}
            className={`max-h-[90vh] w-auto object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>
      </div>
    </div>
  )
}
