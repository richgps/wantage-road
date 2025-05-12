// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import "./globals.css";

// Define metadata for the root layout
export const metadata: Metadata = {
  // Define other global metadata here if needed (e.g., title, description)
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      // You can add other icon types here if you have them (e.g., .png for older browsers, apple-touch-icon)
      // { url: '/favicon.png', type: 'image/png', sizes: '32x32' }, 
      // { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* The <head> tag is managed by Next.js when using the metadata API */}
      {/* No need to manually add <head> or <link rel="icon"> here */}
      <body>
        {children}
      </body>
    </html>
  );
}
