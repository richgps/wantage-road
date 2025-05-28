"use client";

import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { type Image as SanityImage } from "sanity";

interface SanityPhoto extends SanityImage {
  alt?: string;
}

interface PhotoViewerProps {
  photos: SanityPhoto[];
  index: number;
  visible: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function PhotoViewer({ photos, index, visible, onClose, onIndexChange }: PhotoViewerProps) {
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
        onClose={onClose}
        index={index}
        onIndexChange={onIndexChange}
      />
    </PhotoProvider>
  );
}
