import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, ArrowLeft, Share2, Clock, MapPin } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: "wantage-road-in-bloom",
    title: "Wantage Road in Bloom: Join our gardening initiative",
    date: "April 15, 2025",
    author: "Sarah Johnson",
    authorRole: "Community Garden Coordinator",
    excerpt:
      "Throughout spring and summer, we encourage all residents to participate in the Wantage Road in Bloom initiative. Plant flowers, maintain your garden, and help make our street a more beautiful place to live.",
    content: `
  <p>The Wantage Road in Bloom initiative is our community's effort to create a more beautiful and vibrant neighbourhood through gardening and floral displays.</p>
  
  <p>Throughout spring and summer, we encourage all residents to participate by planting flowers, maintaining their gardens, and contributing to our shared green spaces.</p>
  
  <p>The initiative not only enhances the visual appeal of our street but also fosters a sense of community pride and provides an opportunity for neighbours to connect over a shared interest.</p>
  
  <h3>How to get involved</h3>
  
  <p>There are many ways to participate in Wantage Road in Bloom:</p>
  
  <ul>
    <li><strong>Plant your garden:</strong> Start by beautifying your own garden or window boxes. Choose colourful, seasonal plants that thrive in our local climate.</li>
    <li><strong>Join community gardening days:</strong> Participate in our monthly community gardening sessions where we work together to maintain public spaces and planters.</li>
    <li><strong>Share your progress:</strong> Take photos of your garden and share them with the community. Inspire others and get feedback on your gardening efforts.</li>
    <li><strong>Attend workshops:</strong> Learn from experienced gardeners in our community through workshops and demonstrations.</li>
  </ul>
  
  <p>Together, we can transform Wantage Road into a blooming paradise that brings joy to residents and visitors alike.</p>
  
  <h3>Recommended plants</h3>
  
  <p>Here are some plants that thrive in our local climate and can add colour and vibrancy to your garden:</p>
  
  <ul>
    <li><strong>Lavender:</strong> Fragrant, drought-resistant, and attracts pollinators.</li>
    <li><strong>Roses:</strong> Classic, beautiful flowers that come in various colours.</li>
    <li><strong>Geraniums:</strong> Easy to grow and maintain, with bright, cheerful blooms.</li>
    <li><strong>Sunflowers:</strong> Tall, striking flowers that bring a touch of sunshine.</li>
    <li><strong>Marigolds:</strong> Vibrant, pest-resistant flowers that add a pop of colour.</li>
  </ul>
  
  <h3>Community recognition</h3>
  
  <p>At the end of the summer, we'll recognise outstanding gardens in several categories:</p>
  
  <ul>
    <li>Most colourful garden</li>
    <li>Best use of space</li>
    <li>Most eco-friendly garden</li>
    <li>Most improved garden</li>
    <li>Community choice award</li>
  </ul>
  
  <p>We hope this friendly competition will inspire creativity and encourage more residents to participate in beautifying our neighbourhood.</p>
  
  <h3>Get in touch</h3>
  
  <p>If you have questions about Wantage Road in Bloom or would like to volunteer to help coordinate the initiative, please contact Sarah Johnson at hello@wantageroad.org.uk.</p>
`,
    image: "/images/bloom-sign.png",
    category: "Community initiatives",
    tags: ["gardening", "community", "environment"],
    relatedPosts: ["community-garden-project", "street-party-preparations"],
  },
]

// Related event data
const relatedEventData = {
  id: 2,
  title: "Summer gardening workshop",
  date: "May 15th, 2025",
  time: "10:00 AM - 12:00 PM",
  location: "Community Garden, Wantage Road",
  image: "/images/bloom-sign.png",
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.id === params.slug) || blogPosts[0]

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-primary hover:underline hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-3 py-1 rounded-md inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article>
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </header>

            <div className="mb-8 overflow-hidden rounded-xl">
              <div className="relative aspect-video">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </div>

            <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-8 flex items-center justify-between border-t border-b py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt={post.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </article>
        </div>

        <div>
          <div className="sticky top-24 space-y-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">About the author</h2>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={post.author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Sarah is passionate about gardening and community building. She has been coordinating the Wantage Road
                in Bloom initiative for the past three years.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Related events</h2>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border">
                  <div className="relative h-32">
                    <Image
                      src={relatedEventData.image || "/placeholder.svg"}
                      alt={relatedEventData.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-medium">{relatedEventData.title}</h3>
                    <div className="mb-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{relatedEventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{relatedEventData.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{relatedEventData.location}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
                    >
                      <Link href="/events/2">View event</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog"
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  Community initiatives
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
                >
                  Events
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
                >
                  News
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
                >
                  History
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
                >
                  Local business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
