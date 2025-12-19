import "./../globals.css";
import localFont from "next/font/local";
import ClientLayout from "./ClientLayout";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

// Font Yolu (Aynen Kalıyor)
const neueMontreal = localFont({
  src: [
    {
      path: "../../../public/fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-primary",
  display: "swap",
  preload: true,
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const content = lang === "tr" ? trData : enData;

  return {
    // 1. ÖNEMLİ: Kendi domainini buraya yaz (localhost ise şimdilik kalsın)
    metadataBase: new URL("https://xvi-interactive.com"),

    title: {
      template: "%s | XVI Interactive",
      default: "XVI Interactive",
    },
    description: content.hero?.subtitle || "Digital Experiences",

    // 2. Arama Motoru İzinleri
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // 3. Sosyal Medya Paylaşım Kartları
    openGraph: {
      title: "XVI Interactive",
      description: content.hero?.subtitle || "Digital Experiences",
      url: `https://xvi-interactive.com/${lang}`,
      siteName: "XVI Interactive",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
      // images: [
      //   {
      //     url: "/og-image.jpg", // public klasörüne bir kapak resmi koyarsan burayı aç
      //     width: 1200,
      //     height: 630,
      //   },
      // ],
    },

    // 4. Twitter Kartları
    twitter: {
      card: "summary_large_image",
      title: "XVI Interactive",
      description: content.hero?.subtitle || "Digital Experiences",
      // images: ["/og-image.jpg"],
    },

    // 5. İkonlar
    icons: {
      icon: "/favicon.ico",
      // apple: "/apple-touch-icon.png",
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang} className={neueMontreal.variable}>
      <body className="antialiased bg-background text-foreground">
        <ClientLayout lang={lang}>{children}</ClientLayout>
      </body>
    </html>
  );
}
