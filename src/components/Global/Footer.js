"use client";

import Link from "next/link";
import TransitionLink from "@/components/UI/TransitionLink";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

export default function Footer({ lang }) {
  const content = lang === "tr" ? trData : enData;
  const { footer } = content;

  const socials = [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Twitter / X", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Behance", url: "https://behance.net" },
  ];

  const currentYear = new Date().getFullYear();
  const logoText = "XVI INTERACTIVE".split("");

  return (
    // DÜZELTME 1: 'font-sans' ekleyerek ana fontu en baştan zorladık.
    <footer className="w-full pt-20 mt-20 overflow-hidden font-sans border-t bg-zinc-100 md:pt-40 md:mt-40 border-black/10">
      {/* 1. ANA İÇERİK BÖLÜMÜ */}
      <div className="layout-padding">
        {/* Üst Kısım: Devasa Başlık (Let's Talk) ve Newsletter */}
        <div className="mb-20 main-grid md:mb-32">
          {/* Sol: Devasa Tıklanabilir Başlık */}
          <div className="flex flex-col justify-between h-full col-span-4 md:col-span-6">
            <TransitionLink href={`/${lang}/contact`} className="block group">
              {/* DÜZELTME 2: 'font-sans' burada da eklendi. tracking biraz rahatlatıldı. */}
              <h2 className="max-w-2xl mb-10 font-sans text-6xl font-normal leading-tight tracking-tight transition-opacity duration-500 md:text-8xl group-hover:opacity-50">
                {footer.title}
              </h2>
            </TransitionLink>
          </div>

          {/* Sağ: Newsletter Formu */}
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <span className="block mb-4 font-sans text-xs uppercase opacity-40">
              {footer.newsletter?.label || "Newsletter"}
            </span>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  placeholder={
                    footer.newsletter?.placeholder || "Email Address"
                  }
                  className="w-full py-4 font-sans text-xl transition-colors bg-transparent border-b rounded-none outline-none border-black/20 placeholder:text-black/30 group-hover:border-black"
                />
                <button
                  type="submit"
                  className="absolute right-0 font-sans text-xs uppercase transition-opacity -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100"
                >
                  {footer.newsletter?.button || "Subscribe"}
                </button>
              </div>
            </form>
            <p className="mt-4 font-sans text-sm opacity-40">
              {footer.newsletter?.note || "Stay updated with our latest news."}
            </p>
          </div>
        </div>

        {/* Orta Kısım: Linkler ve Bilgiler */}
        <div className="pt-10 mb-20 border-t main-grid md:mb-24 border-black/10">
          {/* Sitemap */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="mb-6 font-sans text-xs uppercase opacity-40">
              {footer.links?.sitemap || "Sitemap"}
            </h3>
            <ul className="space-y-2">
              {content.navigation.map((item, index) => (
                <li key={index}>
                  <TransitionLink
                    href={`/${lang}${item.path}`}
                    className="block font-sans text-lg transition-opacity hover:opacity-50 w-fit"
                  >
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="mb-6 font-sans text-xs uppercase opacity-40">
              {footer.links?.socials || "Socials"}
            </h3>
            <ul className="space-y-2">
              {socials.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-lg transition-opacity hover:opacity-50 w-fit"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="col-span-4 mt-10 md:col-span-3 md:mt-0">
            <h3 className="mb-6 font-sans text-xs uppercase opacity-40">
              {footer.links?.contact || "Contact"}
            </h3>
            <address className="space-y-2 font-sans text-lg not-italic">
              <a
                href={`mailto:${content.contact.email}`}
                className="block transition-opacity hover:opacity-50 w-fit"
              >
                {content.contact.email}
              </a>
              <p className="opacity-60">{content.contact.address}</p>
            </address>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col justify-end col-span-4 mt-10 md:col-span-3 md:mt-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-sans text-xs text-left uppercase transition-opacity md:text-right opacity-40 hover:opacity-100 w-fit md:ml-auto"
            >
              ↑ {footer.links?.legal?.backToTop || "Back to Top"}
            </button>
          </div>
        </div>

        {/* 2. ALT KISIM: COPYRIGHT VE DEVASA LOGO */}
        <div className="mt-auto">
          <div className="pt-4 pb-0 border-t border-black/10">
            {/* Yasal Metinler */}
            <div className="flex flex-col md:flex-row justify-between items-baseline text-[10px] md:text-xs opacity-40 uppercase mb-2 md:mb-0 font-sans">
              <span>
                © {currentYear} XVI Interactive.{" "}
                {footer.links?.legal?.rights || "All rights reserved."}
              </span>
              <div className="flex gap-4 mt-2 md:mt-0">
                <Link href="#" className="hover:opacity-100">
                  {footer.links?.legal?.privacy || "Privacy Policy"}
                </Link>
                <Link href="#" className="hover:opacity-100">
                  {footer.links?.legal?.terms || "Terms of Service"}
                </Link>
              </div>
            </div>

            {/* DEVASA LOGO (Swiss Style) */}
            <div className="w-full overflow-hidden select-none pointer-events-none mt-4 md:mt-6 -mb-[1.5vw]">
              {/* DÜZELTME 3: font-sans burada da zorlandı */}
              <h1
                className="flex justify-between w-full font-medium font-sans tracking-tighter text-black
                             text-[10.5vw] md:text-[11.2vw] leading-[0.9]"
              >
                {logoText.map((char, index) => (
                  <span
                    key={index}
                    className={char === " " ? "w-[4vw]" : "block"}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
