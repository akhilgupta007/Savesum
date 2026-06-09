import React, { useState } from 'react';
import { X, Calendar, ChevronDown, Check } from 'lucide-react';

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2.5 cursor-pointer" onClick={() => onChange(!checked)}>
    <span className="text-[14px] text-[#0A0A0A] select-none">{label}</span>
    <div className={`w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors ${checked ? 'bg-[#005EF8] border-[#005EF8]' : 'border-[#6A7282]'}`}>
      {checked && <Check size={12} strokeWidth={3} className="text-white" />}
    </div>
  </div>
);

const FiltersModal = ({ isOpen, onClose }) => {
  const [stores, setStores] = useState({
    'CVS': false,
    'Walgreens': false,
    'Rite Aid': false,
    'Target': true,
    'Walmart': true
  });

  const [rewardTypes, setRewardTypes] = useState({
    'ExtraBucks (ECB)': false,
    'Promo credit': false,
    'Cash rewards': true,
    'Store credit': true,
    'Coupon reward': false,
    'Loyalty points': false
  });

  const [sortBy, setSortBy] = useState('Value (high - low)');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleStoreChange = (storeName, isChecked) => {
    setStores(prev => ({ ...prev, [storeName]: isChecked }));
  };

  const handleRewardTypeChange = (rewardName, isChecked) => {
    setRewardTypes(prev => ({ ...prev, [rewardName]: isChecked }));
  };

  const clearAll = () => {
    setStores(Object.keys(stores).reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));
    setRewardTypes(Object.keys(rewardTypes).reduce((acc, curr) => ({ ...acc, [curr]: false }), {}));
    setSortBy('Value (high - low)');
    setStartDate('');
    setEndDate('');
  };

  const selectedStores = Object.entries(stores).filter(([_, checked]) => checked).map(([name]) => name);
  const selectedRewards = Object.entries(rewardTypes).filter(([_, checked]) => checked).map(([name]) => name);

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
              {selectedStores.length > 0 && (
                <div className="flex items-center gap-2 bg-[#005EF8] text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                  Store: {selectedStores.join(', ')}
                  <X size={14} className="cursor-pointer" onClick={() => setStores(prev => Object.keys(prev).reduce((acc, curr) => ({...acc, [curr]: false}), {}))} />
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
              {['Value (high - low)', 'Value (low - high)', 'Newest first', 'Expiring Soon'].map(sortOption => (
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
                {Object.entries(stores).map(([storeName, isChecked]) => (
                  <Checkbox 
                    key={storeName} 
                    label={storeName} 
                    checked={isChecked} 
                    onChange={(checked) => handleStoreChange(storeName, checked)} 
                  />
                ))}
                <div className="flex items-center justify-between py-2.5 cursor-pointer text-[#6A7282] hover:text-[#005EF8] transition-colors">
                  <span className="text-[14px] uppercase font-medium">More</span>
                  <ChevronDown size={16} />
                </div>
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

          {/* Date Range */}
          <div className="border border-[#EBEBEB] rounded-xl p-6">
            <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0A0A0A]">Start Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[16px] md:text-[14px] text-[#0A0A0A] outline-none focus:border-[#005EF8] appearance-none bg-transparent relative z-10"
                    style={{ colorScheme: 'light' }}
                  />
                  {!startDate && <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6A7282] pointer-events-none z-0" />}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0A0A0A]">End Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[16px] md:text-[14px] text-[#0A0A0A] outline-none focus:border-[#005EF8] appearance-none bg-transparent relative z-10"
                    style={{ colorScheme: 'light' }}
                  />
                  {!endDate && <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6A7282] pointer-events-none z-0" />}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 px-8 py-6 border-t border-[#EBEBEB] bg-white">
          <button 
            onClick={clearAll}
            className="px-8 py-3 rounded-xl border border-[#EBEBEB] text-[14px] font-bold text-[#B00020] hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-[#005EF8] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default FiltersModal;
