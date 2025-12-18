import { NextResponse } from "next/server";

let locales = ["tr", "en"];
let defaultLocale = "tr";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Dosya isteklerini (resim, favicon vb.) yoksay
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  // Path zaten bir dil içeriyor mu kontrol et
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Dil yoksa varsayılan dile yönlendir
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
