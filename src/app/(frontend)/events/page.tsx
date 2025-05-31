// src/app/(frontend)/events/page.tsx
import { EventCard, EventCardType } from "@/components/event-card";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";

export default async function EventsPage() {
  const sanityEventsData = await sanityFetch<{ data: EventCardType[] | null }>({
    query: ALL_EVENTS_QUERY,
  });

  const allEvents: EventCardType[] = sanityEventsData.data || [];

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Normalize to date only

  const upcomingEvents = allEvents.filter(event => {
    const startDate = new Date(event.eventDateTime);
    const endDate = event.eventEndDateTime ? new Date(event.eventEndDateTime) : null;

    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      : null;

    return start >= today || (end && end >= today);
  });

  const pastEvents = allEvents.filter(event => {
    const startDate = new Date(event.eventDateTime);
    const endDate = event.eventEndDateTime ? new Date(event.eventEndDateTime) : null;

    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      : null;

    return (!end && start < today) || (end && end < today);
  });

  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const otherEvents = upcomingEvents.length > 1 ? upcomingEvents.slice(1) : [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Upcoming events</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join us for these upcoming community events and activities
        </p>
      </div>

      {upcomingEvents.length === 0 && (
        <p className="text-center text-muted-foreground text-lg py-8">
          No upcoming events scheduled at the moment. Please check back soon!
        </p>
      )}

      {featuredEvent && (
        <EventCard
          event={featuredEvent}
          variant="featured"
          className="mb-12"
        />
      )}

      {otherEvents.length > 0 && (
        <div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherEvents.map((event) => (
              <EventCard key={event._id.toString()} event={event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mt-16">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Past events</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Here’s a look back at some of our recent community events and celebrations.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event._id.toString()} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
