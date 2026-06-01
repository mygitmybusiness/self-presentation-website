// 1. Change Github to GitHub here
import { GitHub, Linkedin, Instagram } from "@/utils/icons";
import clsx from "clsx";

export default function SocialLinks() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com",
      // 2. Change the component name here too
      icon: <GitHub />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <Linkedin />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <Instagram />,
    },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={"block tracking-tight select-none transition-all duration-200 dark:invert hover:-translate-y-[2px] active:translate-y-[2px]"}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}