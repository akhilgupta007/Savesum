import React from 'react';
import { Calendar, Search, Filter, Upload } from 'lucide-react';

const AnalyticsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Overview</h1>
      <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 px-4 h-10 bg-white border border-[#EBEBEB] rounded-xl text-[13px] text-[#0A0A0A] font-medium font-inter hover:bg-gray-50 transition-colors">
        <Calendar size={16} className="text-[#0A0A0A]" />
        Oct 1 - Oct 31, 2025
      </button>
      <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors">
        <Search size={16} className="text-[#0A0A0A]" />
      </button>
      <button className="w-10 h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors">
        <Filter size={16} className="text-[#0A0A0A]" />
      </button>
      <button className="flex items-center gap-2 px-5 h-10 bg-[#005EF8] rounded-xl text-[13px] text-white font-medium font-inter hover:bg-[#005EF8]/90 transition-colors">
        <Upload size={16} />
        Export Report
      </button>
    </div>
    </div>
  );
};

export default AnalyticsHeader;
