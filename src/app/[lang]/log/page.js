import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import TransitionLink from "@/components/UI/TransitionLink";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "Log",
    description: "Thoughts, ideas and culture.",
    alternates: { canonical: `/${lang}/log` },
  };
}

export default async function LogPage({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;
  const pageTitle =
    content.log?.title === "XVI Log" ? "Log" : content.log?.title || "Log";

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      <h1 className="mb-16 text-6xl font-normal">{pageTitle}</h1>

      {/* Grid Sistemi Güncellendi: main-grid kullanıldı */}
      <div className="main-grid">
        {content.log?.items.map((item) => (
          <TransitionLink
            key={item.id}
            href={`/${lang}/log/${item.slug}`}
            className="flex flex-col block h-full col-span-4 mb-16 md:col-span-3 xl:col-span-4 group md:mb-0"
          >
            {/* Görsel */}
            <div className="bg-zinc-200 w-full aspect-[3/2] mb-6 rounded-lg relative overflow-hidden group-hover:opacity-90 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center text-xs uppercase opacity-50 text-zinc-400">
                Asset
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-baseline justify-between pb-3 mb-3 border-b border-border">
              <span className="text-xs font-medium uppercase opacity-60">
                {item.category}
              </span>
              <span className="text-xs opacity-50 tabular-nums">
                {item.date}
              </span>
            </div>

            {/* Başlık */}
            <h2 className="mb-3 text-3xl font-normal leading-tight group-hover:underline decoration-1 underline-offset-4">
              {item.title}
            </h2>

            {/* Özet */}
            <p className="mt-auto text-base leading-relaxed opacity-60 line-clamp-3">
              {item.excerpt}
            </p>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
