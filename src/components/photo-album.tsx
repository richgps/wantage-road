"use client"

import Image from "next/image"
import { useState } from "react"
import { CalendarDays } from "lucide-react";
import { PhotoProvider, PhotoSlider } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";
import { formatEventDate } from "@/lib/date-utils";

interface SanityPhoto extends SanityImage {
  alt?: string;
}

interface PhotoAlbumProps {
  title: string
  albumDate: string // Changed from 'date' to 'albumDate' to match schema
  description?: string // Made optional as per schema
  images?: SanityPhoto[] // Use SanityPhoto array
}

export default function PhotoAlbum({ title, albumDate, description, images: photos }: PhotoAlbumProps) {

  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  // Add a check to ensure photos is an array before proceeding
  if (!Array.isArray(photos) || photos.length === 0) {
    return null // Or return <div />; depending on desired behavior for albums with no photos
  }

  // Create image URL builder instance
  const builder = createImageUrlBuilder(client);

  function urlFor(source: SanityPhoto) {
    return builder.image(source);
  }

  // Determine how many photos to show in the grid (max 5)
  const displayPhotos = photos.slice(0, Math.min(5, photos.length));
  const remainingCount = photos.length - displayPhotos.length;


  const images = photos.map((p) => ({
    src: urlFor(p).url() || "/placeholder.svg",
    alt: p.alt || "",
  }))

  return (
    <PhotoProvider>
      <div className="mb-6 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" />
            <span>{formatEventDate(albumDate)}</span>
          </div>
          <h2 className="mb-2 text-xl font-bold">{title}</h2>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[240px]">
        {displayPhotos.length === 2 && (
          <>
            <div
              className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(0)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[0]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[0].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-2 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(1)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[1]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[1].alt || ""}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length === 3 && (
          <>
            <div
              className="col-span-3 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(0)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[0]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[0].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(1)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[1]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[1].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(2)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[2]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[2].alt || ""}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length === 4 && (
          <>
            <div
              className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(0)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[0]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[0].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(1)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[1]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[1].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(2)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[2]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[2].alt || ""}
                fill
                className="object-cover"
              />
            </div>
          </>
        )}

        {displayPhotos.length >= 5 && (
          <>
            <div
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(0)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[0]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[0].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(1)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[1]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[1].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(2)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[2]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[2].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(3)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[3]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[3].alt || ""}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer"
              onClick={() => {
                setIndex(4)
                setVisible(true)
              }}
            >
              <Image
                src={urlFor(displayPhotos[4]).width(300).url() || "/placeholder.svg"}
                alt={displayPhotos[4].alt || ""}
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
      </div>

      <PhotoSlider
        images={images}
        visible={visible}
        index={index}
        onClose={() => setVisible(false)}
        onIndexChange={setIndex}
      />
    </PhotoProvider>
  )
}
