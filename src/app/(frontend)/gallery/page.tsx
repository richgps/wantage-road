import PhotoAlbum from "@/components/photo-album";
import "./gallery.css"
import { client } from "@/sanity/lib/client";
import { Album } from "@/sanity/types";

async function getAlbums(): Promise<Album[]> {
  const query = `*[_type == "album"] {
    _id,
    title,
    slug,
    description,
    albumDate,
    images[]{
      _key,
      asset->{url},
      hotspot,
      crop,
      caption,
      alt,
      description
    }
  }`;
  const albums = await client.fetch(query);
  return albums;
}

export default async function GalleryPage() {
  const albums = await getAlbums();
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Photo gallery</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">Memories from our community events and activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <PhotoAlbum
            key={album._id}
            title={album.title}
            albumDate={album.albumDate}
            description={album.description}
            images={album.images}
          />
        ))}
      </div>
    </div>
  )
}
