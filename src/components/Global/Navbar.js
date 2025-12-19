"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import TransitionLink from "@/components/UI/TransitionLink";
import { usePathname, useRouter } from "next/navigation";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import { useStore } from "@/hooks/useStore";
import { gsap } from "@/lib/gsap-registry";

export default function Navbar({ lang }) {
  const content = lang === "tr" ? trData : enData;
  const pathname = usePathname();
  const router = useRouter();
  const { showLogo, setScrollLocked } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const menuTextsRef = useRef([]);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);

  const getSwitchLink = (targetLang) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  useLayoutEffect(() => {
    gsap.set(menuRef.current, { y: "-100%" });
    // Metin referanslarını kontrol et
    if (menuTextsRef.current.length > 0) {
      gsap.set(menuTextsRef.current, { y: "105%" });
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setScrollLocked(false);
      gsap.set(menuRef.current, { y: "-100%" });
      gsap.set(menuTextsRef.current, { y: "105%" });
      gsap.set([topLineRef.current, bottomLineRef.current], {
        rotation: 0,
        y: 0,
      });
    }
  }, [pathname, setScrollLocked]);

  const openMenu = () => {
    setIsMenuOpen(true);
    setScrollLocked(true);

    const tl = gsap.timeline();

    tl.to(menuRef.current, {
      y: "0%",
      duration: 0.8,
      ease: "power4.inOut",
    });

    if (menuTextsRef.current.length > 0) {
      tl.to(
        menuTextsRef.current,
        { y: "0%", duration: 0.6, stagger: 0.05, ease: "power2.out" },
        ">-0.2"
      );
    }

    gsap.to(topLineRef.current, {
      rotation: 45,
      y: 4,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(bottomLineRef.current, {
      rotation: -45,
      y: -4,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const closeMenu = (onCompleteCallback) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        setScrollLocked(false);
        if (onCompleteCallback) onCompleteCallback();
      },
    });

    if (menuTextsRef.current.length > 0) {
      tl.to(menuTextsRef.current, {
        y: "105%",
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    tl.to(
      menuRef.current,
      { y: "-100%", duration: 0.8, ease: "power4.inOut" },
      "-=0.1"
    );

    gsap.to(topLineRef.current, {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(bottomLineRef.current, {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const toggleMenu = () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  };

  const handleMobileNav = (e, href) => {
    e.preventDefault();
    if (pathname === href) {
      closeMenu();
      return;
    }
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      gsap.to(mainContent, { opacity: 0, duration: 0.2, ease: "power1.out" });
    }
    closeMenu(() => {
      router.push(href);
    });
  };

  const addToTexts = (el) => {
    if (el && !menuTextsRef.current.includes(el)) {
      menuTextsRef.current.push(el);
    }
  };

  return (
    <>
      <nav
        className="fixed left-0 z-50 flex items-baseline justify-between w-full transition-all duration-300 text-background h-nav layout-padding mix-blend-difference"
        style={{ top: "var(--nav-top)" }}
      >
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

        {/* Desktop Menu */}
        <div className="hidden gap-5 md:flex">
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

        {/* Desktop Lang */}
        <div className="hidden gap-2 md:flex font-medium-custom">
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

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative group"
        >
          <span
            ref={topLineRef}
            className="w-full h-[2px] bg-background block origin-center transition-transform"
          ></span>
          <span
            ref={bottomLineRef}
            className="w-full h-[2px] bg-background block origin-center transition-transform"
          ></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 w-full h-[100dvh] bg-foreground z-40 flex flex-col justify-between layout-padding py-32 md:hidden"
      >
        <div className="flex flex-col gap-6">
          {content.navigation.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <a
                href={`/${lang}${item.path}`}
                onClick={(e) => handleMobileNav(e, `/${lang}${item.path}`)}
                className="block text-5xl font-normal leading-tight cursor-pointer text-background font-medium-custom"
              >
                <div
                  ref={addToTexts}
                  className="will-change-transform translate-y-[105%]"
                >
                  {item.name}
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <div className="overflow-hidden">
            <div
              ref={addToTexts}
              className="flex gap-4 text-background text-xl font-normal font-medium-custom opacity-60 will-change-transform translate-y-[105%]"
            >
              <a
                href={getSwitchLink("tr")}
                onClick={(e) => handleMobileNav(e, getSwitchLink("tr"))}
                className={
                  lang === "tr" ? "opacity-100 underline" : "hover:opacity-100"
                }
              >
                TR
              </a>
              <span>/</span>
              <a
                href={getSwitchLink("en")}
                onClick={(e) => handleMobileNav(e, getSwitchLink("en"))}
                className={
                  lang === "en" ? "opacity-100 underline" : "hover:opacity-100"
                }
              >
                EN
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <a
              href={`mailto:${content.contact.email}`}
              className="block text-sm tracking-tight uppercase text-background opacity-40"
            >
              <div
                ref={addToTexts}
                className="will-change-transform translate-y-[105%]"
              >
                {content.contact.email}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
