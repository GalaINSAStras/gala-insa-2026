"use client";

import Link from "next/link";
import { useLayoutEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAVIGATION } from "@/lib/constants";

/**
 * Bouton hamburger animé — 3 lignes → croix (morphing)
 */
function BurgerButton({
  open,
  onClick,
  renderWhenOpen = false,
}: {
  open: boolean;
  onClick: () => void;
  renderWhenOpen?: boolean;
}) {
  if (open && !renderWhenOpen) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-[calc(env(safe-area-inset-top,0px)+1rem)] right-4 z-[70] flex h-11 w-11 items-center justify-center bg-transparent md:hidden"
      aria-label={open ? "Fermer le menu" : "Menu de navigation"}
      aria-expanded={open}
    >
      <span className="sr-only">{open ? "Fermer" : "Menu"}</span>
      <div className="relative flex h-8 w-8 items-center justify-center">
        <motion.span
          className="absolute block h-[2.5px] w-7 rounded-full bg-[var(--foreground)]"
          animate={open ? { y: 0, rotate: 45 } : { y: -7, rotate: 0 }}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="absolute block h-[2.5px] w-7 rounded-full bg-[var(--foreground)]"
          animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          className="absolute block h-[2.5px] w-7 rounded-full bg-[var(--foreground)]"
          animate={open ? { y: 0, rotate: -45 } : { y: 7, rotate: 0 }}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </button>
  );
}

/** Navigation du menu mobile — « Accueil » en tête, puis les pages principales */
const MOBILE_NAVIGATION = [{ label: "Accueil", href: "/" }, ...NAVIGATION];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useLayoutEffect(() => {
    if (!isMobileMenuOpen) return;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousScrollY = window.scrollY;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${previousScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, previousScrollY);
    };
  }, [isMobileMenuOpen]);

  const mobileMenuOriginX = "calc(100% - 2.25rem)";
  const mobileMenuOriginY = "calc(env(safe-area-inset-top, 0px) + 2.25rem)";

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-stretch justify-stretch"
                style={{ backgroundColor: "var(--background)" }}
                initial={{
                  clipPath: `circle(0% at ${mobileMenuOriginX} ${mobileMenuOriginY})`,
                }}
                animate={{
                  clipPath: `circle(150% at ${mobileMenuOriginX} ${mobileMenuOriginY})`,
                }}
                exit={{
                  clipPath: `circle(0% at ${mobileMenuOriginX} ${mobileMenuOriginY})`,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <BurgerButton open={true} onClick={closeMenu} renderWhenOpen />
                <nav className="flex h-full w-full flex-col items-center justify-center px-6 pt-[calc(env(safe-area-inset-top,0px)+5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] text-center">
                  <div className="flex flex-col items-center gap-8">
                    {MOBILE_NAVIGATION.map((item, i) => (
                      <motion.span
                        key={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + i * 0.08,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="text-4xl font-semibold tracking-tight transition-colors hover:text-gala-primary md:text-3xl font-titre"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.label}
                        </Link>
                      </motion.span>
                    ))}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gala-gold bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Motif floral — coin gauche, chevauche la ligne de démarcation dorée */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ornaments/motif_floral.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 -z-10 w-22 translate-y-[15%] object-contain object-bottom-left sm:w-24 md:w-26"
      />

      <div className="container mx-auto flex h-18 items-center justify-center px-4 md:justify-between md:px-6">
        {/* Logo / Nom du site */}
        <Link
          href="/"
          className="flex items-center gap-2 text-3xl font-bold leading-none text-gala-primary md:ml-24"
          style={{ fontFamily: "var(--font-title)" }}
        >
          <span className="sr-only">Gala INSA Strasbourg 2026</span>
          Gala 2026
        </Link>

        {/* Navigation Desktop (md+) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAVIGATION.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} font-titre text-xl font-semibold`}
                  render={<Link href={item.href} />}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Bouton hamburger mobile */}
        <BurgerButton
          open={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        />

        {/* Fond opaque fixe pour le menu mobile */}
        {mobileMenu}
      </div>
    </header>
  );
}