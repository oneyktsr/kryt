const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xvi-interactive.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"], // API rotalarını ve özel klasörleri gizle
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
