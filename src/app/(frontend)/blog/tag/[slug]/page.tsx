// src/app/(frontend)/blog/tag/[slug]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // For the "Back to blog" link
import { client } from '@/sanity/lib/client';
import { BlogCard, BlogCardType } from "@/components/blog-card";
import type { SanityDocument } from 'next-sanity';

// Define an interface for the category details we expect to fetch
interface CategoryDetails extends SanityDocument {
  title: string;
  description?: string; // Optional description for the category
}

// Define an interface for the posts we fetch for this page
// It should align with BlogCardType for direct usage with BlogCard
interface PostInCategory extends BlogCardType {}

// Function to fetch category details by its slug
async function getCategoryDetails(slug: string): Promise<CategoryDetails | null> {
  return client.fetch<CategoryDetails | null>(
    `*[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      description
    }`,
    { slug }
  );
}

// Function to fetch blog posts that reference a specific category _id
async function getPostsForCategory(categoryId: string): Promise<PostInCategory[]> {
  const posts = await client.fetch<PostInCategory[]>(
    `*[_type == "post" && defined(slug.current) && references($categoryId)] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "body": body[]{...} // Fetch body for excerpt in BlogCard
    }`,
    { categoryId }
  );
  return posts;
}

export default async function CategoryTagPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = await getCategoryDetails(slug);

  let posts: PostInCategory[] = [];
  if (category) {
    posts = await getPostsForCategory(category._id);
  }

  if (!category) {
    return (
      <div className="container py-12 md:py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Category Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The category you're looking for doesn't seem to exist.
        </p>
        <Link
          href="/blog"
          className="text-primary hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all blog posts
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8"> {/* Increased bottom margin */}
        <Link
          href="/blog"
          className="text-primary hover:underline hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-3 py-1 rounded-md inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all blog posts
        </Link>
      </div>

      <div className="mb-10 text-center">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Category</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{category.title}</h1>
        {category.description && (
          <p className="mx-auto max-w-2xl text-muted-foreground">{category.description}</p>
        )}
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          There are no posts in the "{category.title}" category yet.
        </p>
      )}
    </div>
  );
}

// Optional: Generate static params for categories to pre-build these pages at build time
// This improves performance and SEO.
export async function generateStaticParams() {
  const categories = await client.fetch<Array<{ slug: { current: string }}>>(`*[_type == "category" && defined(slug.current)]{ slug }`);
  return categories.map((cat) => ({
    slug: cat.slug.current,
  }));
}
