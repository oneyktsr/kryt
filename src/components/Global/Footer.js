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

  // Harfleri bölüyoruz
  const logoText = "XVI INTERACTIVE".split("");

  return (
    <footer className="w-full pt-20 mt-20 overflow-hidden border-t md:pt-40 bg-zinc-100 md:mt-40 border-black/10">
      {/* TÜM İÇERİK LAYOUT-PADDING İÇİNDE */}
      <div className="flex flex-col h-full layout-padding">
        {/* ... (ÜST KISIMLAR DEĞİŞMEDİ, AYNEN KALIYOR) ... */}
        <div className="mb-20 main-grid md:mb-32">
          <div className="flex flex-col justify-between h-full col-span-4 md:col-span-6">
            <h2 className="max-w-md mb-10 text-4xl font-normal leading-tight md:text-6xl md:mb-0">
              {footer.title}
            </h2>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <span className="block mb-4 text-xs uppercase opacity-40">
              {footer.newsletter.label}
            </span>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  placeholder={footer.newsletter.placeholder}
                  className="w-full py-4 text-xl transition-colors bg-transparent border-b rounded-none outline-none border-black/20 placeholder:text-black/30 group-hover:border-black"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-xs uppercase transition-opacity -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100"
                >
                  {footer.newsletter.button}
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm opacity-40">{footer.newsletter.note}</p>
          </div>
        </div>

        {/* ... (LINKLER DEĞİŞMEDİ) ... */}
        <div className="mb-20 main-grid md:mb-24">
          <div className="col-span-2 md:col-span-3">
            <h3 className="mb-6 text-xs uppercase opacity-40">
              {footer.links.sitemap}
            </h3>
            <ul className="space-y-2">
              {content.navigation.map((item, index) => (
                <li key={index}>
                  <TransitionLink
                    href={`/${lang}${item.path}`}
                    className="block text-lg transition-opacity hover:opacity-50 w-fit"
                  >
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <h3 className="mb-6 text-xs uppercase opacity-40">
              {footer.links.socials}
            </h3>
            <ul className="space-y-2">
              {socials.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg transition-opacity hover:opacity-50 w-fit"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 mt-10 md:col-span-3 md:mt-0">
            <h3 className="mb-6 text-xs uppercase opacity-40">
              {footer.links.contact}
            </h3>
            <address className="space-y-2 text-lg not-italic">
              <a
                href={`mailto:${content.contact.email}`}
                className="block transition-opacity hover:opacity-50 w-fit"
              >
                {content.contact.email}
              </a>
              <p className="opacity-60">{content.contact.address}</p>
            </address>
          </div>
          <div className="flex flex-col justify-end col-span-4 mt-10 md:col-span-3 md:mt-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs text-left uppercase transition-opacity md:text-right opacity-40 hover:opacity-100 w-fit md:ml-auto"
            >
              ↑ {footer.links.legal.backToTop}
            </button>
          </div>
        </div>

        {/* --- DÜZELTİLEN KISIM: COPYRIGHT VE LOGO --- */}
        <div className="mt-auto">
          {/* Çizgi, padding sınırlarına uyar */}
          <div className="pt-4 pb-0 border-t border-black/10">
            <div className="flex flex-col md:flex-row justify-between items-baseline text-[10px] md:text-xs opacity-40 uppercase mb-2 md:mb-0">
              <span>
                © {currentYear} XVI Interactive. {footer.links.legal.rights}
              </span>
              <div className="flex gap-4 mt-2 md:mt-0">
                <Link href="#" className="hover:opacity-100">
                  {footer.links.legal.privacy}
                </Link>
                <Link href="#" className="hover:opacity-100">
                  {footer.links.legal.terms}
                </Link>
              </div>
            </div>

            {/* DEVASA LOGO AYARLARI:
               1. w-full: Kapsayıcıyı doldur (layout-padding içi).
               2. justify-between: İlk harf sola, son harf sağa yapışır.
               3. text-[10.5vw] ve text-[11.2vw]: Font boyutunu küçülttük ki E harfi dışarı taşmasın.
               4. leading-[0.9]: Satır yüksekliğini artırdık ki harflerin tepesi kesilmesin.
               5. -mb-[1.5vw]: Alt boşluğu negatif vererek footer zeminine yaklaştırdık (aşırıya kaçmadan).
            */}
            <div className="w-full overflow-hidden select-none pointer-events-none mt-4 md:mt-6 -mb-[1.5vw]">
              <h1
                className="flex justify-between w-full font-medium font-medium-custom tracking-tighter text-black
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
