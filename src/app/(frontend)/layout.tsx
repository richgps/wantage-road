// src/app/(main)/layout.tsx
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Suspense } from "react"

// site chrome
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollRestoration from "@/components/scroll-restoration"
import { SanityLive } from "@/sanity/lib/live"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Wantage Road Community",
  description: "Community website for Wantage Road in Reading, UK",
}

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {/* viewport & anything else from metadata will be injected by Next */}
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {/* theme-init script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark' : 'light';
                }
                const theme = getThemePreference();
                document.documentElement.classList[theme==='dark'?'add':'remove']('dark');
              })();
            `,
          }}
        />
        <Suspense fallback={null}>
          <ScrollRestoration />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
            <SanityLive />
          </main>
          <Footer />
        </div>
      </body>
    </>
  )
}
