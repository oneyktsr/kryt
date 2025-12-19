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
      <h1 className="mb-16 text-6xl font-normal">
        {content.career?.title || "Career"}
      </h1>

      {/* DÜZELTME: border-black/10 -> border-border */}
      <div className="flex flex-col border-t border-border">
        {content.career?.items.map((job) => (
          <TransitionLink
            key={job.id}
            href={`/${lang}/career/${job.slug}`}
            // DÜZELTME: border-border ve hover renkleri
            className="flex flex-col items-baseline justify-between gap-4 px-4 py-10 -mx-4 transition-colors border-b rounded-lg cursor-pointer border-border md:flex-row hover:bg-black/5 group"
          >
            <div className="flex-1">
              <h2 className="text-3xl font-normal transition-transform duration-300 group-hover:translate-x-2">
                {job.title}
              </h2>

              <div className="flex gap-4 mt-2 text-sm uppercase opacity-60">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>

              <p className="max-w-xl mt-4 opacity-80">{job.description}</p>

              <div className="flex gap-2 mt-4">
                {job.requirements?.map((req, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs border rounded border-border"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-8 py-3 mt-4 text-sm text-white transition-opacity duration-300 transform translate-y-2 rounded-full opacity-0 bg-foreground md:mt-0 group-hover:opacity-100 group-hover:translate-y-0">
              {lang === "tr" ? "İncele" : "View"}
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
