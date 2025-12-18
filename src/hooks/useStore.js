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
}));
