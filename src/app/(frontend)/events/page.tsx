import { EventCard, EventCardType } from "@/components/event-card";

const events: EventCardType[] = [
  {
    id: 1, // Keep id as string or number based on your preference for keys
    slug: "annual-street-party", // Added slug
    title: "Annual street party",
    date: "July 5th, 2025",
    time: "12:00 PM - 6:00 PM",
    location: "Wantage Road, Reading",
    description:
      "Our biggest event of the year! Join us for food, music, games, and a chance to connect with your neighbours. There will be live performances, activities for children, and food stalls.",
    image: "/images/street-party-1.png",
  },
  {
    id: 2,
    slug: "summer-gardening-workshop", // Added slug
    title: "Summer gardening workshop",
    date: "May 15th, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Community Garden, Wantage Road",
    description:
      "Learn gardening tips and tricks from local experts. This workshop will cover summer planting, maintenance, and how to make your garden bloom throughout the season.",
    image: "/images/bloom-sign.png",
  },
  {
    id: 3,
    slug: "neighbourhood-cleanup-day", // Added slug
    title: "Neighbourhood cleanup day",
    date: "April 22nd, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Meeting at Wantage Road Junction",
    description:
      "Join us for our annual neighbourhood cleanup day. We'll be picking up litter, clearing public spaces, and making our community a cleaner, more beautiful place to live.",
    image: "/images/street-party-3.png",
  },
  {
    id: 4,
    slug: "winter-holiday-celebration", // Added slug
    title: "Winter holiday celebration",
    date: "December 12th, 2025",
    time: "4:00 PM - 8:00 PM",
    location: "Wantage Road Community Centre",
    description:
      "Celebrate the holiday season with your neighbours. We'll have hot drinks, festive food, carol singing, and activities for all ages.",
    image: "/images/street-party-2.png",
  },
];

export default function EventsPage() {
  const featuredEvent = events.length > 0 ? events[0] : null;
  const otherEvents = events.length > 1 ? events.slice(1) : [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Upcoming events</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join us for these upcoming community events and activities
        </p>
      </div>

      {featuredEvent && (
        <EventCard
          event={featuredEvent}
          variant="featured"
          className="mb-12"
        />
      )}

      {otherEvents.length > 0 && (
        <div>
          <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl">
            More Events
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherEvents.map((event) => (
              // Ensure event.id is used for the key if it's unique and stable.
              // If slug is guaranteed unique, event.slug could also be used.
              <EventCard key={event.id.toString()} event={event} />
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
         <p className="text-center text-muted-foreground">
            Check back soon for upcoming events!
         </p>
      )}
    </div>
  );
}
