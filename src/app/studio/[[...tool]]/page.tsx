/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import type { Metadata, Viewport } from 'next';
import { metadata as sanityDefaultMetadata, viewport as sanityDefaultViewport } from 'next-sanity/studio';

export const dynamic = 'force-static';

// Define custom metadata for the Sanity Studio
export const metadata: Metadata = {
  ...sanityDefaultMetadata, // Spread the default metadata from next-sanity/studio
  icons: {
    icon: '/favicon-sanity.svg', // Use your favicon
  },
};

// You can also customize the viewport if needed, or just re-export the default
export const viewport: Viewport = {
  ...sanityDefaultViewport,
  // Add any custom viewport settings here if necessary
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
