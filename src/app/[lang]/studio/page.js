import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;
  return {
    title: content.studio?.title || "Studio",
    description: content.studio?.subtitle,
    alternates: { canonical: `/${lang}/studio` },
  };
}

export default async function StudioPage({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      <h1 className="mb-16 text-6xl font-normal">
        {content.studio?.title || (lang === "tr" ? "Stüdyo" : "Studio")}
      </h1>

      <div className="w-full aspect-[16/9] bg-zinc-200 mb-20 relative rounded-lg overflow-hidden">
        {content.studio?.image ? (
          <Image
            src={content.studio.image}
            alt="Studio"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            Studio Image
          </div>
        )}
      </div>

      <div className="main-grid">
        <div className="col-span-4 mb-10 md:col-span-3 xl:col-span-4 md:mb-0">
          <h2 className="text-3xl font-normal leading-tight">
            {content.studio?.subtitle}
          </h2>
        </div>
        <div className="col-span-4 md:col-span-3 xl:col-span-6 xl:col-start-7">
          <div className="space-y-8 text-xl leading-relaxed opacity-80">
            <p>{content.studio?.description}</p>
            {/* Ekstra metinleri data dosyasından çekmek daha sağlıklı olur */}
          </div>
        </div>
      </div>
    </div>
  );
}
