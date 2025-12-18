import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/UI/TransitionLink";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const item = content.log?.items.find((i) => i.slug === slug);

  if (!item) return { title: "Not Found" };

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/${lang}/log/${slug}` },
  };
}

export default async function LogDetail({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const item = content.log?.items.find((i) => i.slug === slug);

  if (!item) notFound();

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      {/* GERİ BUTONU */}
      <div className="mb-10">
        <TransitionLink
          href={`/${lang}/log`}
          className="flex items-center gap-2 text-sm uppercase transition-opacity opacity-50 hover:opacity-100"
        >
          ← {lang === "tr" ? "Log'a Dön" : "Back to Log"}
        </TransitionLink>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* ÜST BİLGİ */}
        <div className="mb-12 text-center">
          <div className="flex justify-center gap-4 mb-6 text-xs uppercase opacity-60">
            <span>{item.category}</span>
            <span>—</span>
            <span>{item.date}</span>
          </div>
          <h1 className="text-4xl font-normal leading-tight md:text-6xl">
            {item.title}
          </h1>
        </div>

        {/* İÇERİK ALANI */}
        {/* prose sınıfı kullanıyoruz ama global css ile font ayarını zorladık */}
        <div className="prose prose-lg text-black prose-zinc max-w-none">
          <p className="text-xl leading-relaxed whitespace-pre-line opacity-80">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}
