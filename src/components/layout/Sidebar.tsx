"use client";
import { useEffect, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
  isDisabled?: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
  isModalOpen: boolean;
  handleModalState: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, handleModalState }) => {
  const router = useRouter();
  const currentUrl = usePathname();
  const { isSidebarCollapsed,isMobileScreen, setIsMobileScreen,toggleSidebarCollapse } =
    useSidebarCollapseStore();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileScreen(true); // collapse sidebar on small screens
      } else {
        setIsMobileScreen(false); // expanded on desktop
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileScreen]);
  const [activeTab, setActiveTab] = useState<string>(navItems[0].id);
  useEffect(() => {
    const matchedTab = navItems.find((item) => item.route === currentUrl)?.id;
    if (matchedTab) {
      setActiveTab(matchedTab);
    }
  }, [currentUrl]);
  return (
    <div
      className={`h-screen bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 
    ${isSidebarCollapsed ? "w-20" : "w-64"} 
    flex flex-col fixed left-0 top-0
    z-50 md:z-auto`} 
    >
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          <Building2 className="text-violet-500" size={32} />
          <span className="font-bold text-lg text-white">Stratifii</span>
        </div>
        <button
          onClick={toggleSidebarCollapse}
          className="  md:block p-2 hover:bg-gray-800 rounded-lg transition-colors border border-violet-900 text-white"
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (!item.isDisabled) {
                    router.push(item.route);
                    setActiveTab(item.id);
                  }
                }}
                disabled={item.isDisabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${
          item.isDisabled
            ? " text-gray-500 cursor-not-allowed opacity-60"
            : activeTab === item.id
            ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
            : "hover:bg-gray-800/70 text-gray-300"
        }`}
              >
                <item.icon
                  size={20}
                  className={`${
                    item.isDisabled ? "text-gray-500" : "text-inherit"
                  } transition-colors`}
                />
                <span className={isSidebarCollapsed ? "hidden" : "block"}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          onClick={() => handleModalState(true)}
        >
          <LogOut size={20} />
          <span className={isSidebarCollapsed ? "hidden" : "block"}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
