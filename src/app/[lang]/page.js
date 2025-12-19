import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return {
    title: content.hero?.title || "Digital Experiences",
    description: content.hero?.subtitle || "Creative Studio",
    alternates: { canonical: `/${lang}` },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return (
    <main className="min-h-screen layout-padding page-top-padding section-spacing">
      {/* LAYOUT DÜZELTMESİ:
         1. 'main-grid' sınıfını en dış kapsayıcıya verdik.
         2. 'gap-y' ekledik ki mobilde elemanlar birbirine girmesin.
      */}
      <div className="main-grid gap-y-10 md:gap-y-0">
        {/* Başlık Alanı: Grid'e tam oturması için col-span ayarları */}
        <div className="col-span-4 md:col-span-6 xl:col-span-12">
          {/* TİPOGRAFİ DÜZELTMESİ:
             - 'tracking-tighter' gibi manuel sınıflar kaldırıldı.
             - globals.css'teki -0.02em ayarı geçerli.
             - font-normal ve leading-none ile "Swiss" görünüm sağlandı.
          */}
          <h1 className="text-6xl font-normal leading-none md:text-8xl xl:text-9xl">
            {content.hero?.title || "We Create Digital Experiences"}
          </h1>
        </div>

        {/* Alt Metin Alanı: Grid'in sağ tarafına yaslama (Swiss Style Hizalama) */}
        <div className="col-span-4 mt-10 md:col-span-3 xl:col-span-4 xl:col-start-9">
          <p className="text-xl leading-relaxed opacity-70">
            {content.hero?.subtitle || "Creative studio based in..."}
          </p>
        </div>
      </div>
    </main>
  );
}
