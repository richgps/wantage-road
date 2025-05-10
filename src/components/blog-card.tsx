// src/components/blog-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react"; // Could be replaced with a Clock icon if preferred for "time ago"
import { urlFor } from "@/sanity/lib/image";
import { BlogPortableText } from "@/components/portable-text";

// Import from date-fns
import { formatDistanceToNow, parseISO } from 'date-fns';

// Old formatDate function is no longer needed
// function formatDate(dateStr: string): string { ... }

type BlogItem = {
  _id: string;
  title: string;
  publishedAt: string; // Expecting ISO 8601 date string from Sanity
  mainImage?: any;
  body?: any[];
  slug?: { current: string };
};

interface BlogCardProps {
  post: BlogItem;
  variant?: 'default' | 'featured';
  className?: string;
}

export function BlogCard({ post, variant = 'default', className }: BlogCardProps) {
  const postUrl = post.slug?.current ? `/blog/${post.slug.current}` : '#';
  const isFeatured = variant === 'featured';

  let displayDate = 'Date unavailable';
  if (post.publishedAt) {
    try {
      const date = parseISO(post.publishedAt); // Parse ISO string to Date object
      displayDate = `${formatDistanceToNow(date)} ago`;
    } catch (error) {
      console.error("Error parsing date for blog card:", error);
      // Fallback to original string if parsing fails, or a static message
      displayDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  }

  const PostImageContent = post.mainImage ? (
    <Image
      src={urlFor(post.mainImage).width(isFeatured ? 800 : 600).height(isFeatured ? 500 : 300).url()}
      alt={`Image for ${post.title}`}
      fill
      className={`object-cover ${!isFeatured ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
    />
  ) : (
    <div className="flex items-center justify-center h-full bg-muted">
      <CalendarDays className="w-12 h-12 text-muted-foreground" />
    </div>
  );

  const TextualContent = () => (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <CalendarDays className="h-4 w-4 flex-shrink-0" />
        <span>{displayDate}</span>
      </div>
      <h3 className={`mb-2 font-bold ${isFeatured ? 'text-2xl lg:text-3xl line-clamp-3' : 'text-xl group-hover:text-primary transition-colors line-clamp-2'}`}>
        {post.title || "Untitled Post"}
      </h3>
      <div className={`text-sm text-muted-foreground flex-grow ${isFeatured ? 'line-clamp-4 md:line-clamp-5 mb-6' : 'line-clamp-3 mb-4'}`}>
        {post.body && post.body.length > 0 ? (
          <BlogPortableText value={[post.body[0]]} />
        ) : (
          <p>No excerpt available.</p>
        )}
      </div>
    </>
  );

  const ReadMoreButton = (
    <Button
      asChild
      size={isFeatured ? "lg" : undefined}
      variant={isFeatured ? "default" : "outline"}
      className={!isFeatured ? "w-full hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800" : ""}
    >
      <Link href={postUrl}>Read more</Link>
    </Button>
  );

  if (isFeatured) {
    return (
      <div className={`overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm ${className || ''}`}>
        <div className="grid md:grid-cols-2">
          <Link href={postUrl} aria-label={`Read more about ${post.title}`} className="block h-full">
            <div className="relative min-h-[300px] h-full">
              {PostImageContent}
            </div>
          </Link>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <TextualContent />
            {ReadMoreButton}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`flex flex-col h-full overflow-hidden group ${className || ''}`}>
      <Link href={postUrl} aria-label={`Read more about ${post.title}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {PostImageContent}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        <TextualContent />
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 mt-auto">
        {ReadMoreButton}
      </CardFooter>
    </Card>
  );
}

export type { BlogItem as BlogCardType };
