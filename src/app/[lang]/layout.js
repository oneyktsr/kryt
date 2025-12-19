import "./../globals.css";
import localFont from "next/font/local";
import ClientLayout from "./ClientLayout";
import { data as trData } from "@/data/tr";
import { data as enData } from "@/data/en";

// Font Tanımı: public/fonts klasöründen çeker
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
    metadataBase: new URL("https://xvi-interactive.com"),
    title: {
      template: "%s | XVI Interactive",
      default: "XVI Interactive",
    },
    description: content.hero?.subtitle || "Digital Experiences",
    robots: {
      index: true,
      follow: true,
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
