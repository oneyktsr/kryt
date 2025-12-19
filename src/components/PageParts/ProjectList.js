"use client";
import { useStore } from "@/hooks/useStore";
import TransitionLink from "@/components/UI/TransitionLink";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap-registry";

export default function ProjectList({ projects, lang }) {
  const { projectView, setProjectView } = useStore();
  const containerRef = useRef(null);

  const handleViewChange = (newView) => {
    if (newView === projectView) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setProjectView(newView);
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }, 50);
      },
    });
  };

  return (
    <div>
      <div className="flex justify-end gap-4 mb-10 text-sm uppercase">
        <button
          onClick={() => handleViewChange("grid")}
          className={
            projectView === "grid"
              ? "underline font-normal"
              : "opacity-50 hover:opacity-100 transition-opacity"
          }
        >
          Grid
        </button>
        <button
          onClick={() => handleViewChange("list")}
          className={
            projectView === "list"
              ? "underline font-normal"
              : "opacity-50 hover:opacity-100 transition-opacity"
          }
        >
          List
        </button>
      </div>

      <div ref={containerRef} className="opacity-100">
        {projectView === "grid" && (
          <div className="grid-layout mb-[120px]">
            {projects.map((item) => (
              <TransitionLink
                key={item.id}
                href={`/${lang}/projects/${item.slug}`}
                className="block col-span-4 group md:col-span-3 xl:col-span-6"
              >
                <div className="relative mb-4 overflow-hidden rounded-lg bg-zinc-200 aspect-video">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={item.id <= 4}
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-300"></div>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-2xl font-normal">{item.title}</h2>
                  <span className="text-sm uppercase opacity-60">
                    {item.category}
                  </span>
                </div>
              </TransitionLink>
            ))}
          </div>
        )}

        {projectView === "list" && (
          <div className="flex flex-col border-t border-border">
            {projects.map((item) => (
              <TransitionLink
                key={item.id}
                href={`/${lang}/projects/${item.slug}`}
                className="flex items-center justify-between px-4 py-10 transition-all duration-500 border-b rounded-lg group border-border hover:bg-foreground hover:text-background"
              >
                <h2 className="flex-1 text-3xl font-normal">{item.title}</h2>
                <span className="text-sm uppercase opacity-50 group-hover:opacity-100">
                  {item.category}
                </span>
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
