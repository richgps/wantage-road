"use client"
import PhotoCollection from "@/components/photo-collection"
import "./gallery.css"

// Sample data for photo collections with different sizes
const photoCollections = [
  {
    id: "annual-street-party-2023",
    title: "Annual street party 2023",
    date: "July 5th, 2023",
    description:
      "Highlights from our biggest community event of the year with music, food, and activities for all ages.",
    photos: [
      {
        src: "/images/street-party-1.png",
        alt: "Street Party with bubbles",
      },
      {
        src: "/images/street-party-2.png",
        alt: "Community gathering with bunting",
      },
      {
        src: "/images/street-party-3.png",
        alt: "Music performance at street party",
      },
      {
        src: "/images/street-party-1.png",
        alt: "Children playing at street party",
      },
      {
        src: "/images/street-party-2.png",
        alt: "Street decorated with bunting",
      },
      {
        src: "/images/street-party-3.png",
        alt: "Food stalls at the street party",
      },
      {
        src: "/images/street-party-1.png",
        alt: "Community dancing",
      },
      {
        src: "/images/street-party-2.png",
        alt: "Face painting activity",
      },
      {
        src: "/images/street-party-3.png",
        alt: "Local band performance",
      },
      {
        src: "/images/bloom-sign.png",
        alt: "Event signage",
      },
    ],
    link: "/events/1",
    linkType: "event",
  },
  {
    id: "wantage-road-in-bloom-2023",
    title: "Wantage Road in Bloom 2023",
    date: "June 15th, 2023",
    description: "Beautiful gardens and floral displays from our annual community gardening initiative.",
    photos: [
      {
        src: "/images/bloom-sign.png",
        alt: "Wantage Road in Bloom sign",
      },
      {
        src: "/images/street-party-2.png",
        alt: "Garden display with flowers",
      },
    ],
    link: "/blog/wantage-road-in-bloom",
    linkType: "blog",
  },
  {
    id: "summer-gardening-workshop",
    title: "Summer gardening workshop",
    date: "May 20th, 2023",
    description: "Learning gardening tips and techniques from local experts at our community workshop.",
    photos: [
      {
        src: "/images/street-party-3.png",
        alt: "Gardening workshop participants",
      },
      {
        src: "/images/bloom-sign.png",
        alt: "Planting demonstration",
      },
      {
        src: "/images/street-party-1.png",
        alt: "Garden tools and supplies",
      },
    ],
    link: "/events/2",
    linkType: "event",
  },
  {
    id: "neighborhood-cleanup-day",
    title: "Neighbourhood cleanup day",
    date: "April 22nd, 2023",
    description: "Volunteers working together to clean up our community spaces and make Wantage Road beautiful.",
    photos: [
      {
        src: "/images/street-party-2.png",
        alt: "Volunteers picking up litter",
      },
      {
        src: "/images/street-party-1.png",
        alt: "Community cleanup team",
      },
      {
        src: "/images/street-party-3.png",
        alt: "Cleanup supplies and equipment",
      },
      {
        src: "/images/bloom-sign.png",
        alt: "Before and after cleanup comparison",
      },
    ],
    link: "/events/3",
    linkType: "event",
  },
  {
    id: "winter-holiday-celebration",
    title: "Winter holiday celebration",
    date: "December 12th, 2023",
    description: "Our community coming together to celebrate the holiday season with festive activities and treats.",
    photos: Array(15)
      .fill(null)
      .map((_, i) => ({
        src:
          i % 3 === 0
            ? "/images/street-party-1.png"
            : i % 3 === 1
              ? "/images/street-party-2.png"
              : "/images/street-party-3.png",
        alt: `Winter celebration photo ${i + 1}`,
      })),
    link: "/events/4",
    linkType: "event",
  },
]

export default function GalleryPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Photo gallery</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">Memories from our community events and activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photoCollections.map((collection) => (
          <PhotoCollection
            key={collection.id}
            title={collection.title}
            date={collection.date}
            description={collection.description}
            photos={collection.photos}
            link={collection.link}
            linkType={collection.linkType}
          />
        ))}
      </div>
    </div>
  )
}
