"use client";
import { useEffect, useRef } from "react";
import { useStore } from "@/hooks/useStore";
import { gsap, SplitText } from "@/lib/gsap-registry";
import styles from "./Preloader.module.scss";

export default function Preloader() {
  const { setLoaded, setShowLogo } = useStore();
  const wrapperRef = useRef(null);
  const curtainRef = useRef(null);
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const interactiveRef = useRef(null);
  const interactiveWrapperRef = useRef(null);

  const numerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "XIII",
    "XIV",
    "XV",
    "XVI",
  ];

  useEffect(() => {
    // Başlangıç ayarları...
    gsap.set(wrapperRef.current, { zIndex: 9999 });
    gsap.set(textContainerRef.current, {
      position: "fixed",
      top: "50%",
      left: 0,
      yPercent: -50,
      width: "100%",
      zIndex: 10000,
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setShowLogo(true);
        setLoaded();
        gsap.set([wrapperRef.current, textContainerRef.current], {
          display: "none",
        });
      },
    });

    // SAYAÇ
    const stepDuration = 2.0 / (numerals.length - 1);
    numerals.forEach((num, index) => {
      if (index > 0) {
        tl.to(textRef.current, {
          duration: stepDuration,
          ease: "none",
          onStart: () => {
            if (textRef.current) textRef.current.innerText = num;
          },
        });
      }
    });

    // INTERACTIVE
    const split = new SplitText(interactiveRef.current, { type: "chars" });
    const chars = split.chars;
    tl.set(interactiveRef.current, { opacity: 1 });

    tl.from(chars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
    });

    // Silinme
    tl.add(() => {
      const vanishChars = chars.slice(3);
      gsap.to(vanishChars, {
        opacity: 0,
        duration: 0.05,
        stagger: { amount: 0.4, from: "random" },
        ease: "none",
        onComplete: () => {
          gsap.set(vanishChars, { display: "none" });
        },
      });
    });

    tl.to({}, { duration: 0.5 });

    // Yerine Oturma
    const moveDuration = 1.6;
    const easeType = "power4.inOut";

    tl.to(
      curtainRef.current,
      { yPercent: -100, duration: moveDuration, ease: easeType },
      "move"
    );
    tl.to(
      textContainerRef.current,
      {
        top: "var(--nav-top)",
        yPercent: 0,
        duration: moveDuration,
        ease: easeType,
      },
      "move"
    );
    tl.to(
      [textRef.current, interactiveRef.current],
      {
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
        duration: moveDuration,
        ease: easeType,
      },
      "move"
    );
    tl.to(
      interactiveWrapperRef.current,
      { marginLeft: "0.35rem", duration: moveDuration, ease: easeType },
      "move"
    );
  }, [setLoaded, setShowLogo]);

  return (
    <>
      <div ref={curtainRef} className={styles.curtain}></div>
      <div ref={wrapperRef} className={styles.wrapper}></div>

      <div
        ref={textContainerRef}
        className="flex items-baseline text-white pointer-events-none layout-padding will-change-transform mix-blend-difference"
      >
        <span
          ref={textRef}
          className="font-medium-custom leading-none antialiased block text-[10vw] md:text-8xl whitespace-nowrap"
        >
          I
        </span>

        <div
          ref={interactiveWrapperRef}
          className="ml-[1.5vw] md:ml-8"
          style={{ overflow: "hidden", display: "inline-block" }}
        >
          <span
            ref={interactiveRef}
            className="font-medium-custom leading-none antialiased inline-block text-[10vw] md:text-8xl whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            INTERACTIVE
          </span>
        </div>
      </div>
    </>
  );
}
