import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-4">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={450}
            className="rounded-lg"
          />
        </div>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
