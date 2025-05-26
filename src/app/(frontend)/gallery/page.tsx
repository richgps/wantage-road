import PhotoAlbum from "@/components/photo-album";
import "./gallery.css";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_ALBUMS_QUERY } from "@/sanity/lib/queries";
import { Album } from "@/sanity/types";

export default async function GalleryPage() {
  const sanityAlbumsData = await sanityFetch<{ data: Album[] | null }>({
    query: GALLERY_ALBUMS_QUERY,
  });

  const albums = sanityAlbumsData.data || [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Photo gallery</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Memories from our community events and activities
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <PhotoAlbum
            key={album._id}
            title={album.title}
            slug={album.slug}
            albumDate={album.albumDate}
            description={album.description}
            images={album.images}
          />
        ))}
      </div>
    </div>
  );
}