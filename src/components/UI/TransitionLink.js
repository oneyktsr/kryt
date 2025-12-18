"use client";
import { useTransition } from "@/context/TransitionContext";
import { usePathname } from "next/navigation";

export default function TransitionLink({
  href,
  className,
  children,
  ...props
}) {
  const { navigateWithTransition } = useTransition();
  const pathname = usePathname();

  const handleClick = (e) => {
    // Aynı sayfadaysa işlem yapma
    if (pathname === href) {
      e.preventDefault();
      return;
    }

    // Linke tıklandıysa tarayıcıyı durdur, animasyonu başlat
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
