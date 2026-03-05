import { CSSProperties, FC } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const ITEMS = [
  {
    label: "Email",
    href: "mailto:premkumar5012002@gmail.com",
    icon: "skill-icons:gmail-light",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/premkumar5102",
    icon: "skill-icons:linkedin",
  },
  {
    label: "Github",
    href: "https://github.com/premkumar5012002",
    icon: "skill-icons:github-light",
  },
  {
    label: "Source code",
    href: "https://github.com/premkumar5012002/portfolio",
    icon: "logos:opensource",
  },
];

export const StartMenu: FC = () => {
  return (
    <div className="animate-start-menu-enter absolute bottom-16 left-2 flex h-60 w-60 overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(22,46,92,0.25)] backdrop-blur-2xl">
      <div className="flex w-full flex-col justify-between py-3 text-sm text-slate-700">
        {ITEMS.map((item, index) => (
          <StartMenuItem key={item.label} index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const StartMenuItem: FC<{
  index: number;
  label: string;
  href: string;
  icon: string;
}> = ({ index, label, href, icon }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="animate-section-enter mx-2 flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-[#edf3ff]"
      style={
        {
          "--stagger-delay": `${index * 45}ms`,
        } as CSSProperties
      }
    >
      <Icon icon={icon} className="h-8 w-8" />
      {label}
    </Link>
  );
};
