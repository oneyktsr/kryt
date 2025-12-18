"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Pathname eklendi
import Lenis from "lenis";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import Preloader from "@/components/Global/Preloader";
import PageTransition from "@/components/Global/PageTransition";
import { useStore } from "@/hooks/useStore";
import { TransitionProvider } from "@/context/TransitionContext";

export default function ClientLayout({ children, lang }) {
  const { isLoaded } = useStore();
  const pathname = usePathname(); // Sayfa değişimini takip etmek için
  const lenisRef = useRef(null); // Lenis örneğini tutmak için

  // 1. Lenis Başlatma ve Scroll Restorasyonu Kapatma
  useEffect(() => {
    // Tarayıcının kendi scroll hafızasını kapatıyoruz (Biz yöneteceğiz)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true, // Dokunmatik cihazlarda da senkronize olsun
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

  // 2. Sayfa Değiştiğinde Lenis'i ve Scroll'u SIFIRLA
  useEffect(() => {
    // Native scroll'u sıfırla
    window.scrollTo(0, 0);

    // Lenis'i zorla en başa al (immediate: true animasyonsuz anında ışınlar)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]); // Her sayfa değişiminde çalışır

  return (
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
