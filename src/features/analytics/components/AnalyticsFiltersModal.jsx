import React, { useState, useEffect } from 'react';
import { X, Calendar, ChevronDown, Check } from 'lucide-react';
import { useStores } from '../../deals/hooks/useStores';

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2.5 cursor-pointer" onClick={() => onChange(!checked)}>
    <span className="text-[14px] text-[#0A0A0A] select-none">{label}</span>
    <div className={`w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors ${checked ? 'bg-[#005EF8] border-[#005EF8]' : 'border-[#6A7282]'}`}>
      {checked && <Check size={12} strokeWidth={3} className="text-white" />}
    </div>
  </div>
);

const AnalyticsFiltersModal = ({ isOpen, onClose, currentFilters, onApply }) => {
  const { data: storesResponse } = useStores();
  const storesList = storesResponse?.data || [];

  const [stores, setStores] = useState(currentFilters?.stores || {});

  const [rewardTypes, setRewardTypes] = useState(currentFilters?.rewardTypes || {
    'ExtraBucks (ECB)': false,
    'Promo credit': false,
    'Cash rewards': false,
    'Store credit': false,
    'Coupon reward': false,
    'Loyalty points': false
  });

  const [sortBy, setSortBy] = useState(currentFilters?.sortBy || '');

  useEffect(() => {
    if (isOpen && currentFilters) {
      if (currentFilters.stores) setStores(currentFilters.stores);
      if (currentFilters.rewardTypes) setRewardTypes(currentFilters.rewardTypes);
      if (currentFilters.sortBy) setSortBy(currentFilters.sortBy);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleStoreChange = (storeId, isChecked) => {
    setStores(prev => ({ ...prev, [storeId]: isChecked }));
  };

  const handleRewardTypeChange = (rewardName, isChecked) => {
    setRewardTypes(prev => ({ ...prev, [rewardName]: isChecked }));
  };

  const selectedStoreIds = Object.entries(stores).filter(([_, checked]) => checked).map(([id]) => id);
  const selectedStoreNames = selectedStoreIds.map(id => storesList.find(s => s._id === id)?.name || id);
  const selectedRewards = Object.entries(rewardTypes).filter(([_, checked]) => checked).map(([name]) => name);

  const hasActiveFilters = selectedStoreIds.length > 0 || selectedRewards.length > 0 || !!sortBy;
  const activeFilterCount = selectedStoreIds.length + selectedRewards.length + (sortBy ? 1 : 0);

  const clearAll = () => {
    setStores({});
    setRewardTypes(Object.keys(rewardTypes).reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));
    setSortBy('');
    if (onApply) onApply(null);
    onClose();
  };

  const handleApply = () => {
    if (onApply) {
      onApply(hasActiveFilters ? { stores, rewardTypes, sortBy } : null);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-inter p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[800px] mx-4 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#EBEBEB] bg-white">
          <h2 className="text-[20px] font-bold text-[#0A0A0A] tracking-wide uppercase">Filters</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:opacity-70 transition-opacity">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex flex-col gap-6 overflow-y-auto flex-1">
          
          {/* Active Filter */}
          <div className="flex items-center gap-4 px-6 py-4 border border-[#EBEBEB] rounded-xl">
            <span className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-wider">Active Filter:</span>
            <div className="flex flex-wrap gap-2">
              {selectedStoreNames.length > 0 && (
                <div className="flex items-center gap-2 bg-[#005EF8] text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                  Store: {selectedStoreNames.join(', ')}
                  <X size={14} className="cursor-pointer" onClick={() => setStores({})} />
                </div>
              )}
              {selectedRewards.length > 0 && (
                <div className="flex items-center gap-2 bg-[#005EF8] text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                  Reward Type: {selectedRewards.join(', ')}
                  <X size={14} className="cursor-pointer" onClick={() => setRewardTypes(prev => Object.keys(prev).reduce((acc, curr) => ({...acc, [curr]: false}), {}))} />
                </div>
              )}
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-4 px-6 py-4 border border-[#EBEBEB] rounded-xl">
            <span className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-wider min-w-[80px]">Sort By</span>
            <div className="flex flex-wrap gap-3">
              {['Value (high - low)', 'Value (low - high)', 'Newest first'].map(sortOption => (
                <button 
                  key={sortOption}
                  onClick={() => setSortBy(sortOption)}
                  className={`px-5 py-2 rounded-full text-[13px] font-medium transition-colors ${sortBy === sortOption ? 'bg-[#005EF8] text-white' : 'bg-white border border-[#EBEBEB] text-[#0A0A0A] hover:bg-gray-50'}`}
                >
                  {sortOption}
                </button>
              ))}
            </div>
          </div>

          {/* Grid: Stores & Reward Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stores */}
            <div className="border border-[#EBEBEB] rounded-xl p-6">
              <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Stores</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {storesList.slice(0, 8).map((store) => (
                  <Checkbox 
                    key={store._id} 
                    label={store.name} 
                    checked={!!stores[store._id]} 
                    onChange={(checked) => handleStoreChange(store._id, checked)} 
                  />
                ))}
                {storesList.length > 8 && (
                  <div className="flex items-center justify-between py-2.5 cursor-pointer text-[#6A7282] hover:text-[#005EF8] transition-colors col-span-2">
                    <span className="text-[14px] uppercase font-medium">More</span>
                    <ChevronDown size={16} />
                  </div>
                )}
              </div>
            </div>

            {/* Reward Type */}
            <div className="border border-[#EBEBEB] rounded-xl p-6">
              <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Reward Type</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {Object.entries(rewardTypes).map(([rewardName, isChecked]) => (
                  <Checkbox 
                    key={rewardName} 
                    label={rewardName} 
                    checked={isChecked} 
                    onChange={(checked) => handleRewardTypeChange(rewardName, checked)} 
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-[#EBEBEB] bg-white">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#EBEBEB] text-[14px] font-semibold text-[#B00020] hover:bg-red-50 hover:border-red-200 transition-all duration-150"
          >
            <span>Clear All</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-[#B00020] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#005EF8] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            Apply Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-white/30 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsFiltersModal;
