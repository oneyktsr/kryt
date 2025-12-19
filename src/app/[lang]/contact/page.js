import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "İletişim" : "Contact",
    description: "Get in touch.",
    alternates: { canonical: `/${lang}/contact` },
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;
  const { contact } = content;

  return (
    <div className="min-h-screen layout-padding page-top-padding section-spacing">
      <h1 className="mb-16 text-6xl font-normal">
        {contact?.title || "Contact"}
      </h1>

      <div className="main-grid">
        <div className="col-span-4 space-y-2 text-2xl leading-snug md:col-span-6 md:text-4xl">
          <p>
            {/* Email Linki: tracking temiz */}
            <a
              href={`mailto:${contact.email}`}
              className="underline transition-opacity hover:opacity-50 decoration-1 underline-offset-4"
            >
              {contact.email}
            </a>
          </p>
          <p>{contact.phone}</p>

          {/* GÜNCELLEME: border-border kullanımı */}
          <div className="pt-10 mt-10 border-t border-border">
            <p className="text-xl opacity-60">{contact.address}</p>
            <p className="mt-4 text-lg opacity-80">{contact.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
