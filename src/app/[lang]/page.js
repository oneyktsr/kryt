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
      <div className="main-grid">
        <div className="col-span-4 mb-10 md:col-span-6 xl:col-span-12 md:mb-20">
          <h1 className="text-6xl font-normal leading-none md:text-8xl xl:text-9xl -ml-[0.05em]">
            {content.hero?.title || "We Create Digital Experiences"}
          </h1>
        </div>
        <div className="col-span-4 md:col-span-3 md:col-start-4 xl:col-span-4 xl:col-start-9">
          <p className="text-xl leading-relaxed opacity-70">
            {content.hero?.subtitle || "Creative studio based in Istanbul..."}
          </p>
        </div>
      </div>
    </main>
  );
}
