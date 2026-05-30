export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export type ContactSocialName = "GitHub" | "LinkedIn" | "Instagram";

export type ContactSocial = {
  name: ContactSocialName;
  href: string;
};

export const contactIntro = {
  title: "Contact",
  subtitle: "Open to freelance and full-time roles. I usually reply within 24–48 hours.",
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "dmytro.deinershtein@gmail.com",
    href: "mailto:dmytro.deinershtein@gmail.com",
  },
  {
    label: "Phone",
    value: "+48 793 *** ***",
    href: "tel:+48793******",
  },
  {
    label: "Location",
    value: "Poland · CET (UTC+1)",
    href: "https://www.google.com/maps/place/Poland",
    external: true,
  },
];

export const contactSocials: ContactSocial[] = [
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Instagram", href: "https://instagram.com" },
];
