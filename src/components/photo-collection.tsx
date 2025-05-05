"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarDays } from "lucide-react"
import PhotoViewer from "./photo-viewer"

interface Photo {
  src: string
  alt: string
}

interface PhotoCollectionProps {
  title: string
  date: string
  description: string
  photos: Photo[]
  link?: string
  linkType?: "blog" | "event"
}

export default function PhotoCollection({ title, date, description, photos, link, linkType }: PhotoCollectionProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0)

  const openViewer = (index: number) => {
    setInitialPhotoIndex(index)
    setViewerOpen(true)
  }

  // Determine how many photos to show in the grid (max 5)
  const displayPhotos = photos.slice(0, Math.min(5, photos.length))
  const remainingCount = photos.length - displayPhotos.length

  return (
    <div className="mb-6 overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <CalendarDays className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[240px]">
        {displayPhotos.length === 2 && (
          <>
            <div
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(0)}
            >
              <Image
                src={displayPhotos[0].src || "/placeholder.svg"}
                alt={displayPhotos[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-2 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(1)}
            >
              <Image
                src={displayPhotos[1].src || "/placeholder.svg"}
                alt={displayPhotos[1].alt}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length === 3 && (
          <>
            <div
              className="col-span-3 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(0)}
            >
              <Image
                src={displayPhotos[0].src || "/placeholder.svg"}
                alt={displayPhotos[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(1)}
            >
              <Image
                src={displayPhotos[1].src || "/placeholder.svg"}
                alt={displayPhotos[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-2 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(2)}
            >
              <Image
                src={displayPhotos[2].src || "/placeholder.svg"}
                alt={displayPhotos[2].alt}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length === 4 && (
          <>
            <div
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(0)}
            >
              <Image
                src={displayPhotos[0].src || "/placeholder.svg"}
                alt={displayPhotos[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(1)}
            >
              <Image
                src={displayPhotos[1].src || "/placeholder.svg"}
                alt={displayPhotos[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(2)}
            >
              <Image
                src={displayPhotos[2].src || "/placeholder.svg"}
                alt={displayPhotos[2].alt}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length >= 5 && (
          <>
            <div
              className="col-span-2 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(0)}
            >
              <Image
                src={displayPhotos[0].src || "/placeholder.svg"}
                alt={displayPhotos[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(1)}
            >
              <Image
                src={displayPhotos[1].src || "/placeholder.svg"}
                alt={displayPhotos[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(2)}
            >
              <Image
                src={displayPhotos[2].src || "/placeholder.svg"}
                alt={displayPhotos[2].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(3)}
            >
              <Image
                src={displayPhotos[3].src || "/placeholder.svg"}
                alt={displayPhotos[3].alt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden"
              onClick={() => openViewer(4)}
            >
              <Image
                src={displayPhotos[4].src || "/placeholder.svg"}
                alt={displayPhotos[4].alt}
                fill
                className="object-cover"
              />
              {remainingCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <span className="text-2xl font-bold">+{remainingCount}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {viewerOpen && (
        <PhotoViewer
          photos={photos}
          initialIndex={initialPhotoIndex}
          onClose={() => setViewerOpen(false)}
          title={title}
        />
      )}
    </div>
  )
}
