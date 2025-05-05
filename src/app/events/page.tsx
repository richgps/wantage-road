import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
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
    title: "Winter holiday celebration",
    date: "December 12th, 2025",
    time: "4:00 PM - 8:00 PM",
    location: "Wantage Road Community Centre",
    description:
      "Celebrate the holiday season with your neighbours. We'll have hot drinks, festive food, carol singing, and activities for all ages.",
    image: "/images/street-party-2.png",
  },
]

export default function EventsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Upcoming events</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join us for these upcoming community events and activities
        </p>
      </div>

      {/* Featured Event */}
      <div className="mb-12 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[300px]">
            <Image src="/images/street-party-1.png" alt="Annual street party" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <CalendarDays className="h-4 w-4" />
              <span>July 5th, 2025</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Annual street party</h2>
            <p className="mb-6 text-muted-foreground">
              Our biggest event of the year! Join us for food, music, games, and a chance to connect with your
              neighbours. There will be live performances, activities for children, and food stalls.
            </p>
            <div className="mb-6 space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>12:00 PM - 6:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>Wantage Road, Reading</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/events/1">Event details</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* All Events */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.slice(1).map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <CalendarDays className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{event.description}</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button asChild variant="outline" className="w-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800">
                <Link href={`/events/${event.id}`}>View details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
