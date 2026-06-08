import React from 'react';
import { Calendar, Search, Filter, Upload } from 'lucide-react';

const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
      <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Overview</h1>
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 h-11 md:h-10 bg-white border border-[#EBEBEB] rounded-xl text-[14px] md:text-[13px] text-[#0A0A0A] font-medium font-inter hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-[#0A0A0A]" />
          Oct 1 - Oct 31, 2025
        </button>
        <button className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors">
          <Search size={16} className="text-[#0A0A0A]" />
        </button>
        <button className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors">
          <Filter size={16} className="text-[#0A0A0A]" />
        </button>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 h-11 md:h-10 bg-[#005EF8] rounded-xl text-[14px] md:text-[13px] text-white font-medium font-inter hover:bg-[#005EF8]/90 transition-colors mt-2 md:mt-0">
          <Upload size={16} />
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
