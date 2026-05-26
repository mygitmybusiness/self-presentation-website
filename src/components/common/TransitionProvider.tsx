"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionStage = "idle" | "out" | "in";

type TransitionContextValue = {
  stage: TransitionStage;
  navigate: (href: string) => void;
  durationMs: number;
  hasNavigated: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({
  children,
  durationMs = 250,
}: {
  children: React.ReactNode;
  durationMs?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<TransitionStage>("idle");
  const [hasNavigated, setHasNavigated] = useState(false);

  const pendingHrefRef = useRef<string | null>(null);
  const outTimerRef = useRef<number | null>(null);
  const inTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (outTimerRef.current) window.clearTimeout(outTimerRef.current);
    if (inTimerRef.current) window.clearTimeout(inTimerRef.current);
    outTimerRef.current = null;
    inTimerRef.current = null;
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (!href || href === pathname) return;

      clearTimers();
      pendingHrefRef.current = href;
      setStage("out");

      outTimerRef.current = window.setTimeout(() => {
        router.push(href);
      }, durationMs);
    },
    [clearTimers, durationMs, pathname, router]
  );

  // When the route changes (after we pushed), fade in.
  useEffect(() => {
    const pending = pendingHrefRef.current;
    if (!pending) return;

    // Any pathname change after a pending push is treated as "arrived".
    pendingHrefRef.current = null;
    setHasNavigated(true);
    setStage("in");

    clearTimers();
    inTimerRef.current = window.setTimeout(() => {
      setStage("idle");
    }, durationMs);
  }, [pathname, clearTimers, durationMs]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const value = useMemo<TransitionContextValue>(
    () => ({ stage, navigate, durationMs, hasNavigated }),
    [stage, navigate, durationMs, hasNavigated]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionNav() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransitionNav must be used within TransitionProvider");
  return ctx;
}

