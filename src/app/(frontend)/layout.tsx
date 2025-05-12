// src/app/(frontend)/layout.tsx
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

// site chrome
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollRestoration from "@/components/scroll-restoration";
import { SanityLive } from "@/sanity/lib/live"; // Restore SanityLive

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Wantage Road Community",
  description: "Community website for Wantage Road in Reading, UK",
};

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Suspense fallback={null}>
          <ScrollRestoration />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
            <SanityLive />
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
