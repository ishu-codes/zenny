import { create } from "zustand";

type SidebarOpen = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const useSidebarOpen = create<SidebarOpen>((set) => ({
  isOpen: false,
  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));

export { useSidebarOpen };
