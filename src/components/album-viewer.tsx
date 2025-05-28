"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";
import PhotoViewer from "./photo-viewer";

interface SanityPhoto extends SanityImage {
  alt?: string;
}

export default function AlbumViewer({ photos }: { photos: SanityPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const builder = createImageUrlBuilder(client);

  return (
    <PhotoProvider>
      <div className="container py-12">
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo, i) => (
            <div
              key={photo._key ?? i}
              className="relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => {
                setIndex(i);
                setVisible(true);
              }}
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
        <PhotoViewer
          photos={photos}
          visible={visible}
          index={index}
          onClose={() => setVisible(false)}
          onIndexChange={setIndex}
        />
      </div>
    </PhotoProvider>
  );
}
