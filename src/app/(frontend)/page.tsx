import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { CalendarDays, Camera, Mail, MapPin, Clock } from "lucide-react";
import { TextShimmer } from '@/components/ui/text-shimmer';
import styles from "@/app/hero-pattern.module.css";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from '@/sanity/lib/image';
import { BlogPortableText } from '@/components/portable-text';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Home() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });
  // Precompute formattedDate for each post to ensure deterministic output
  const postsWithDate = posts.map((post: any) => ({
    ...post,
    formattedDate: formatDate(post.publishedAt),
  }));
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            {/* Modern geometric background */}
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

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[300px]">
                <Image src="/images/street-party-1.png" alt="Annual Street Party" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                  <CalendarDays className="h-4 w-4" />
                  <span>July 5th, 2025</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold">Annual street party</h3>
                <p className="mb-6 text-muted-foreground">
                  Our biggest event of the year! Join us for food, music, games, and a chance to connect with your
                  neighbours.
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
                  <Link href="/events/1">Learn more</Link>
                </Button>
              </div>
            </div>
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

          <div className="grid gap-8 md:grid-cols-3">
          {postsWithDate.map((post: any) => (
            <Card className="overflow-hidden" key={post._id}>
              <CardHeader className="p-0">
                <div className="relative h-48">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(300).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/images/bloom-sign.png"
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.formattedDate}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{post?.title}</h3>
                <div className="mb-4 text-muted-foreground line-clamp-3 flex-grow">
                  {post.body && post.body.length > 0 ? (
                    <BlogPortableText value={[post.body[0]]} />
                  ) : null}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button asChild variant="outline" className="w-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800">
                  <Link href={post.slug?.current ? `/blog/${post.slug.current}` : '#'}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800">
              <Link href="/blog">View all posts</Link>
            </Button>
          </div>
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
  )
}
