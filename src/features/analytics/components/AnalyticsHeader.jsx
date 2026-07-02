import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';

const AnalyticsHeader = ({ onExport, isExporting = false, onSearchChange, currentSearch = '' }) => {
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Overview</h1>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-[#6A7282]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search by item, store, or UPC..."
              className="pl-11 pr-4 py-3 md:py-[10px] border border-[#EBEBEB] rounded-xl text-[16px] md:text-sm text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:ring-2 focus:ring-[#005EF8] w-full md:w-[280px]"
            />
          </div>
          
          <button
            type="button"
            onClick={onExport}
            disabled={!onExport || isExporting}
            title="Export CSV"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 h-11 md:h-10 bg-[#005EF8] rounded-xl text-[14px] md:text-[13px] text-white font-medium font-inter hover:bg-[#005EF8]/90 transition-colors mt-2 md:mt-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={16} />
            {isExporting ? 'Exporting CSV...' : 'Export CSV'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AnalyticsHeader;
