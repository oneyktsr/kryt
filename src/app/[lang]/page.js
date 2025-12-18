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
      <div className="mb-20 main-grid md:mb-40">
        <div className="col-span-4 md:col-span-6 xl:col-span-12">
          {/* Hero: tracking temiz, global -0.02em */}
          <h1 className="text-5xl font-normal leading-none md:text-7xl xl:text-9xl">
            {content.hero?.title || "We Create Digital Experiences"}
          </h1>
        </div>

        <div className="col-span-4 mt-10 md:col-span-3 xl:col-span-4 xl:col-start-9">
          <p className="text-lg opacity-70">
            {content.hero?.subtitle || "Creative studio based in..."}
          </p>
        </div>
      </div>
    </main>
  );
}
