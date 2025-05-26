"use client";
import { useRouter } from "next/navigation";
import PhotoViewer from "./photo-viewer";
import { type Image as SanityImage } from "sanity";

interface SanityPhoto extends SanityImage {
  caption?: string;
  alt?: string;
  description?: string;
}

export default function AlbumViewer({ photos, title }: { photos: SanityPhoto[]; title?: string }) {
  const router = useRouter();
  return (
    <PhotoViewer
      photos={photos}
      initialIndex={0}
      onClose={() => router.push("/gallery")}
      title={title}
    />
  );
}
