"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTransitionNav } from "@/components/common/TransitionProvider";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { stage, durationMs, hasNavigated } = useTransitionNav();

  return (
    <motion.div
      key={pathname}
      initial={hasNavigated ? { opacity: 0 } : false}
      animate={{ opacity: stage === "out" ? 0 : 1 }}
      transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
