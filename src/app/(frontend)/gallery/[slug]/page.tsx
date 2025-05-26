import { sanityFetch } from "@/sanity/lib/live";
import { ALBUM_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Album } from "@/sanity/types";
import { notFound } from "next/navigation";
import AlbumViewer from "@/components/album-viewer";

export default async function AlbumPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const result = await sanityFetch<{ data: Album | null }>({
    query: ALBUM_BY_SLUG_QUERY,
    params: { slug },
  });

  const album = result.data;
  if (!album) {
    notFound();
  }

  return <AlbumViewer photos={album.images || []} title={album.title} />;
}
