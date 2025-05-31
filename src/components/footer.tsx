"use client"

import Image from "next/image"
import { Mail } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CustomLink } from "@/components/ui/link"

// Refactored SocialButton: smaller icon, sparks start center (0 opacity), fly outward further, then fade
const SocialButton = ({ href, src, alt, sparksColor }) => {
  const [hover, setHover] = useState(false)
  const count = 6 // number of sparks
  const spread = 60 // distance sparks travel

  return (
    <CustomLink
      href={href}
      className="relative p-2 rounded-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Smaller icon */}
      <Image src={src || "/placeholder.svg"} alt={alt} width={24} height={24} />

      <AnimatePresence>
        {hover &&
          Array.from({ length: count }).map((_, i) => {
            const angle = Math.random() * 2 * Math.PI
            const endX = Math.cos(angle) * spread
            const endY = Math.sin(angle) * spread

            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
                style={{ backgroundColor: sparksColor }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: [0, endX],
                  y: [0, endY],
                  opacity: [1, 0],
                }}
                transition={{ duration: 0.8, delay: i * 0.03 }}
              />
            )
          })}
      </AnimatePresence>
    </CustomLink>
  )
}

const Footer = () => {
  // Email parts to prevent simple scraping
  const emailUser = "hello"
  const emailDomain = "wantageroad.org.uk"
  const email = `${emailUser}@${emailDomain}`

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/wantage-logo.png"
                alt="Wantage Road Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-poppins text-xl font-bold">Wantage Road</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A vibrant community in Reading, UK, bringing neighbours together through events and initiatives.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <CustomLink
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-2 py-1 rounded"
                >
                  Home
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/events"
                  className="text-muted-foreground transition-colors hover:text-foreground hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-2 py-1 rounded"
                >
                  Events
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-foreground hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-2 py-1 rounded"
                >
                  Blog
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="/gallery"
                  className="text-muted-foreground transition-colors hover:text-foreground hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-2 py-1 rounded"
                >
                  Gallery
                </CustomLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-foreground hover:underline"
                  onClick={(e) => {
                    window.location.href = `mailto:${email}`
                    e.preventDefault()
                  }}
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex gap-4">
              <SocialButton href="https://www.facebook.com/groups/104573560382966" src="/icons/facebook.svg" alt="Facebook" sparksColor="#1877F2" />
              {/*  <SocialButton href="#" src="/icons/whatsapp.svg" alt="WhatsApp" sparksColor="#25D366" />*/}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Wantage Road Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
