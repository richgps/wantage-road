import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Users, Music, Utensils } from "lucide-react"

// This would typically come from a database
const events = [
  {
    id: "1",
    title: "Annual street party",
    date: "July 5th, 2025",
    time: "12:00 PM - 6:00 PM",
    location: "Wantage Road, Reading",
    description:
      "Our biggest event of the year! Join us for food, music, games, and a chance to connect with your neighbours. The Annual Street Party has been a tradition in Wantage Road for over a decade, bringing together residents of all ages for a day of celebration and community spirit.",
    longDescription: `
      <p>The Annual Street Party is the highlight of our community calendar, a day when Wantage Road transforms into a vibrant celebration of neighbourhood spirit and togetherness.</p>
      
      <p>This year's event will feature:</p>
      <ul>
        <li><strong>Live Music:</strong> Local bands and musicians will perform throughout the day, providing a soundtrack to our celebrations.</li>
        <li><strong>Food & Drinks:</strong> A variety of food stalls offering everything from barbecue to international cuisine, as well as refreshing beverages for all ages.</li>
        <li><strong>Children's Activities:</strong> Face painting, bubble machines, chalk art, and games to keep the younger members of our community entertained.</li>
        <li><strong>Community Showcase:</strong> Displays and information about local initiatives, clubs, and organisations.</li>
        <li><strong>Raffle & Fundraising:</strong> Opportunities to support community projects through our annual raffle with prizes donated by local businesses.</li>
      </ul>
      
      <p>The street will be closed to traffic for the duration of the event, creating a safe space for everyone to enjoy the festivities. Bunting and decorations will adorn the street, creating a festive atmosphere that has become synonymous with our annual celebration.</p>
      
      <p>This event is made possible through the hard work of volunteers and the generosity of local sponsors. If you'd like to get involved in the planning or contribute in any way, please contact the organising committee.</p>
      
      <p>We encourage all residents to join us for this special day. It's a wonderful opportunity to strengthen community bonds, meet new neighbours, and create lasting memories together.</p>
    `,
    image: "/images/street-party-1.png",
    gallery: ["/images/street-party-1.png", "/images/street-party-2.png", "/images/street-party-3.png"],
    organizer: "Wantage Road Community Committee",
    contact: "events@wantageroad.org",
    highlights: [
      { icon: <Music className="h-5 w-5" />, title: "Live music", description: "Local bands and performers" },
      { icon: <Utensils className="h-5 w-5" />, title: "Food stalls", description: "Various cuisines and treats" },
      {
        icon: <Users className="h-5 w-5" />,
        title: "Community activities",
        description: "Games and entertainment for all ages",
      },
    ],
  },
]

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id) || events[0]

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

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 overflow-hidden rounded-xl">
            <div className="relative aspect-video">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{event.title}</h1>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>

            <div
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Event highlights</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {event.highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-center rounded-lg border p-4 text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {highlight.icon}
                  </div>
                  <h3 className="mb-1 font-semibold">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {event.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <div className="relative aspect-square">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${event.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Event information</h2>

            <div className="mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Organiser</p>
                  <p className="text-sm text-muted-foreground">{event.organizer}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Date & time</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date}, {event.time}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full hover:bg-primary/90">Add to calendar</Button>
              <Button variant="outline" className="w-full hover:bg-accentHover">
                <Link href="/contact" className="flex w-full items-center justify-center">
                  Contact organiser
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
