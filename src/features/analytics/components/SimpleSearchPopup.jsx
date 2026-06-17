import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const SimpleSearchPopup = ({ isOpen, onClose, onSearch, currentSearch = '' }) => {
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(searchQuery);
    onClose();
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-inter p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[500px] mx-4 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBEBEB] bg-white">
          <h2 className="text-[18px] font-bold text-[#0A0A0A]">Search</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:opacity-70 transition-opacity">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex flex-col gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A7282] pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search deals, stores, products..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] placeholder-[#6A7282] outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EBEBEB] bg-white">
          <button
            onClick={handleClear}
            className="px-6 py-2.5 rounded-xl border border-[#EBEBEB] text-[14px] font-semibold text-[#6A7282] hover:bg-gray-50 transition-all duration-150"
          >
            Clear
          </button>
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#005EF8] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            <Search size={16} />
            Search
          </button>
        </div>

      </div>
    </div>
  );
};

export default SimpleSearchPopup;
