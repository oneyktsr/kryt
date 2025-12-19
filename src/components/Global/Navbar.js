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
  const { showLogo, setScrollLocked } = useStore(); // setScrollLocked buradan geliyor

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Referanslar
  const menuRef = useRef(null); // Siyah Perde
  const menuTextsRef = useRef([]); // Hareket Eden Metinler
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);

  const getSwitchLink = (targetLang) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  // 1. BAŞLANGIÇ KONUMLARI (Layout Effect ile Titremeyi Önle)
  useLayoutEffect(() => {
    // Perde yukarıda gizli
    gsap.set(menuRef.current, { y: "-100%" });
    // Metinler aşağıda gizli (Maskenin altında)
    if (menuTextsRef.current.length > 0) {
      gsap.set(menuTextsRef.current, { y: "105%" });
    }
  }, []);

  // 2. SAYFA DEĞİŞİMİNDE MENÜYÜ KAPAT
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

  // 3. MENÜ AÇMA FONKSİYONU
  const openMenu = () => {
    setIsMenuOpen(true);
    setScrollLocked(true); // Scroll Kilitle

    const tl = gsap.timeline();

    // ADIM 1: Siyah Perde İniyor (Hızlı)
    tl.to(menuRef.current, {
      y: "0%",
      duration: 0.8,
      ease: "power4.inOut",
    });

    // ADIM 2: Metinler Çıkıyor
    // Perde inmesi bitmeye yakın (>-0.2) metinler yukarı fırlıyor
    if (menuTextsRef.current.length > 0) {
      tl.to(
        menuTextsRef.current,
        {
          y: "0%",
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        },
        ">-0.2"
      );
    }

    // İkon Animasyonu
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

  // 4. MENÜ KAPATMA FONKSİYONU
  const closeMenu = (onCompleteCallback) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        setScrollLocked(false); // Scroll Kilidini Aç
        if (onCompleteCallback) onCompleteCallback();
      },
    });

    // Kapanış: Metinler aşağı düşüyor
    if (menuTextsRef.current.length > 0) {
      tl.to(menuTextsRef.current, {
        y: "105%",
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    // Perde kalkıyor
    tl.to(
      menuRef.current,
      {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
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

  // DÜZELTME: Ref dizisini her render'da sıfırlamıyoruz!
  // Sadece eklerken kontrol ediyoruz.
  const addToTexts = (el) => {
    if (el && !menuTextsRef.current.includes(el)) {
      menuTextsRef.current.push(el);
    }
  };

  return (
    <>
      <nav
        className="fixed left-0 z-50 flex items-baseline justify-between w-full text-white transition-all duration-300 h-nav layout-padding mix-blend-difference"
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
            className="w-full h-[2px] bg-white block origin-center transition-transform"
          ></span>
          <span
            ref={bottomLineRef}
            className="w-full h-[2px] bg-white block origin-center transition-transform"
          ></span>
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        ref={menuRef}
        // h-[100dvh] mobil tarayıcılar için daha güvenli
        className="fixed inset-0 w-full h-[100dvh] bg-[#121212] z-40 flex flex-col justify-between layout-padding py-32 md:hidden"
      >
        <div className="flex flex-col gap-6">
          {content.navigation.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <a
                href={`/${lang}${item.path}`}
                onClick={(e) => handleMobileNav(e, `/${lang}${item.path}`)}
                className="block text-[#f4f1ec] text-5xl font-normal font-medium-custom leading-tight cursor-pointer"
              >
                {/* DÜZELTME: Tailwind 'translate-y' sınıfını kaldırdık, GSAP yönetecek */}
                <div ref={addToTexts} className="will-change-transform">
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
              className="flex gap-4 text-[#f4f1ec] text-xl font-normal font-medium-custom opacity-60 will-change-transform"
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
              className="block text-[#f4f1ec] opacity-40 text-sm uppercase tracking-tight"
            >
              <div ref={addToTexts} className="will-change-transform">
                {content.contact.email}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
