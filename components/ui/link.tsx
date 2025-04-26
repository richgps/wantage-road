"use client"

import type React from "react"

import NextLink from "next/link"
import { forwardRef } from "react"

interface CustomLinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ onClick, href, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick if it exists
    if (onClick) {
      onClick(e)
    }

    // Don't do anything if it's an external link or if default was prevented
    if (e.defaultPrevented || (href && typeof href === "string" && (href.startsWith("http") || href.startsWith("#")))) {
      return
    }

    // Scroll to top immediately - this helps on iOS
    window.scrollTo(0, 0)
  }

  return (
    <NextLink href={href} onClick={handleClick} ref={ref} {...props}>
      {children}
    </NextLink>
  )
})

CustomLink.displayName = "CustomLink"

export { CustomLink }
