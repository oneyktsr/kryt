import { data as enData } from "@/data/en";
import { data as trData } from "@/data/tr";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xvi-interactive.com";

export async function GET() {
  // Projeleri listelerken İngilizce başlıkları baz alıyoruz (Global anlaşılırlık için)
  // Ancak link yapısının multilingual olduğunu belirtiyoruz.
  const projectList = enData.projects.items
    .map(
      (p) => `- ${p.title}: ${p.category} (${BASE_URL}/en/projects/${p.slug})`
    )
    .join("\n");

  const logList = enData.log?.items
    .map((l) => `- ${l.title}: ${l.excerpt} (${BASE_URL}/en/log/${l.slug})`)
    .join("\n");

  const content = `
# XVI Interactive

Creative Digital Studio focusing on design, code, and culture.
We build immersive digital experiences, websites, and brand identities.

## Language Support
This website serves content in two languages:
- **English**: ${BASE_URL}/en
- **Turkish**: ${BASE_URL}/tr

## Core Sections

- **Studio**: About our philosophy, vision, and team.
- **Projects**: Our portfolio of selected works.
- **Log**: Thoughts, articles, and culture updates.
- **Career**: Job openings and studio culture.
- **Contact**: Get in touch information.

## Featured Projects (Portfolio)

${projectList}

## Latest Articles (Log)

${logList || "No logs available yet."}

## Contact Information

Email: ${enData.contact.email}
Phone: ${enData.contact.phone}
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Önbellekleme ekleyelim ki sunucu yorulmasın (1 saat)
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
