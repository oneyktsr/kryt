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

  // Bu ref, sayfanın ilk kez mi yüklendiğini yoksa navigasyon mu yapıldığını takip eder.
  // Başlangıçta "true" dur.
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // 1. Preloader bitmediyse hiçbir şey yapma.
    if (!isLoaded) return;

    // 2. Eğer bu, Preloader sonrası ilk gösterimse:
    if (isFirstLoad.current) {
      // Sayfayı yukarı al (garanti olsun)
      window.scrollTo(0, 0);

      // Animasyon YAPMA, sadece görünür olduğundan emin ol.
      gsap.set(mainContainerRef.current, { opacity: 1 });

      // Kilidi kapat. Artık bundan sonraki her değişim "navigasyon" sayılacak.
      isFirstLoad.current = false;
      return;
    }

    // 3. Buraya geldiyse, kullanıcı linke tıklamış demektir (İlk yükleme değil).
    // GİRİŞ ANİMASYONU (Fade In)

    // Scroll'u yukarı al
    window.scrollTo(0, 0);

    gsap.fromTo(
      mainContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        clearProps: "opacity",
        onComplete: () => {
          setIsTransitioning(false); // Link kilidini aç
        },
      }
    );
  }, [pathname, isLoaded, setIsTransitioning, mainContainerRef]);

  return (
    // Başlangıçta opacity 1 veriyoruz ki Preloader arkasında sayfa hazır beklesin.
    // Animasyonlar gerektiğinde bunu 0 yapıp 1'e çekecek.
    <div ref={mainContainerRef} className="w-full min-h-screen opacity-100">
      {children}
    </div>
  );
}
