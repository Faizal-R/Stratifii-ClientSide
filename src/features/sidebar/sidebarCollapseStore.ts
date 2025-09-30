import {create} from "zustand";


interface ISidebarCollapseState {
    isSidebarCollapsed: boolean;
    toggleSidebarCollapse: () => void;
}


export const useSidebarCollapseStore = create<ISidebarCollapseState>()((set) => ({
    isSidebarCollapsed: false,
    toggleSidebarCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));