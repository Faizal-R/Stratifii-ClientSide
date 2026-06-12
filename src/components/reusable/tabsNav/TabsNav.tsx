
import {FC} from "react";
import { cn } from "@/lib/utils"; 

interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  show?: boolean; // optional condition
}

interface TabsNavProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  tabs: TabItem[];
}

const TabsNav:FC<TabsNavProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-gray-950/40 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-2 shadow-xl">
      <nav className="flex flex-wrap gap-2">
        {tabs
          .filter((tab) => tab.show !== false) // hide tabs if show is false
          .map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300",
                activeTab === tab.key
                  ? "bg-violet-600/25 text-violet-300 border border-violet-500/30 shadow-md shadow-violet-500/10"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
      </nav>
    </div>
  );
};
export default TabsNav;
