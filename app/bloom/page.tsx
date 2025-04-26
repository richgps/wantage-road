import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Leaf, Calendar, Users, Camera } from "lucide-react"

const gardeningTips = [
  {
    title: "Spring Planting",
    description: "The best flowers to plant in spring for a colorful summer display.",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Community Gardening Days",
    description: "Join our monthly gardening sessions to help maintain public spaces.",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Share Your Progress",
    description: "Show off your garden and inspire others in the community.",
    icon: <Camera className="h-5 w-5" />,
  },
  {
    title: "Gardening Club",
    description: "Meet fellow gardening enthusiasts and share tips and advice.",
    icon: <Users className="h-5 w-5" />,
  },
]

export default function BloomPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
          </div>
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Wantage Road in Bloom</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                A community initiative to beautify our neighborhood through gardening and floral displays throughout
                spring and summer.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="#get-involved">Get Involved</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/bloom-sign.png"
                alt="Wantage Road in Bloom Sign"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Initiative */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">About the Initiative</h2>
            <p className="mb-4 text-muted-foreground">
              Wantage Road in Bloom is our community's effort to create a more beautiful and vibrant neighborhood
              through gardening and floral displays.
            </p>
            <p className="mb-4 text-muted-foreground">
              Throughout spring and summer, we encourage all residents to participate by planting flowers, maintaining
              their gardens, and contributing to our shared green spaces.
            </p>
            <p className="text-muted-foreground">
              The initiative not only enhances the visual appeal of our street but also fosters a sense of community
              pride and provides an opportunity for neighbors to connect over a shared interest.
            </p>
          </div>
        </div>
      </section>

      {/* Gardening Tips */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Gardening Tips & Resources</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Helpful information to make your garden bloom</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gardeningTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-bold">{tip.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="get-involved" className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Get Involved</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Join our community gardening initiative</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Plant Your Garden</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start by beautifying your own garden or window boxes. Choose colorful, seasonal plants that thrive in
                  our local climate.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Request Plant Suggestions</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Join Community Gardening Days</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participate in our monthly community gardening sessions where we work together to maintain public
                  spaces and planters.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/events">View Schedule</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Share Your Progress</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Take photos of your garden and share them with the community. Inspire others and get feedback on your
                  gardening efforts.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Submit Photos</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
