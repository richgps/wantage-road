// src/app/(frontend)/events/page.tsx
import { EventCard, EventCardType } from "@/components/event-card"; // EventCardType is RawSanityEventProps
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";

// Mock events array is no longer needed
// const events: EventCardType[] = [ ... ];

export default async function EventsPage() {
  // Fetch all upcoming events from Sanity
  // EventCardType here effectively means RawSanityEventProps from event-card.tsx
  const sanityEventsData = await sanityFetch<{ data: EventCardType[] | null }>({ 
    query: ALL_EVENTS_QUERY,
    // Add perspective: 'published' if you only want published data
    // and revalidate tags if you want to use Next.js ISR
  });
  const allEvents: EventCardType[] = sanityEventsData.data || [];

  const featuredEvent = allEvents.length > 0 ? allEvents[0] : null;
  const otherEvents = allEvents.length > 1 ? allEvents.slice(1) : [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Upcoming events</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join us for these upcoming community events and activities
        </p>
      </div>

      {allEvents.length === 0 && (
         <p className="text-center text-muted-foreground text-lg py-8">
            No upcoming events scheduled at the moment. Please check back soon!
         </p>
      )}

      {featuredEvent && (
        <EventCard
          // The event prop expects RawSanityEventProps, which `featuredEvent` now is
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
              // Use event._id from Sanity for a unique and stable key
              <EventCard key={event._id.toString()} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
