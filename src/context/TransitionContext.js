"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap-registry";

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainContainerRef = useRef(null);

  // Hydration hatasını önlemek için mounted kontrolü (Opsiyonel ama önerilir)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigateWithTransition = (href) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    gsap.to(mainContainerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  // Sunucu ve istemci eşleşmesi için mounted olana kadar bekleme
  // Ancak SEO için içeriği gizlememek adına children'ı direkt döndürüyoruz.
  // Context Provider render sırasında güvenlidir.
  return (
    <TransitionContext.Provider
      value={{
        navigateWithTransition,
        isTransitioning,
        setIsTransitioning,
        mainContainerRef,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
