import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xvi-interactive.com";

export default function sitemap() {
  const languages = ["tr", "en"];

  // 1. STATİK SAYFALAR (Her iki dil için)
  // Anasayfa, Studio, Projects, Log, Career, Contact
  const staticRoutes = [
    "",
    "/studio",
    "/projects",
    "/log",
    "/career",
    "/contact",
  ];

  const staticUrls = languages.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 2. DİNAMİK PROJELER (TR ve EN ayrı ayrı)
  const trProjects = trData.projects.items.map((item) => ({
    url: `${BASE_URL}/tr/projects/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const enProjects = enData.projects.items.map((item) => ({
    url: `${BASE_URL}/en/projects/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. DİNAMİK LOG (BLOG) YAZILARI
  const trLogs = (trData.log?.items || []).map((item) => ({
    url: `${BASE_URL}/tr/log/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const enLogs = (enData.log?.items || []).map((item) => ({
    url: `${BASE_URL}/en/log/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 4. DİNAMİK KARİYER İLANLARI
  const trCareers = (trData.career?.items || []).map((item) => ({
    url: `${BASE_URL}/tr/career/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const enCareers = (enData.career?.items || []).map((item) => ({
    url: `${BASE_URL}/en/career/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Hepsini tek bir listede birleştiriyoruz
  return [
    ...staticUrls,
    ...trProjects,
    ...enProjects,
    ...trLogs,
    ...enLogs,
    ...trCareers,
    ...enCareers,
  ];
}
