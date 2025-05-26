// src/components/blog-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { BlogPortableText } from "@/components/portable-text";
import { type Image as SanityImage } from "sanity";

// Import from date-fns
import { format as formatDateFnsAlias, formatDistanceToNow, parseISO } from 'date-fns'; // Aliased format for clarity
import { toZonedTime } from 'date-fns-tz'; // Import for timezone conversion

type BlogItem = {
  _id: string;
  title: string;
  publishedAt: string; // Expecting ISO 8601 date string from Sanity
  mainImage?: SanityImage;
  body?: unknown[];
  slug?: { current: string };
};

interface BlogCardProps {
  post: BlogItem;
  variant?: 'default' | 'featured';
  className?: string;
}

const timeZone = 'Europe/London'; // Define the target timezone

export function BlogCard({ post, variant = 'default', className }: BlogCardProps) {
  const postUrl = post.slug?.current ? `/blog/${post.slug.current}` : '#';
  const isFeatured = variant === 'featured';

  let displayDate = 'Date unavailable';
  if (post.publishedAt) {
    try {
      const date = parseISO(post.publishedAt); // Parse ISO string to Date object
      // formatDistanceToNow is generally fine as is, relative to user's current time
      displayDate = `${formatDistanceToNow(date)} ago`;
    } catch (error) {
      console.error("Error parsing date for blog card (formatDistanceToNow):", error);
      // Fallback to absolute date, now with timezone conversion
      try {
        const date = parseISO(post.publishedAt); // Re-parse or use already parsed if structure allows
        const zonedDate = toZonedTime(date, timeZone);
        displayDate = formatDateFnsAlias(zonedDate, 'd MMMM yyyy');
      } catch (fallbackError) {
        console.error("Error formatting fallback date for blog card:", fallbackError);
        displayDate = "Date unavailable"; // Ultimate fallback
      }
    }
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)
        .width(isFeatured ? 800 : 400)
        .height(isFeatured ? 450 : 300)
        .fit("crop")
        .url()
    : "/images/placeholder.jpg";

  const BlogImageContent = (
    <Image
      src={imageUrl}
      alt={`Image for ${post.title}`}
      fill
      className={`object-cover ${!isFeatured ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
    />
  );

  const TextualContent = () => (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
        <CalendarDays className="h-4 w-4 flex-shrink-0" />
        <span>{displayDate}</span>
      </div>
      <h3 className={`mb-2 font-bold line-clamp-2 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl group-hover:text-primary transition-colors'}`}>
        {post.title}
      </h3>
      {isFeatured && post.body && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground line-clamp-4 mb-4">
          <BlogPortableText value={post.body} />
        </div>
      )}
      {!isFeatured && post.body && (
         <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground line-clamp-2 mb-4">
          <BlogPortableText value={post.body} />
        </div>
      )}
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
            <div className="relative min-h-[300px] h-full md:min-h-[450px]">
              {BlogImageContent}
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
            {BlogImageContent}
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
