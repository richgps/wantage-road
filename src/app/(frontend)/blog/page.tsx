import { client } from '@/sanity/lib/client';
import type { SanityDocument } from 'next-sanity';

// Import the new BlogCard component and its type
import { BlogCard, BlogCardType } from "@/components/blog-card";

// The BlogPost interface can align with or be mapped to BlogCardType
interface BlogPost extends SanityDocument { // SanityDocument provides _id, _type etc.
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
  body?: any[]; // Ensure this matches what BlogCardType expects for excerpt
}

async function getPosts(): Promise<BlogPost[]> { // Type the return promise
  const posts = await client.fetch<BlogPost[]>( // Type the fetch result
    `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "body": body[]{...}, // Fetch full body for potential excerpting in component
    }`
  );
  return posts;
}

// formatDate utility is now inside BlogCard.tsx, so not needed here
// function formatDate(dateStr: string) { ... }

export default async function BlogPage() {
  const allPosts = await getPosts();

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const otherPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Community blog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Stay updated with the latest news, stories, and updates from the Wantage Road community
        </p>
      </div>

      {/* Featured Post - uses BlogCard */}
      {featuredPost && (
        <BlogCard
          post={featuredPost}
          variant="featured"
          className="mb-12 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]" // Added original hover effects
        />
      )}

      {/* All Other Posts - uses BlogCard */}
      {otherPosts.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"> {/* Increased gap slightly */}
          {otherPosts.map((post) => (
            // The CustomLink wrapper is no longer needed here if BlogCard itself handles the link structure
            <BlogCard
              key={post._id}
              post={post}
              // The hover effects from CustomLink can be applied to BlogCard if desired,
              // or BlogCard's internal group hover will handle it for the default variant.
              // className="block h-full transition-all duration-300 hover:scale-[1.03]"
            />
          ))}
        </div>
      )}

      {allPosts.length === 0 && (
        <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
      )}
    </div>
  );
}
