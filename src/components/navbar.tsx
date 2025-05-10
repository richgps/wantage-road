"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; // Keep this import
import { CustomLink } from "@/components/ui/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get theme and setTheme from useTheme
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    // Use resolvedTheme to correctly toggle from 'system' to light/dark
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = ["/", "/events", "/blog", "/gallery", "/contact"];
  const navLabels = ["Home", "Events", "Blog", "Gallery", "Contact"];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <CustomLink href="/" className="flex items-center gap-2">
            <Image
              src="/images/wantage-logo.png"
              alt="Wantage Road Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="hidden md:inline-block font-poppins text-xl font-bold">Wantage Road</span>
          </CustomLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((href, idx) => (
              <CustomLink
                key={href}
                href={href}
                className="text-sm font-medium transition-colors hover:text-primary hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 px-3 py-2 rounded-md"
              >
                {navLabels[idx]}
              </CustomLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle: hidden on mobile, visible on md+ */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme} // This will now use the new toggleTheme
              className="hidden md:flex hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Hamburger -> Close */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative w-8 h-8 md:hidden flex items-center justify-center z-50"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 h-[2px] w-6 bg-foreground rounded transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "top-[12px] rotate-45" : "top-[6px] rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-6 bg-foreground rounded transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0 top-[12px]" : "opacity-100 top-[12px]"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-6 bg-foreground rounded transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "top-[12px] -rotate-45" : "top-[18px] rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu under header */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-out md:hidden bg-white dark:bg-gray-900 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-6 px-4">
          {navLinks.map((href, idx) => (
            <CustomLink
              key={href}
              href={href}
              scroll={true}
              className="text-3xl font-medium w-full text-center py-4 hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {navLabels[idx]}
            </CustomLink>
          ))}

          {/* Theme toggle inside mobile menu */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme} // This will now use the new toggleTheme
            className="mt-8 hover:bg-[rgb(235,235,235)] dark:hover:bg-gray-800"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </>
  );
}
