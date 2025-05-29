"use client";

import { useState } from "react";
import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";

interface SanityPhoto extends SanityImage {
  alt?: string;
}

export default function AlbumViewer({ photos }: { photos: SanityPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const builder = createImageUrlBuilder(client);
  const images = photos.map((p) => ({
    src: builder.image(p).url() || "/placeholder.svg",
    alt: p.alt ?? "",
  }));

  return (
    <PhotoProvider>
      <PhotoSlider
        images={images}
        visible={visible}
        index={index}
        onClose={() => setVisible(false)}
        onIndexChange={setIndex}
      />
    </PhotoProvider>
  );
}
