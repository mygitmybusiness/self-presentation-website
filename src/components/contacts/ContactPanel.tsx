import clsx from "clsx";
import {
  contactChannels,
  contactIntro,
  contactSocials,
} from "@/data/contacts";
import { GitHub, Instagram, Linkedin } from "@/utils/icons";

const socialIcons = {
  GitHub: GitHub,
  LinkedIn: Linkedin,
  Instagram: Instagram,
} as const;

export default function ContactPanel() {
  return (
    <section
      className="relative z-10 w-full max-w-md mx-auto text-center"
      aria-labelledby="contacts-title"
    >
      <header className="mb-4">
        <h1
          id="contacts-title"
          className={clsx(
            "text-3xl md:text-4xl font-semibold tracking-tight mb-4",
            "text-black dark:text-white"
          )}
        >
          {contactIntro.title}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
          {contactIntro.subtitle}
        </p>
      </header>

      <dl className="flex flex-col border-t border-black/10 dark:border-white/10">
        {contactChannels.map((channel) => (
          <div
            key={channel.label}
            className="flex flex-col items-center gap-1 py-4 border-b border-black/10 dark:border-white/10"
          >
            <dt className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              {channel.label}
            </dt>
            <dd className="m-0">
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={clsx(
                  "text-sm md:text-base text-black dark:text-white",
                  "underline-offset-4 hover:underline hover:text-accent",
                  "transition-colors duration-200"
                )}
              >
                {channel.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <nav
        className="mt-8 flex items-center justify-center gap-2"
        aria-label="Social profiles"
      >
        {contactSocials.map((social) => {
          const Icon = socialIcons[social.name];
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block tracking-tight select-none transition-all duration-200 dark:invert hover:-translate-y-[2px] active:translate-y-[4px]"
              aria-label={social.name}
            >
              <Icon />
            </a>
          );
        })}
      </nav>
    </section>
  );
}
