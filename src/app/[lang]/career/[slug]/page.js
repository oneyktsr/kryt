import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/UI/TransitionLink";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const job = content.career?.items.find((j) => j.slug === slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: job.title,
    description: job.description,
    alternates: { canonical: `/${lang}/career/${slug}` },
  };
}

export default async function CareerDetail({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const job = content.career?.items.find((j) => j.slug === slug);

  if (!job) notFound();

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      {/* Geri Dön Butonu */}
      <div className="mb-10">
        <TransitionLink
          href={`/${lang}/career`}
          className="flex items-center gap-2 text-sm uppercase transition-opacity opacity-50 hover:opacity-100"
        >
          ← {lang === "tr" ? "Kariyer'e Dön" : "Back to Career"}
        </TransitionLink>
      </div>

      <div className="main-grid">
        {/* Başlık: Tam genişlik */}
        <div className="col-span-4 mb-10 md:col-span-6 xl:col-span-12">
          <h1 className="text-5xl font-normal md:text-7xl">{job.title}</h1>
        </div>

        {/* Sol Kolon: Metadata */}
        <div className="col-span-4 md:col-span-2 xl:col-span-3">
          <div className="sticky flex flex-col gap-2 text-sm uppercase opacity-60 top-32">
            <span>{job.location}</span>
            <span>{job.type}</span>
            <div className="w-10 h-[1px] bg-foreground my-4 opacity-50"></div>
            <span>Referans: {slug.toUpperCase()}</span>
          </div>
        </div>

        {/* Sağ Kolon: İçerik */}
        <div className="col-span-4 space-y-12 md:col-span-4 xl:col-span-8 xl:col-start-5">
          <div className="text-xl leading-relaxed opacity-80">
            <p>{job.description}</p>
          </div>

          {job.requirements && (
            <div>
              <h3 className="mb-6 text-sm font-medium uppercase opacity-100">
                {lang === "tr" ? "Gereksinimler" : "Requirements"}
              </h3>
              <ul className="space-y-3 text-lg list-disc list-inside opacity-80">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-10">
            <button className="px-8 py-4 text-lg text-white transition-colors rounded-full bg-foreground hover:opacity-80">
              {lang === "tr" ? "Başvuru Yap" : "Apply Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
