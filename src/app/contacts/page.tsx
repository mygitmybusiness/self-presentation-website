"use client";

import Donut from "@/components/Donut";
import React from "react";

export default function ContactsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <h1 id="contacts-title" className="text-4xl font-bold">Contact me:</h1>
      <ul className="flex flex-col absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" aria-describedby="contacts-title">
        <li>e-mail: dmytro.deinershtein@gmail.com</li>
        <li>tel: +48 793 698 948</li>
      </ul>
      <Donut />
    </div>
  );
}