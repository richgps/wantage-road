"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollRestoration() {
  // Only use pathname, not searchParams to avoid the Suspense requirement
  const pathname = usePathname()

  useEffect(() => {
    // This is a more robust approach that works on iOS Safari
    if (typeof window !== "undefined") {
      // Delay the scroll to ensure the DOM has updated
      setTimeout(() => {
        // Force scroll to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto", // Using "auto" instead of "smooth" for better iOS compatibility
        })
      }, 0)
    }
  }, [pathname]) // Only depend on pathname, not searchParams

  return null
}
