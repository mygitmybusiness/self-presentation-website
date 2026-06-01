"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HamburgerIcon, MenuClose } from "@/utils/icons";
import { useTransitionNav } from "@/components/common/TransitionProvider";

const circleVariants: Variants = {
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
  const { navigate } = useTransitionNav();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/contacts", label: "Contacts" },
  ];

  const onNavigate =
    (href: string, closeMenu?: boolean) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (closeMenu) setIsOpen(false);
      navigate(href);
    };

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
      <nav
        className={[
          "fixed inset-x-0 top-0 z-30",
          // "backdrop-blur-md backdrop-saturate-150",
          "lg:transition-[background-color,backdrop-filter] lg:duration-300",
          // "border-b border-black dark:border-white",
        ].join(" ")}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div
            className={[
              "flex justify-between items-center w-max lg:mt-4 p-4 sm:p-6 lg:p-2",
              "lg:border-b lg:border lg:border-black lg:dark:border-white lg:rounded-[2px]",
              "lg:bg-white lg:dark:bg-black ml-auto lg:mr-auto"
            ].join(" ")}
          >
            <div className="hidden md:flex gap-2">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
<Link
  key={item.href}
  href={item.href}
  onClick={onNavigate(item.href)}
  className={`group relative px-6 py-2 rounded-[3px] transition-colors duration-300 ${
    active
      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
      : "text-gray-700 dark:text-gray-200"
  }`}
>
  {/* The Label Text */}
  <span className="relative z-10">{item.label}</span>

  {/* The Animated Border SVG (Only renders when link is not active) */}
  {!active && (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="3" /* Matches your rounded-[3px] */
        fill="none"
        stroke="currentColor" /* Uses text color (black/white) for the border */
        strokeWidth="3"
        className="stroke-gray-900 dark:stroke-white transition-all duration-500 ease-in-out
          [stroke-dasharray:400] 
          [stroke-dashoffset:400] 
          group-hover:[stroke-dashoffset:0]"
      />
    </svg>
  )}
</Link>
                );
              })}
            </div>
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
                  <HamburgerIcon />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
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
          bg-black dark:bg-white text-white dark:test-black origin-top-right
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
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="ml-auto p-2 rounded-md hover:bg-white/10 transition"
              >
                <MenuClose/>
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
                        ? "bg-white text-black dark:bg-black dark:text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                    onClick={onNavigate(item.href, true)}
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
