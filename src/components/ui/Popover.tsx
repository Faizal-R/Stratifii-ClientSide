"use client"
import { useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
}

 const Popover: React.FC<PopoverProps> = ({ trigger, children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-slate-800/95 backdrop-blur-sm border border-violet-500/30 rounded-lg p-3 shadow-xl min-w-[200px] max-w-[280px]">
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800/95"></div>
            {title && <h4 className="text-violet-300 font-medium text-sm mb-2">{title}</h4>}
            <div className="text-slate-300 text-[10px]">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Popover