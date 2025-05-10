import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, Share2, ArrowLeft } from "lucide-react"; 
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { BlogPortableText } from '@/components/portable-text';

// Import from date-fns
import { formatDistanceToNow, parseISO } from 'date-fns';

// Updated function signature and params handling
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // Directly access slug

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt, // Ensure this is a valid ISO 8601 string from Sanity
      mainImage,
      body,
      "author": author->{name, title, image, bio},
      "categories": categories[]->{_id, title, slug, description}
    }`,
    { slug }
  );

  // Compute relative time string
  let displayTimeAgo = 'Date unavailable';
  if (post?.publishedAt) {
    try {
      const date = parseISO(post.publishedAt);
      displayTimeAgo = `${formatDistanceToNow(date)} ago`;
    } catch (error) {
      console.error("Error parsing date for blog post page:", error);
      // Fallback to a more static format or the original string if parsing fails
      displayTimeAgo = new Date(post.publishedAt).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  }

  if (!post) {
    return (
      <div className="container py-12 md:py-16">
        <div className="text-center">Post not found.</div>
      </div>
    );
  }

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
                {post.categories?.map((cat: any) => (
                  <Link
                    key={cat._id}
                    href={`/blog/tag/${cat.slug?.current}`}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {/* Use the new displayTimeAgo variable */}
                  <span>{displayTimeAgo}</span>
                </div>
                {post.author?.name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                )}
              </div>
            </header>

            {post.mainImage && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <div className="relative aspect-video">
                  <Image src={urlFor(post.mainImage).width(800).height(450).url()} alt={post.title} fill className="object-cover" />
                </div>
              </div>
            )}

            {post.body && post.body.length > 0 ? (
              <div className="prose max-w-none dark:prose-invert">
                <BlogPortableText value={post.body} />
              </div>
            ) : (
              <p className="text-muted-foreground">This post has no content.</p> 
            )}


            <div className="mt-8 flex items-center justify-between border-t border-b py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={post.author?.image ? urlFor(post.author.image).width(48).height(48).url() : "/placeholder.svg?height=48&width=48"}
                    alt={post.author?.name || 'Author'}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author?.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author?.title}</p>
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
                    src={post.author?.image ? urlFor(post.author.image).width(64).height(64).url() : "/placeholder.svg?height=64&width=64"}
                    alt={post.author?.name || 'Author'}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author?.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author?.title}</p>
                </div>
              </div>
              {post.author?.bio && post.author.bio.length > 0 ? (
                <div className="mt-4 text-sm text-muted-foreground">
                  <BlogPortableText value={post.author.bio} />
                </div>
              ) : (
                post.author && <p className="mt-4 text-sm text-muted-foreground italic">Author bio not available.</p> 
              )}
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {post.categories?.map((cat: any) => (
                  <Link
                    key={cat._id}
                    href={`/blog/tag/${cat.slug?.current}`}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
