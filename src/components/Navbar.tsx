"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const circleVariants = {
  open: {
    clipPath: "circle(150% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 18,
    },
  },
  closed: {
    clipPath: "circle(0% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 35,
      delay: 0.05,
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/technologies", label: "Technologies" },
    { href: "/contact", label: "Contacts" },
  ];

  // Lock scroll + focus first link + close on Esc
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (isOpen) {
      root.classList.add("overflow-hidden");
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 200);
    } else {
      root.classList.remove("overflow-hidden");
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        className={[
          "fixed inset-x-0 top-0 z-30",
          "bg-white/30 dark:bg-black/30",
          "backdrop-blur-md backdrop-saturate-150",
          "transition-[background-color,backdrop-filter] duration-300",
          "border-b border-black/5 dark:border-white/10",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-2xl font-bold">
              <Link href="/">.folio</Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                      active
                        ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                        : "transition-shadow duration-200 text-gray-700 dark:text-gray-200 hover:shadow-[0_0_0_1px_#000] dark:hover:shadow-[0_0_0_1px_#fff]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen((v) => !v)}
                className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
                aria-label="Toggle menu"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  // X icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN OVERLAY (OUTSIDE NAV) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 z-40 md:hidden
          bg-black/60 backdrop-blur-sm
          ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* CIRCLE-CLIP MOBILE MENU (OUTSIDE NAV) */}
      <motion.aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={circleVariants}
        className={`
          fixed inset-0 z-50 md:hidden
          bg-black text-white origin-top-right
          ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex h-full justify-end">
          <div
            className="w-full h-full px-4 pt-4 pb-6 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">.menu</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, idx) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
