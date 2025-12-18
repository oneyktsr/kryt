"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-registry";
import { useStore } from "@/hooks/useStore";
import { useTransition } from "@/context/TransitionContext";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const { isLoaded } = useStore();
  const { mainContainerRef, setIsTransitioning } = useTransition();

  // İlk yükleme kontrolü
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // 1. GÜVENLİK ÖNLEMİ: Ana kapsayıcıyı (Layout'taki div) sıfırla.
    // Navbar mobilde bunu gizlemiş olabilir. Yeni sayfa geldiğinde görünür olmalı.
    const mainLayoutContent = document.getElementById("main-content");
    if (mainLayoutContent) {
      gsap.set(mainLayoutContent, { opacity: 1 });
    }

    if (!isLoaded) return;

    if (isFirstLoad.current) {
      window.scrollTo(0, 0);
      gsap.set(mainContainerRef.current, { opacity: 1 });
      isFirstLoad.current = false;
      return;
    }

    // GİRİŞ ANİMASYONU (Fade In)
    window.scrollTo(0, 0);

    gsap.fromTo(
      mainContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6, // Biraz daha yavaş ve yumuşak
        ease: "power2.out",
        clearProps: "opacity",
        onComplete: () => {
          setIsTransitioning(false);
        },
      }
    );
  }, [pathname, isLoaded, setIsTransitioning, mainContainerRef]);

  return (
    <div ref={mainContainerRef} className="w-full min-h-screen opacity-100">
      {children}
    </div>
  );
}
