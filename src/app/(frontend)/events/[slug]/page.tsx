// src/app/(frontend)/events/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import { CalendarDays, Clock, MapPin, Users, Music, Utensils, Info, Mail } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { BlogPortableText } from "@/components/portable-text";
import Countdown from "@/components/countdown"; 
import { notFound } from 'next/navigation';
import { format as formatDateFns, parseISO } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import ClientAddToCalendarButton from "@/components/client-add-to-calendar-button";

interface SanityEvent {
  _id: string;
  title: string;
  slug: string; 
  eventDateTime?: string;
  eventEndDateTime?: string;
  timeDisplay?: string | null;
  location?: string;
  description?: string; 
  longDescription?: any[]; 
  mainImage?: any;
  gallery?: any[];
  features?: Array<{
    iconName?: string;
    title?: string; 
    description?: string; 
    _key?: string; 
  }>;
  organizer?: string;
  contactEmail?: string;
}

const timeZone = 'Europe/London';

function formatEventPageDate(isoString?: string): string {
  if (!isoString) return "Date TBD";
  try {
    const date = parseISO(isoString);
    return formatInTimeZone(date, timeZone, 'PPPP');
  } catch (e) { return "Invalid Date"; }
}

function formatEventPageTime(isoString?: string, timeDisplay?: string | null): string {
  if (timeDisplay) return timeDisplay;
  if (!isoString) return "Time TBD";
  try {
    const date = parseISO(isoString);
    return formatInTimeZone(date, timeZone, 'p');
  } catch (e) { return "Invalid Time"; }
}

function getCalendarDate(isoString?: string): string {
  if (!isoString) return '';
  try {
    return formatInTimeZone(parseISO(isoString), timeZone, 'yyyy-MM-dd');
  } catch { return '' }
}

function getCalendarTime(isoString?: string): string {
  if (!isoString) return '';
  try {
    return formatInTimeZone(parseISO(isoString), timeZone, 'HH:mm');
  } catch { return '' }
}

const getLucideIcon = (iconName?: string) => {
  if (!iconName) return <Info className="h-5 w-5" />;
  switch (iconName.toLowerCase()) {
    case 'music': return <Music className="h-5 w-5" />;
    case 'utensils': return <Utensils className="h-5 w-5" />;
    case 'users': return <Users className="h-5 w-5" />;
    case 'calendardays': return <CalendarDays className="h-5 w-5" />;
    default: return <Info className="h-5 w-5" />;
  }
};

interface EventDetailsPageProps {
  params: { slug: string };
}

// This is an async Server Component
export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const slug = params.slug; // Directly access slug from params
  
  if (!slug) {
    // This case should ideally not be hit if the route is [slug]
    // but it's a safeguard.
    notFound();
  }

  const eventData = await sanityFetch<{ data: SanityEvent | null }>({ 
    query: EVENT_BY_SLUG_QUERY, 
    params: { slug } // Pass the slug to the query
  });
  const event = eventData.data;

  if (!event) {
    notFound(); 
  }

  const formattedDate = formatEventPageDate(event.eventDateTime);
  const formattedTime = formatEventPageTime(event.eventDateTime, event.timeDisplay);
  const fullDateTimeDisplay = `${formattedDate}${formattedTime && formattedTime !== "Time TBD" ? `, ${formattedTime}` : ''}`;

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-6">
        <Link
          href="/events"
          className="text-primary hover:underline hover:bg-accentHover px-3 py-1 rounded-md inline-flex items-center gap-2"
        >
          ← Back to events
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {event.mainImage && (
            <div className="mb-6 overflow-hidden rounded-xl shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image 
                  src={urlFor(event.mainImage).width(1200).height(675).url()} 
                  alt={event.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{event.title}</h1>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <CalendarDays className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Date</p>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Time</p>
                  <p className="text-sm text-muted-foreground">{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location || "To be announced"}</p>
                </div>
              </div>
            </div>

            {event.longDescription && (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <BlogPortableText value={event.longDescription} />
              </div>
            )}
          </div>

          {event.features && event.features.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Event Highlights</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {event.features.map((feature) => (
                  <div key={feature._key || feature.title} className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {getLucideIcon(feature.iconName)}
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.gallery && event.gallery.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Gallery</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {event.gallery.map((imageItem, index) => (
                  <div key={imageItem._key || index} className="overflow-hidden rounded-lg shadow-md">
                    <div className="relative aspect-square">
                      <Image
                        src={urlFor(imageItem).width(400).height(400).url()}
                        alt={`${event.title} - Gallery Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-card-foreground">Event Details</h2>
              <div className="space-y-3 text-sm">
                {event.organizer && (
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-card-foreground">Organiser</p>
                      <p className="text-muted-foreground">{event.organizer}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-card-foreground">Date & Time</p>
                    <p className="text-muted-foreground">{fullDateTimeDisplay}</p>
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-card-foreground">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 space-y-3">
                {event.eventDateTime && (
                  <ClientAddToCalendarButton 
                    name={event.title}
                    startDate={getCalendarDate(event.eventDateTime)}
                    startTime={getCalendarTime(event.eventDateTime)}
                    endDate={getCalendarDate(event.eventEndDateTime || event.eventDateTime)}
                    endTime={getCalendarTime(event.eventEndDateTime || event.eventDateTime)}
                    location={event.location || undefined}
                    description={event.description || undefined}
                    timeZone={timeZone}
                  />
                )}
                {event.contactEmail && (
                  <Button variant="outline" className="w-full hover:bg-accentHover asChild">
                    <Link href={`mailto:${event.contactEmail}`} className="flex w-full items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Organiser
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {event.eventDateTime && (
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-card-foreground text-center">Countdown to Event</h2>
                <Countdown targetIsoDate={event.eventDateTime} />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
