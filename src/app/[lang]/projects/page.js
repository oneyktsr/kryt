import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";
import ProjectList from "@/components/PageParts/ProjectList";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return {
    title: content.projects?.title || "Projects",
    description: "Selected works and case studies.",
    alternates: {
      canonical: `/${lang}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      <h1 className="mb-16 text-6xl font-normal">
        {content.projects?.title || "Selected Works"}
      </h1>
      <ProjectList projects={content.projects.items} lang={lang} />
    </div>
  );
}
