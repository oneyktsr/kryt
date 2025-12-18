import "../globals.css"; // CSS'i geri getirdik
import ClientLayout from "./ClientLayout";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

// Metadata (SEO)
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://xvi-interactive.com"
    ),
    title: {
      default: "XVI Interactive",
      template: "%s | XVI Interactive",
    },
    description: content.hero?.subtitle || "Creative Digital Studio",
  };
}

// ARTIK HTML VE BODY BURADA OLACAK
export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout lang={lang}>{children}</ClientLayout>
      </body>
    </html>
  );
}
