"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer"; // Footer Eklendi
import Preloader from "@/components/Global/Preloader";
import PageTransition from "@/components/Global/PageTransition";
import { useStore } from "@/hooks/useStore";
import { TransitionProvider } from "@/context/TransitionContext";

export default function ClientLayout({ children, lang }) {
  const { isLoaded } = useStore();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <TransitionProvider>
      <div className="relative w-full min-h-screen text-black bg-zinc-100">
        {!isLoaded && <Preloader />}
        <Navbar lang={lang} />

        <main id="main-content" className="w-full min-h-screen">
          <PageTransition>
            {/* İçerik */}
            {children}

            {/* Footer Buraya Eklendi: Sayfa içeriğinin hemen altında yer alacak */}
            <Footer lang={lang} />
          </PageTransition>
        </main>
      </div>
    </TransitionProvider>
  );
}
