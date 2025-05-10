// src/components/event-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

type EventItem = {
  id: string | number;
  slug?: string;
  image?: string | null;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
};

interface EventCardProps {
  event: EventItem;
  variant?: 'default' | 'featured';
  className?: string;
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const eventUrl = event.slug ? `/events/${event.slug}` : `/events/${event.id}`;
  const isFeatured = variant === 'featured';

  const EventImageContent = (
    <Image
      src={event.image || "/images/placeholder.jpg"}
      alt={`Image for ${event.title}`}
      fill
      className={`object-cover ${!isFeatured ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
    />
  );

  const TextualContent = () => (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
        <CalendarDays className="h-4 w-4 flex-shrink-0" />
        <span>{event.date}</span>
      </div>
      <h3 className={`mb-2 font-bold line-clamp-2 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl group-hover:text-primary transition-colors'}`}>
        {event.title}
      </h3>
      <p className={`text-sm text-muted-foreground flex-grow ${isFeatured ? 'line-clamp-4 md:line-clamp-5 mb-6' : 'line-clamp-3 mb-4'}`}>
        {event.description}
      </p>
      <div className={`space-y-1 text-sm ${isFeatured ? 'mb-6' : 'mb-4'}`}>
        {event.time && (
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
        )}
        {event.location && (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </>
  );

  const DetailsButton = (
    <Button
      asChild
      size={isFeatured ? "lg" : undefined}
      variant={isFeatured ? "default" : "outline"}
      className={!isFeatured ? "w-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800" : ""}
    >
      <Link href={eventUrl}>Event details</Link>
    </Button>
  );

  if (isFeatured) {
    return (
      <div className={`overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm ${className || ''}`}>
        <div className="grid md:grid-cols-2">
          {/* Featured Image Section - Wrapped in Link */}
          <Link href={eventUrl} aria-label={`View details for ${event.title}`} className="block h-full"> {/* ADDED h-full */}
            <div className="relative min-h-[300px] h-full"> {/* CHANGED md:min-h-full to h-full */}
              {EventImageContent}
            </div>
          </Link>
          {/* Featured Content & Button Section */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <TextualContent />
            {DetailsButton}
          </div>
        </div>
      </div>
    );
  }

  // Default card layout
  return (
    <Card className={`flex flex-col h-full overflow-hidden group ${className || ''}`}>
      <Link href={eventUrl} aria-label={`View details for ${event.title}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {EventImageContent}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        <TextualContent />
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 mt-auto">
        {DetailsButton}
      </CardFooter>
    </Card>
  );
}

export type { EventItem as EventCardType };
