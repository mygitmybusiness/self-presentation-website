"use client";

import ContactPanel from "@/components/contacts/ContactPanel";
import Donut from "@/components/Donut";

export default function ContactsPage() {
  return (
    <div className="relative min-h-[calc(100dvh-8rem)] flex items-center justify-center">
      <div
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-50 dark:opacity-35"
        aria-hidden="true"
      >
        <Donut className="w-full scale-105" />
      </div>
      <ContactPanel />
    </div>
  );
}
