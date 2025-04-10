import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarOpen = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const useSidebarOpen = create(
  persist<SidebarOpen>(
    (set) => ({
      isOpen: false,
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useSidebarOpen };
