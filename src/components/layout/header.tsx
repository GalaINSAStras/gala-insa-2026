"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAVIGATION, LEGAL } from "@/lib/constants";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo / Nom du site */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold text-gala-primary"
        >
          <span className="sr-only">Gala INSA Strasbourg 2026</span>
          Gala INSA 2026
        </Link>

        {/* Navigation Desktop (md+) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAVIGATION.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Bouton mobile */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu de navigation"
              />
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-gala-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
                <p>{LEGAL.associationName}</p>
                <p>SIRET : {LEGAL.siret}</p>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}