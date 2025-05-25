// src/components/event-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format as formatDateFns, isSameDay } from 'date-fns';
import { formatEventDate } from "@/lib/date-utils";
import { toZonedTime } from 'date-fns-tz'; // Corrected import

export interface RawSanityEventProps {
  _id: string | number;
  slug: string;
  mainImage?: SanityImageSource | null;
  title: string;
  eventDateTime?: string;
  eventEndDateTime?: string;
  timeDisplay?: string | null;
  location?: string;
  description: string;
}

interface EventCardProps {
  event: RawSanityEventProps;
  variant?: 'default' | 'featured';
  className?: string;
}

const timeZone = 'Europe/London';

// Helper function to format time (e.g., 12:00 pm)
function formatTime(isoString?: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const zonedDate = toZonedTime(date, timeZone);
    return formatDateFns(zonedDate, 'hh:mm a').toLowerCase(); // hh:mm a gives AM/PM, toLowerCase for pm/am
  } catch (error) {
    console.error("Error formatting time with date-fns:", error, "Input:", isoString);
    return "Invalid Time";
  }
}

// Helper function to format the full time display string
function getFormattedTimeDisplay(event: RawSanityEventProps): string {
  if (event.timeDisplay) {
    return event.timeDisplay; // Use custom override if present
  }

  if (!event.eventDateTime) {
    return "Time TBD";
  }

  try {
    const zonedStartDate = toZonedTime(new Date(event.eventDateTime), timeZone);
    const startTimeFormatted = formatTime(event.eventDateTime);

    if (!event.eventEndDateTime) {
      return startTimeFormatted; // Only start time known
    }

    const zonedEndDate = toZonedTime(new Date(event.eventEndDateTime), timeZone);
    const endTimeFormatted = formatTime(event.eventEndDateTime);

    if (isSameDay(zonedStartDate, zonedEndDate)) {
      return `${startTimeFormatted} - ${endTimeFormatted}`;
    } else {
      const endDateFormatted = formatEventDate(event.eventEndDateTime);
      return `${startTimeFormatted} - ${endTimeFormatted}, ${endDateFormatted}`;
    }
  } catch (error) {
    console.error("Error in getFormattedTimeDisplay:", error, "Event Data:", event);
    return "Time Error";
  }
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const eventUrl = `/events/${event.slug}`;
  const isFeatured = variant === 'featured';

  const imageUrl = event.mainImage
    ? urlFor(event.mainImage).width(isFeatured ? 800 : 400).height(isFeatured ? 600 : 300).fit('crop').url()
    : "/images/placeholder.jpg";

  const displayDate = formatEventDate(event.eventDateTime);
  const displayTime = getFormattedTimeDisplay(event);

  const EventImageContent = (
    <Image
      src={imageUrl}
      alt={`Image for ${event.title}`}
      fill
      className={`object-cover ${!isFeatured ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
    />
  );

  const TextualContent = () => (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
        <CalendarDays className="h-4 w-4 flex-shrink-0" />
        <span>{displayDate}</span>
      </div>
      <h3 className={`mb-2 font-bold line-clamp-2 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl group-hover:text-primary transition-colors'}`}>
        {event.title}
      </h3>
      <p className={`text-sm text-muted-foreground flex-grow ${isFeatured ? 'line-clamp-4 md:line-clamp-5 mb-6' : 'line-clamp-3 mb-4'}`}>
        {event.description}
      </p>
      <div className={`space-y-1 text-sm ${isFeatured ? 'mb-6' : 'mb-4'}`}>
        {displayTime && !["Invalid Time", "Time Error", "Time TBD"].includes(displayTime) && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{displayTime}</span>
          </div>
        )}
        {event.location && (
          <div className="flex items-start gap-2 text-muted-foreground">
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
          <Link href={eventUrl} aria-label={`View details for ${event.title}`} className="block h-full">
            <div className="relative min-h-[300px] h-full">
              {EventImageContent}
            </div>
          </Link>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <TextualContent />
            {DetailsButton}
          </div>
        </div>
      </div>
    );
  }

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

export type { RawSanityEventProps as EventCardType };
