import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollRestoration from "@/components/scroll-restoration"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Wantage Road Community",
  description: "Community website for Wantage Road in Reading, UK",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* iOS-specific meta tag to help with scroll restoration */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          function getThemePreference() {
            if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
              return localStorage.getItem('theme');
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          
          const theme = getThemePreference();
          
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
          }}
        />
        {/* Wrap ScrollRestoration in Suspense boundary */}
        <Suspense fallback={null}>
          <ScrollRestoration />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
