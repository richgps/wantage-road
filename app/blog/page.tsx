import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDays, ArrowRight } from "lucide-react"
import { CustomLink } from "@/components/ui/link"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: "wantage-road-in-bloom",
    title: "Wantage Road in Bloom: Join our gardening initiative",
    date: "April 15, 2025",
    author: "Sarah Johnson",
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
    `,
    image: "/images/bloom-sign.png",
    category: "Community initiatives",
    tags: ["gardening", "community", "environment"],
  },
  {
    id: "community-updates",
    title: "Community updates: What's happening this month",
    date: "April 10, 2025",
    author: "Michael Thompson",
    excerpt:
      "Stay informed about all the exciting events and initiatives happening in our community this month. From local meetups to volunteer opportunities, there's something for everyone.",
    image: "/images/street-party-2.png",
    category: "News",
    tags: ["events", "updates", "community"],
  },
  {
    id: "street-party-preparations",
    title: "Street party preparations: How you can help",
    date: "April 5, 2025",
    author: "Emma Wilson",
    excerpt:
      "Our annual street party is approaching! Learn how you can contribute to making this year's celebration the best one yet. From volunteering to donations, every bit helps.",
    image: "/images/street-party-3.png",
    category: "Events",
    tags: ["street party", "volunteering", "community"],
  },
  {
    id: "neighborhood-history",
    title: "The history of Wantage Road: A look back",
    date: "March 28, 2025",
    author: "David Roberts",
    excerpt:
      "Discover the fascinating history of our neighbourhood, from its early days to the vibrant community it is today. Learn about the architectural changes, notable residents, and community milestones.",
    image: "/images/street-party-1.png",
    category: "History",
    tags: ["history", "neighbourhood", "community"],
  },
  {
    id: "local-business-spotlight",
    title: "Local business spotlight: Supporting our community",
    date: "March 20, 2025",
    author: "Lisa Chen",
    excerpt:
      "We highlight some of the wonderful local businesses that contribute to our community. Learn about their stories, offerings, and how you can support them.",
    image: "/images/street-party-2.png",
    category: "Local business",
    tags: ["business", "local", "support"],
  },
  {
    id: "community-garden-project",
    title: "Community garden project: Growing together",
    date: "March 15, 2025",
    author: "James Wilson",
    excerpt:
      "Learn about our new community garden project, where residents can grow vegetables, herbs, and flowers together. Find out how to get involved and claim your plot.",
    image: "/images/bloom-sign.png",
    category: "Community initiatives",
    tags: ["garden", "food", "sustainability"],
  },
]

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Community blog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Stay updated with the latest news, stories, and updates from the Wantage Road community
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12 overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
        <CustomLink href={`/blog/${blogPosts[0].id}`} className="block">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[300px]">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <CalendarDays className="h-4 w-4" />
                <span>{blogPosts[0].date}</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold group-hover:text-primary transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="mb-6 text-muted-foreground">{blogPosts[0].excerpt}</p>
              <Button asChild className="hover:bg-primary/90 w-fit">
                <span className="flex items-center gap-2">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
        </CustomLink>
      </div>

      {/* All Posts */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(1).map((post) => (
          <CustomLink
            key={post.id}
            href={`/blog/${post.id}`}
            className="block h-full transition-all duration-300 hover:scale-[1.03]"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                  <CalendarDays className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">{post.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3 flex-grow">{post.excerpt}</p>
              </CardContent>
            </Card>
          </CustomLink>
        ))}
      </div>
    </div>
  )
}
