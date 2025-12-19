import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import TransitionLink from "@/components/UI/TransitionLink";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Kariyer" : "Career",
    description: "Join our team.",
    alternates: { canonical: `/${lang}/career` },
  };
}

export default async function CareerPage({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      {/* Başlık: Grid'e tam oturması için */}
      <div className="mb-16 main-grid">
        <div className="col-span-4 md:col-span-12">
          <h1 className="text-6xl font-normal">
            {content.career?.title || "Career"}
          </h1>
        </div>
      </div>

      {/* Liste Yapısı: Negative marginler temizlendi, temiz flex/grid yapısı */}
      <div className="w-full border-t border-border">
        {content.career?.items.map((job) => (
          <TransitionLink
            key={job.id}
            href={`/${lang}/career/${job.slug}`}
            className="block w-full py-10 transition-colors border-b group border-border hover:bg-zinc-50"
          >
            {/* İçerik de main-grid'e oturmalı ki hizalar şaşmasın */}
            <div className="items-baseline main-grid">
              {/* Sol Kolon: Başlık ve Etiketler */}
              <div className="col-span-4 md:col-span-6 xl:col-span-8">
                <h2 className="mb-3 text-3xl font-normal transition-transform duration-300 group-hover:translate-x-2">
                  {job.title}
                </h2>
                <div className="flex gap-4 text-sm uppercase opacity-60">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>

              {/* Sağ Kolon: Açıklama ve Buton */}
              <div className="flex flex-col items-end justify-between col-span-4 gap-4 md:col-span-6 xl:col-span-4 md:flex-row md:items-baseline">
                <p className="text-base opacity-80 line-clamp-2 md:max-w-xs">
                  {job.description}
                </p>

                {/* Buton */}
                <div className="px-6 py-2 text-sm text-white transition-all duration-300 transform translate-y-2 rounded-full opacity-0 bg-foreground group-hover:opacity-100 group-hover:translate-y-0 shrink-0">
                  {lang === "tr" ? "İncele" : "View"}
                </div>
              </div>
            </div>
          </TransitionLink>
        ))}

        {(!content.career?.items || content.career.items.length === 0) && (
          <p className="py-10 opacity-50">
            {lang === "tr"
              ? "Şu an açık pozisyon bulunmamaktadır."
              : "No open positions at the moment."}
          </p>
        )}
      </div>
    </div>
  );
}
