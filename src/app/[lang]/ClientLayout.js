"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import Preloader from "@/components/Global/Preloader";
import PageTransition from "@/components/Global/PageTransition";
import { useStore } from "@/hooks/useStore";
// 1. EKSİK OLAN IMPORT GERİ GELDİ
import { TransitionProvider } from "@/context/TransitionContext";

export default function ClientLayout({ children, lang }) {
  // isScrollLocked state'ini store'dan alıyoruz
  const { isLoaded, isScrollLocked } = useStore();
  const pathname = usePathname();
  const lenisRef = useRef(null);

  // 1. Lenis Başlatma
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. SCROLL KİLİDİ (Navbar açılınca Lenis'i durdurur)
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isScrollLocked) {
      lenisRef.current.stop(); // Kilitle
    } else {
      lenisRef.current.start(); // Aç
    }
  }, [isScrollLocked]);

  // 3. Sayfa Değişimi Reset
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    // 2. KAPSAYICI GERİ GELDİ (Hatayı çözen kısım)
    <TransitionProvider>
      <div className="relative w-full min-h-screen text-black bg-zinc-100">
        {!isLoaded && <Preloader />}

        <Navbar lang={lang} />

        <main id="main-content" className="w-full min-h-screen">
          <PageTransition>
            {children}
            <Footer lang={lang} />
          </PageTransition>
        </main>
      </div>
    </TransitionProvider>
  );
}
