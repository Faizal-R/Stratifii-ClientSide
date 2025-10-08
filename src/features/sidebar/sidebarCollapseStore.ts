

import { create } from "zustand";

interface ISidebarCollapseState {
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
    isMobileScreen: boolean;
    setIsMobileScreen: (value: boolean) => void;
}

export const useSidebarCollapseStore = create<ISidebarCollapseState>()((set) => ({
    isSidebarCollapsed: false,
    toggleSidebarCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    isMobileScreen: false,
    setIsMobileScreen: (newValue) => set((state) => ({
        isSidebarCollapsed: newValue,
        isMobileScreen: newValue
    })),
}));