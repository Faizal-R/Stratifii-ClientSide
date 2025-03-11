"use client"
import { useState } from "react";
import { Building2, ChevronLeft, ChevronRight, LogOut } from "lucide-react";

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
  }
  
  interface SidebarProps {
    navItems: NavItem[];
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div
      className={`h-screen bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } flex flex-col fixed left-0 top-0`}
    >
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? "hidden" : "block"}`}>
          <Building2 className="text-violet-500" size={32} />
          <span className="font-bold text-lg text-white">Stratifii</span>
        </div>
        <button
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors border border-violet-900 text-white"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-violet-600 text-white"
                    : "hover:bg-gray-800/50 text-gray-300"
                }`}
              >
                <item.icon size={20} />
                <span className={isSidebarCollapsed ? "hidden" : "block"}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut size={20} />
          <span className={isSidebarCollapsed ? "hidden" : "block"}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
