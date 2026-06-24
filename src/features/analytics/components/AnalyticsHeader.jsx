import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, X } from 'lucide-react';
import AnalyticsFiltersModal from './AnalyticsFiltersModal';

const AnalyticsHeader = ({ onExport, isExporting = false, onFilterChange, onSearchChange, onDateRangeChange, currentFilters = null, currentSearch = '', currentDateRange = { startDate: '', endDate: '' } }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [dateRange, setDateRange] = useState(currentDateRange);
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
          <div className="relative">
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 h-11 md:h-10 bg-white border border-[#EBEBEB] rounded-xl text-[14px] md:text-[13px] text-[#0A0A0A] font-medium font-inter hover:bg-gray-50 transition-colors"
            >
              <Calendar size={16} className="text-[#0A0A0A]" />
              {currentDateRange.startDate && currentDateRange.endDate 
                ? `${currentDateRange.startDate} - ${currentDateRange.endDate}` 
                : 'Select Date Range'}
            </button>
            {isCalendarOpen && (
              <div className="absolute top-full mt-2 left-0 w-[320px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg p-4 z-50">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#0A0A0A]">Start Date</label>
                    <input 
                      type="date" 
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-[13px] outline-none focus:border-[#005EF8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#0A0A0A]">End Date</label>
                    <input 
                      type="date" 
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-[13px] outline-none focus:border-[#005EF8]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => {
                        setDateRange({ startDate: '', endDate: '' });
                        if (onDateRangeChange) onDateRangeChange({ startDate: '', endDate: '' });
                        setIsCalendarOpen(false);
                      }}
                      className="px-4 py-2 text-[12px] font-medium text-[#D10020] hover:bg-red-50 rounded-lg"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={() => {
                        if (onDateRangeChange) onDateRangeChange(dateRange);
                        setIsCalendarOpen(false);
                      }}
                      className="px-4 py-2 text-[12px] font-medium text-white bg-[#005EF8] hover:bg-blue-600 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
