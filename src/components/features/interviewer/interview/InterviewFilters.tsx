import React from "react";
import { Filter, Calendar } from "lucide-react";

interface InterviewFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  dateFilter: string;
  onDateFilterChange: (date: string) => void;
}

export const InterviewFilters: React.FC<InterviewFiltersProps> = ({
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-violet-800/40 rounded-lg 
             bg-gradient-to-r from-violet-950/70 to-black/70 text-violet-100
             focus:ring-2 focus:ring-violet-500 focus:border-transparent 
             hover:from-violet-900/80 hover:to-black/80 transition-all duration-200
             appearance-none"
            style={{
              colorScheme: "dark", // tells browser to use dark dropdown styles
            }}
          >
            <option className="bg-black text-white" value="">
              All Statuses
            </option>
            <option className="bg-black text-white" value="booked">
              Upcoming
            </option>
            <option className="bg-black text-white" value="completed">
              Completed
            </option>
            <option className="bg-black text-white" value="cancelled">
              Cancelled
            </option>
            <option className="bg-black text-white" value="rescheduled">
              Rescheduled
            </option>
            <option className="bg-black text-white" value="no_show">
              No Show
            </option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
          <select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white/10 text-white placeholder-gray-300"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This Week</option>
            <option value="next_week">Next Week</option>
            <option value="past">Past Interviews</option>
          </select>
        </div>
      </div>
    </div>
  );
};
