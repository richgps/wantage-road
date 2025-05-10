import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { CalendarDays, Camera, Mail } from "lucide-react"; 
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

import { EventCard, EventCardType } from "@/components/event-card";
import { BlogCard, BlogCardType } from "@/components/blog-card";

const mockFeaturedEvent: EventCardType = {
  id: 1,
  title: "Annual street party",
  date: "July 5th, 2025",
  time: "12:00 PM - 6:00 PM",
  location: "Wantage Road, Reading",
  description:
    "Our biggest event of the year! Join us for food, music, games, and a chance to connect with your neighbours.",
  image: "/images/street-party-1.png",
};

export default async function Home() {
  // Fetch posts for the blog section.
  const result = await sanityFetch({ query: POSTS_QUERY }); // Remove generic here
  const posts: BlogCardType[] = result.data || []; // Access data property and type posts

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-background overflow-hidden">
              <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-3xl"></div>
              <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] rounded-full bg-accent/10 blur-2xl"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
              </div>
              <div className="absolute inset-0 border-b border-primary/5"></div>
            </div>
          </div>
        </div>
        <div className="container relative z-10 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <Image
              src="/images/wantage-logo.png"
              alt="Wantage Road Logo"
              width={220}
              height={220}
              className="mx-auto mb-8 drop-shadow-lg animate-pulse-slow"
            />
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl drop-shadow-sm">
              Welcome to <span className="text-primary">Wantage Road</span> community
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Bringing neighbours together through events, initiatives, and shared experiences
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/events">Upcoming events</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-background/50 hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 transition-colors"
              >
                <Link href="/contact">Get involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Next community event</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Join us for our upcoming events and activities</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <EventCard event={mockFeaturedEvent} variant="featured" />
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Latest blog posts</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Stay updated with the latest news and stories from our community
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          )}

          {posts && posts.length > 0 && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800">
                <Link href="/blog">View all posts</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Community moments</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Memories from our past events and gatherings</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src="/images/street-party-1.png"
                    alt="Street Party"
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src="/images/street-party-2.png"
                    alt="Community Gathering"
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src="/images/street-party-3.png"
                    alt="Music Performance"
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800">
              <Link href="/gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>View full gallery</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-xl bg-primary/10 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get involved</h2>
            <p className="mb-8 text-muted-foreground">
              Have questions, suggestions, or want to help organise community events? We'd love to hear from you!
            </p>
            <Button asChild size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact us</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
