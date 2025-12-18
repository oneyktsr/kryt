"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Global/Navbar";
import PageTransition from "@/components/Global/PageTransition";
import { TransitionProvider } from "@/context/TransitionContext";
import { useStore } from "@/hooks/useStore";

export default function NotFound() {
  const pathname = usePathname();
  const [lang, setLang] = useState("en");
  const { setShowLogo } = useStore();

  useEffect(() => {
    // Logo görünürlüğünü aç
    setShowLogo(true);

    // Dili algıla
    if (pathname?.startsWith("/tr")) {
      setLang("tr");
    }
  }, [pathname, setShowLogo]);

  const content = {
    title: lang === "tr" ? "Sayfa Bulunamadı" : "Page Not Found",
    description:
      lang === "tr"
        ? "Aradığınız sayfa mevcut değil veya taşınmış olabilir."
        : "The page you are looking for doesn't exist or has been moved.",
    backButton: lang === "tr" ? "Anasayfaya Dön" : "Back to Home",
    homeLink: lang === "tr" ? "/tr" : "/en",
  };

  return (
    <TransitionProvider>
      {/* SEO: Noindex */}
      <title>
        {lang === "tr" ? "Sayfa Bulunamadı | XVI" : "Page Not Found | XVI"}
      </title>
      <meta name="robots" content="noindex, nofollow" />

      {/* Ana Kapsayıcı: Flex Column */}
      <div className="relative w-full h-screen bg-[#f4f1ec] text-[#121212] flex flex-col overflow-hidden">
        {/* Navbar: En üstte sabit durur */}
        <Navbar lang={lang} />

        {/* İçerik Alanı: PageTransition içinde */}
        <PageTransition>
          {/* Flexbox ile içeriği hem dikey hem yatay olarak tam ortaya kilitliyoruz.
              h-full ve flex-grow sayesinde navbar hariç kalan tüm alanı kaplar.
          */}
          <main className="relative z-10 flex flex-col items-center justify-center w-full h-screen px-5 text-center">
            {/* 404 Yazısı: Sabit, devasa ve ortalı */}
            <h1 className="text-[25vw] md:text-[20vw] leading-none font-medium font-medium-custom tracking-tighter select-none opacity-90">
              404
            </h1>

            {/* Açıklama ve Başlık */}
            <div className="space-y-4 mt-[-2vw] md:mt-[-1vw] animate-in fade-in duration-500">
              <h2 className="text-2xl font-normal md:text-3xl">
                {content.title}
              </h2>
              <p className="max-w-md mx-auto text-base md:text-lg opacity-60">
                {content.description}
              </p>
            </div>

            {/* Buton */}
            <div className="mt-10">
              <Link
                href={content.homeLink}
                className="px-10 py-4 bg-[#121212] text-[#f4f1ec] rounded-full text-sm font-medium hover:bg-[#ee382b] hover:text-white transition-colors duration-300 inline-block"
              >
                {content.backButton}
              </Link>
            </div>

            {/* Hata Kodu Alt Bilgisi (Opsiyonel, en alta itmek yerine görsel denge için burada bıraktım veya absolute ile en alta alabiliriz) */}
            <div className="absolute text-xs uppercase bottom-10 opacity-30">
              Error Code: 404 — XVI Interactive
            </div>
          </main>
        </PageTransition>
      </div>
    </TransitionProvider>
  );
}
