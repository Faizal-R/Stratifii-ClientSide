"use client";
import React, { useEffect, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";
import { useAuthStore } from "@/features/auth/authStore";

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
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  handleModalState,
  isMobileOpen = false,
  onMobileClose,
}) => {
  const router = useRouter();
  const currentUrl = usePathname();
  const { user } = useAuthStore();
  const { isSidebarCollapsed, isMobileScreen, setIsMobileScreen, toggleSidebarCollapse } =
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
  }, [currentUrl, navItems]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileScreen && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <div
        className={`h-screen border-r border-gray-800 transition-all duration-300 ease-out 
      flex flex-col fixed left-0 top-0 z-50
      ${isMobileScreen
            ? `bg-gradient-to-b from-black via-zinc-950 to-violet-950/60 shadow-2xl shadow-violet-500/15 w-72 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`
            : `bg-gray-900/50 backdrop-blur-sm translate-x-0 ${isSidebarCollapsed ? "w-20" : "w-64"
            }`
          }
      `}
      >
        <div className={`p-4 border-b border-gray-800 flex ${
          !isMobileScreen && isSidebarCollapsed ? "flex-col items-center gap-3" : "items-center justify-between"
        }`}>
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Stratifii Logo" className="w-8 h-8 object-contain flex-shrink-0" />
            <span className={`font-bold text-lg text-white ${
              !isMobileScreen && isSidebarCollapsed ? "hidden" : "block"
            }`}>
              Stratifii
            </span>
          </div>
          <button
            onClick={isMobileScreen ? onMobileClose : toggleSidebarCollapse}
            className="p-2 hover:bg-gray-800/80 rounded-lg transition-colors border border-violet-900/40 text-white flex-shrink-0"
          >
            {isMobileScreen ? (
              <ChevronLeft size={20} />
            ) : isSidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="relative">
                  {/* Left accent indicator */}
                  {isActive && (
                    <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-violet-500 rounded-r-md shadow-md shadow-violet-500/50" />
                  )}
                  <button
                    onClick={() => {
                      if (!item.isDisabled) {
                        router.push(item.route);
                        setActiveTab(item.id);
                        if (isMobileScreen && onMobileClose) {
                          onMobileClose(); // Close drawer after selection
                        }
                      }
                    }}
                    disabled={item.isDisabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
            ${item.isDisabled
                        ? " text-gray-500 cursor-not-allowed opacity-60"
                        : isActive
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30 border border-violet-500/20"
                          : "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                      }`}
                  >
                    {React.createElement(item.icon as any, {
                      size: 20,
                      className: `${item.isDisabled ? "text-gray-500" : "text-inherit"} transition-colors`
                    })}
                    <span className={!isMobileScreen && isSidebarCollapsed ? "hidden" : "block font-medium"}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {user && (!isSidebarCollapsed || isMobileScreen) && (
          <div className="p-4 border-t border-gray-800 flex items-center gap-3 bg-zinc-950/20">
            <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold uppercase overflow-hidden flex-shrink-0">
              {user.name ? user.name.slice(0, 2) : "U"}
            </div>
            <div className="truncate flex-1">
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
              <p className="text-violet-400 text-xs truncate capitalize">{user.role}</p>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-800">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={() => handleModalState(true)}
          >
            <LogOut size={20} />
            <span className={!isMobileScreen && isSidebarCollapsed ? "hidden" : "block font-medium"}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
