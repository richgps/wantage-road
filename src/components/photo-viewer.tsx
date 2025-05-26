"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";

interface SanityPhoto extends SanityImage {
  caption?: string;
  alt?: string;
  description?: string;
}

interface PhotoViewerProps {
  photos: SanityPhoto[];
  initialIndex: number;
  onClose: () => void;
  title?: string; // album title (unused for now)
}

export default function PhotoViewer({
  photos,
  initialIndex,
  onClose,
}: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const builder = createImageUrlBuilder(client);
  function urlFor(source: SanityPhoto) {
    return builder.image(source);
  }

  const navigateNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const navigatePrev = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") navigatePrev();
      else if (e.key === "ArrowRight") navigateNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, navigatePrev, navigateNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) navigatePrev();
        else navigateNext();
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigatePrev, navigateNext]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* Close */}
      <button
        aria-label="Close photo viewer"
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <X className="h-6 w-6" />
      </button>


      {/* Navigation */}
      <button
        aria-label="Previous photo"
        onClick={navigatePrev}
        className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        aria-label="Next photo"
        onClick={navigateNext}
        className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Image */}
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <Image
            src={urlFor(currentPhoto).url() || "/placeholder.svg"}
            alt={currentPhoto.alt ?? ""}
            width={1200}
            height={800}
            priority
            className={`max-h-[90vh] w-auto object-contain transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
          />

        </div>
      </div>

      {/* Info below image */}
      <div className="mt-4 text-center text-white">
        <p className="text-sm mb-1 text-gray-300">
          {currentIndex + 1} of {photos.length}
        </p>
        {currentPhoto.caption && (
          <h3 className="text-lg font-semibold">{currentPhoto.caption}</h3>
        )}
        {currentPhoto.description && (
          <p className="text-sm mt-1">{currentPhoto.description}</p>
        )}
      </div>
    </div>
  );
}
