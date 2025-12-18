"use client";
import TransitionLink from "@/components/UI/TransitionLink";
import { usePathname } from "next/navigation";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import { useStore } from "@/hooks/useStore";

export default function Navbar({ lang }) {
  const content = lang === "tr" ? trData : enData;
  const pathname = usePathname();
  const { showLogo } = useStore();

  const getSwitchLink = (targetLang) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  return (
    <nav
      className="fixed left-0 z-50 flex items-center justify-between w-full text-white transition-all duration-300 h-nav layout-padding mix-blend-difference"
      style={{ top: "var(--nav-top)" }}
    >
      {/* LOGO - Manuel tracking yok */}
      <TransitionLink
        href={`/${lang}`}
        className={`font-medium-custom text-xl leading-7 antialiased transform-gpu will-change-transform backface-hidden relative z-50 transition-none flex items-baseline whitespace-nowrap ${
          showLogo ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>XVI</span>
        <div style={{ display: "inline-block", marginLeft: "0.35rem" }}>
          <span>INT</span>
        </div>
      </TransitionLink>

      {/* MENÜ - Manuel tracking yok */}
      <div className="flex hidden gap-5 md:flex">
        {content.navigation.map((item, index) => (
          <TransitionLink
            key={index}
            href={`/${lang}${item.path}`}
            className="transition-opacity font-medium-custom hover:opacity-50"
          >
            {item.name}
          </TransitionLink>
        ))}
      </div>

      {/* DİL - Manuel tracking yok */}
      <div className="flex gap-2 font-medium-custom">
        <TransitionLink
          href={getSwitchLink("tr")}
          className={
            lang === "tr"
              ? "opacity-100 underline"
              : "opacity-50 hover:opacity-100"
          }
        >
          TR
        </TransitionLink>
        <span className="opacity-30">/</span>
        <TransitionLink
          href={getSwitchLink("en")}
          className={
            lang === "en"
              ? "opacity-100 underline"
              : "opacity-50 hover:opacity-100"
          }
        >
          EN
        </TransitionLink>
      </div>
    </nav>
  );
}
