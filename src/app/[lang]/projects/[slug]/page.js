import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import Image from "next/image";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/UI/TransitionLink";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const project = content.projects.items.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: `${project.title} - ${project.category}`,
    alternates: { canonical: `/${lang}/projects/${slug}` },
  };
}

export default async function ProjectDetail({ params }) {
  const { lang, slug } = await params;
  const content = lang === "tr" ? trData : enData;
  const project = content.projects.items.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      {/* Geri Butonu: tracking yok */}
      <div className="mb-10">
        <TransitionLink
          href={`/${lang}/projects`}
          className="flex items-center gap-2 text-sm uppercase transition-opacity opacity-50 hover:opacity-100"
        >
          ← {lang === "tr" ? "Tüm Projeler" : "All Projects"}
        </TransitionLink>
      </div>

      <h1 className="mb-10 text-5xl font-normal md:text-8xl">
        {project.title}
      </h1>

      <div className="mb-20 main-grid">
        <div className="relative col-span-4 overflow-hidden rounded-lg md:col-span-6 xl:col-span-12 aspect-video bg-zinc-200">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800" />
          )}
        </div>

        <div className="col-span-4 mt-10 md:col-span-2">
          <h3 className="mb-2 text-xs uppercase opacity-60">Category</h3>
          <p className="text-xl">{project.category}</p>
        </div>
        <div className="col-span-4 mt-10 md:col-span-2">
          <h3 className="mb-2 text-xs uppercase opacity-60">Year</h3>
          <p className="text-xl">{project.year}</p>
        </div>
      </div>
    </div>
  );
}
