
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
    <div className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-800 ">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex gap-8">
          {tabs
            .filter((tab) => tab.show !== false) // hide tabs if show is false
            .map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab.key
                    ? "text-violet-400 border-violet-400"
                    : "text-gray-400 border-transparent hover:text-white"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
};
export default TabsNav
