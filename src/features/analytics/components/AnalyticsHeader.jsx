import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, X } from 'lucide-react';
import AnalyticsFiltersModal from './AnalyticsFiltersModal';
import SimpleSearchPopup from './SimpleSearchPopup';

const AnalyticsHeader = ({ onExport, isExporting = false, onFilterChange, onSearchChange, currentFilters = null, currentSearch = '' }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [filterCount, setFilterCount] = useState(0);

  const handleSearchApply = () => {
    if (onSearchChange) onSearchChange(searchQuery);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    if (onSearchChange) onSearchChange('');
  };

  const handleFiltersApply = (filters) => {
    if (filters) {
      const count = (Object.values(filters.stores || {}).filter(Boolean).length) + 
                    (Object.values(filters.rewardTypes || {}).filter(Boolean).length) + 
                    (filters.sortBy ? 1 : 0);
      setFilterCount(count);
    } else {
      setFilterCount(0);
    }
    if (onFilterChange) onFilterChange(filters);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Overview</h1>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 h-11 md:h-10 bg-white border border-[#EBEBEB] rounded-xl text-[14px] md:text-[13px] text-[#0A0A0A] font-medium font-inter hover:bg-gray-50 transition-colors"
          >
            <Calendar size={16} className="text-[#0A0A0A]" />
            Oct 1 - Oct 31, 2025
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors"
          >
            <Search size={16} className="text-[#0A0A0A]" />
          </button>
          <button 
            onClick={() => setIsFiltersOpen(true)}
            className="relative w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#0A0A0A] hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="text-[#0A0A0A]" />
            {filterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#005EF8] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {filterCount}
              </span>
            )}
          </button>
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

      <SimpleSearchPopup 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearchApply}
        currentSearch={currentSearch}
      />

      <AnalyticsFiltersModal 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={handleFiltersApply}
        currentFilters={currentFilters}
      />
    </>
  );
};

export default AnalyticsHeader;
