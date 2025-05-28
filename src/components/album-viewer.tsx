"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";

interface SanityPhoto extends SanityImage {
  alt?: string;
}

export default function AlbumViewer({ photos }: { photos: SanityPhoto[] }) {
  const [index, setIndex] = useState(-1);

  const builder = createImageUrlBuilder(client);

  const images = photos.map((p) => ({
    src: builder.image(p).url() || "/placeholder.svg",
    alt: p.alt ?? "",
  }));

  return (
    <div className="container py-12">
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((photo, i) => (
          <div
            key={photo._key ?? i}
            className="relative aspect-square cursor-pointer overflow-hidden"
            onClick={() => setIndex(i)}
          >
            <Image
              src={builder.image(photo).width(400).height(400).url() || "/placeholder.svg"}
              alt={photo.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <PhotoSlider
        images={images}
        visible={index >= 0}
        index={Math.max(index, 0)}
        onClose={() => setIndex(-1)}
        onIndexChange={setIndex}
      />
    </div>
  );
}

