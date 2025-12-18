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

      <div className="max-w-4xl">
        <h1 className="mb-6 text-5xl font-normal md:text-7xl">{job.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 mb-12 text-sm uppercase opacity-60">
          <span>{job.location}</span>
          <span>{job.type}</span>
        </div>

        <div className="mb-16 space-y-10 text-xl leading-relaxed opacity-80">
          <p>{job.description}</p>

          {job.requirements && (
            <div>
              {/* Alt Başlık */}
              <h3 className="mb-4 text-sm font-medium text-black uppercase opacity-100">
                {lang === "tr" ? "Gereksinimler" : "Requirements"}
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Büyük Buton: tracking temiz */}
        <button className="px-8 py-4 text-lg text-white transition-colors bg-black rounded-full hover:bg-brand-red">
          {lang === "tr" ? "Başvuru Yap" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}
