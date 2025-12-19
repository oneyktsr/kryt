import { create } from "zustand";

export const useStore = create((set) => ({
  // Preloader State
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),

  // Logo State
  showLogo: false,
  setShowLogo: (show) => set({ showLogo: show }),

  // Project View Preference (Kalıcı Tercih)
  projectView: "grid", // default: grid
  setProjectView: (view) => set({ projectView: view }),

  // YENİ EKLENEN: Scroll Kilidi State'i
  // Navbar açıldığında Lenis'i ve native scroll'u durdurmak için kullanılır.
  isScrollLocked: false,
  setScrollLocked: (locked) => set({ isScrollLocked: locked }),
}));
