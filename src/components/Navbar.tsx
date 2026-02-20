'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  path: string
  label: string
}

interface CtaButton {
  label: string
  path: string
}

interface NavbarProps {
  items?: NavItem[]
  logo?: {
    url?: string | null
    alt?: string | null
  }
  ctaPrimary?: CtaButton | null
  ctaSecondary?: CtaButton | null
}

const Navbar = ({ items, logo, ctaPrimary, ctaSecondary }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = items || [];

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-elegant">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-[72px] lg:justify-normal lg:gap-2 xl:h-20 xl:justify-between xl:gap-0">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || "Ways 2 Spain Logo"}
                width={200}
                height={48}
                priority
                className="h-12 w-auto lg:h-10 xl:h-12"
              />
            ) : (
              <div className="bg-slate-200 rounded-sm h-12 w-[200px] lg:h-10 lg:w-44 xl:h-12 xl:w-[200px]" />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-center xl:flex-none xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative h-10 flex items-center justify-center text-ui-nav transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-400 after:origin-left after:transition-transform after:duration-300 ${
                  isActive(item.path)
                    ? "color-content-primary after:scale-x-100"
                    : "color-content-tertiary after:scale-x-0 hover:color-content-primary hover:after:scale-x-100"
                } ${item.path === "/" ? "hidden xl:flex" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {ctaSecondary && (
              <Link href={ctaSecondary.path}>
                <Button variant="outline" size="lg" className="shadow-elegant lg:h-10 lg:px-3 xl:h-12 xl:px-8">
                  {ctaSecondary.label}
                </Button>
              </Link>
            )}
            {ctaPrimary && (
              <Link href={ctaPrimary.path}>
                <Button variant="amber" size="lg" className="lg:h-10 lg:px-3 xl:h-12 xl:px-8">
                  {ctaPrimary.label}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-ui-nav transition-colors duration-300 ${
                    isActive(item.path)
                      ? "color-content-primary border-l-2 border-amber-400"
                      : "color-content-tertiary hover:color-content-primary hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {ctaSecondary && (
                <Link href={ctaSecondary.path} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full mt-2 shadow-elegant">
                    {ctaSecondary.label}
                  </Button>
                </Link>
              )}
              {ctaPrimary && (
                <Link href={ctaPrimary.path} onClick={() => setIsOpen(false)}>
                  <Button variant="amber" size="lg" className="w-full mt-2">
                    {ctaPrimary.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
