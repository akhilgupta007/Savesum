import React from 'react';
import { X, Calendar, ChevronDown, Check } from 'lucide-react';

const Checkbox = ({ label, checked }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-[14px] text-[#0A0A0A]">{label}</span>
    <div className={`w-[18px] h-[18px] rounded flex items-center justify-center border ${checked ? 'bg-[#005EF8] border-[#005EF8]' : 'border-[#6A7282]'}`}>
      {checked && <Check size={12} strokeWidth={3} className="text-white" />}
    </div>
  </div>
);

const FiltersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-inter p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[800px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-[20px] font-bold text-[#0A0A0A] tracking-wide uppercase">Filters</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:opacity-70 transition-opacity">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-150px)]">
          
          {/* Active Filter */}
          <div className="flex items-center gap-4 px-6 py-4 border border-[#EBEBEB] rounded-xl">
            <span className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-wider">Active Filter:</span>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-[#005EF8] text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                Story: Target ,Walmart
                <X size={14} className="cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 bg-[#005EF8] text-white px-4 py-1.5 rounded-full text-[13px] font-medium">
                Reward Type: Cash reward ,Store credit
                <X size={14} className="cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-4 px-6 py-4 border border-[#EBEBEB] rounded-xl">
            <span className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-wider min-w-[80px]">Sort By</span>
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#005EF8] text-white px-5 py-2 rounded-full text-[13px] font-medium transition-colors">
                Value (high - low)
              </button>
              <button className="bg-white border border-[#EBEBEB] text-[#0A0A0A] px-5 py-2 rounded-full text-[13px] font-medium hover:bg-gray-50 transition-colors">
                Value (low - high)
              </button>
              <button className="bg-white border border-[#EBEBEB] text-[#0A0A0A] px-5 py-2 rounded-full text-[13px] font-medium hover:bg-gray-50 transition-colors">
                Newest first
              </button>
              <button className="bg-white border border-[#EBEBEB] text-[#0A0A0A] px-5 py-2 rounded-full text-[13px] font-medium hover:bg-gray-50 transition-colors">
                Expiring Soon
              </button>
            </div>
          </div>

          {/* Grid: Stores & Reward Type */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* Stores */}
            <div className="border border-[#EBEBEB] rounded-xl p-6">
              <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Stores</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <Checkbox label="CVS" />
                <Checkbox label="Walgreens" />
                <Checkbox label="Rite Aid" />
                <Checkbox label="Target" checked />
                <Checkbox label="Walmart" checked />
                <div className="flex items-center justify-between py-2.5 cursor-pointer text-[#6A7282]">
                  <span className="text-[14px] uppercase font-medium">More</span>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Reward Type */}
            <div className="border border-[#EBEBEB] rounded-xl p-6">
              <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Reward Type</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <Checkbox label="ExtraBucks (ECB)" />
                <Checkbox label="Promo credit" />
                <Checkbox label="Cash rewards" checked />
                <Checkbox label="Store credit" checked />
                <Checkbox label="Coupon reward" />
                <Checkbox label="Loyalty points" />
              </div>
            </div>

          </div>

          {/* Date Range */}
          <div className="border border-[#EBEBEB] rounded-xl p-6">
            <h3 className="text-[12px] font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Date Range</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0A0A0A]">Start Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy"
                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] outline-none focus:border-[#005EF8] placeholder-[#A0AEC0]"
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6A7282]" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0A0A0A]">End Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy"
                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] outline-none focus:border-[#005EF8] placeholder-[#A0AEC0]"
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6A7282]" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 mt-2">
            <button 
              onClick={onClose}
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
    </div>
  );
};

export default FiltersModal;
