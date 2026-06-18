import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Store } from 'lucide-react';
import { useStores } from '../hooks/useStores';

/**
 * Professional custom Store dropdown with:
 * - Smooth CSS animation (no framer-motion dependency)
 * - Searchable list
 * - Supports selecting existing stores OR typing new ones
 * - Chevron icon rotates on open
 */
const StoreSelect = ({ value, onChange, placeholder = 'Select or type a store' }) => {
  const { data: storesResponse, isLoading } = useStores();
  const storesList = storesResponse?.data || [];

  const [isOpen, setIsOpen]       = useState(false);
  const [query, setQuery]         = useState('');
  const [isVisible, setIsVisible] = useState(false); // Controls mount/unmount animation

  const containerRef = useRef(null);
  const searchRef    = useRef(null);

  // Filtered list based on search query
  const filtered = storesList.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  // Whether the typed value doesn't match any existing store (new store)
  const isNewStore = query.trim().length > 0 && !storesList.some(
    s => s.name.toLowerCase() === query.toLowerCase()
  );

  // Open dropdown with animation
  const openDropdown = () => {
    setIsOpen(true);
    setQuery('');
    setTimeout(() => {
      setIsVisible(true);
      searchRef.current?.focus();
    }, 10);
  };

  // Close dropdown with animation
  const closeDropdown = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 180);
  };

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (storeName) => {
    onChange(storeName);
    closeDropdown();
  };

  const handleNewStore = () => {
    onChange(query.trim());
    closeDropdown();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeDropdown();
    if (e.key === 'Enter' && isNewStore) handleNewStore();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={isOpen ? closeDropdown : openDropdown}
        className={`w-full flex items-center gap-3 px-4 py-2.5 border rounded-lg text-[14px] text-left transition-all duration-150 bg-white
          ${isOpen
            ? 'border-[#005EF8] ring-2 ring-[#005EF8]/10'
            : 'border-[#EBEBEB] hover:border-[#D1D5DC]'
          }`}
      >
        <Store size={16} className="text-[#6A7282] shrink-0" />
        <span className={`flex-1 truncate ${value ? 'text-[#0A0A0A]' : 'text-[#6A7282]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-[#6A7282] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white border border-[#EBEBEB] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-180
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'}`}
          style={{ transition: 'opacity 180ms ease, transform 180ms ease' }}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-[#F5F5F5]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7282] pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search stores..."
                className="w-full pl-8 pr-3 py-2 text-[13px] text-[#0A0A0A] placeholder-[#6A7282] bg-[#F9FAFB] rounded-lg focus:outline-none focus:bg-[#F0F5FF]"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-[220px] overflow-y-auto py-1">
            {isLoading && (
              <div className="px-4 py-3 text-[13px] text-[#6A7282] text-center">
                Loading stores...
              </div>
            )}

            {!isLoading && filtered.length === 0 && !isNewStore && (
              <div className="px-4 py-3 text-[13px] text-[#6A7282] text-center">
                No stores found
              </div>
            )}

            {/* Others Option */}
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect('Others'); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-left transition-colors group
                ${value === 'Others'
                  ? 'bg-[#E8F0FE] text-[#005EF8] font-medium'
                  : 'text-[#0A0A0A] hover:bg-[#F5F7FF]'
                }`}
            >
              <Store size={14} className={`shrink-0 ${value === 'Others' ? 'text-[#005EF8]' : 'text-[#6A7282] group-hover:text-[#005EF8]'}`} />
              Others
              {value === 'Others' && (
                <span className="ml-auto text-[11px] font-semibold text-[#005EF8] bg-[#D1E0FD] px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </button>

            {filtered.map((store) => (
              <button
                key={store._id}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(store.name); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-left transition-colors group
                  ${value === store.name
                    ? 'bg-[#E8F0FE] text-[#005EF8] font-medium'
                    : 'text-[#0A0A0A] hover:bg-[#F5F7FF]'
                  }`}
              >
                <Store size={14} className={`shrink-0 ${value === store.name ? 'text-[#005EF8]' : 'text-[#6A7282] group-hover:text-[#005EF8]'}`} />
                {store.name}
                {value === store.name && (
                  <span className="ml-auto text-[11px] font-semibold text-[#005EF8] bg-[#D1E0FD] px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </button>
            ))}

            {/* Add new store option */}
            {isNewStore && (
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleNewStore(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-left text-[#005EF8] hover:bg-[#F5F7FF] transition-colors border-t border-[#F5F5F5] mt-1"
              >
                <span className="w-5 h-5 bg-[#005EF8] text-white rounded-full flex items-center justify-center text-[11px] font-bold shrink-0">+</span>
                Add "<span className="font-semibold ml-1">{query.trim()}</span>"
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSelect;
