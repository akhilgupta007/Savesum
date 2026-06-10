import React from 'react';
import { Search, Filter, Home, Tag, Calendar, Calculator, User } from 'lucide-react';

const MobilePreview = ({ formData }) => {
  // Default values for empty form state
  const name = formData.name || 'Charmin Ultra Soft Toilet Paper (12ct)';

  // Calculate final price logic for the preview
  const retailNum = parseFloat(formData.retail) || 10.99;
  const couponNum = parseFloat(formData.coupon) || 3.00;
  const rewardNum = parseFloat(formData.reward) || 0.00;
  const finalPrice = Math.max(0, retailNum - couponNum).toFixed(2);

  const expiry = formData.endDate || '24/06/26';

  return (
    <div className="flex flex-col items-center w-full max-w-[300px] mx-auto sticky top-0">
      {/* Label */}
      <div className="w-full bg-[#C2E8CE] rounded-xl py-2.5 mb-4 flex justify-center shadow-sm">
        <span className="text-[#00A152] text-[11px] font-bold tracking-wider uppercase">Live Mobile Preview</span>
      </div>

      {/* Phone Frame - Extremely compact to fit any laptop without scrolling */}
      <div className="w-[260px] h-[480px] bg-white border-[8px] border-[#1C1C1E] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col font-inter">

        {/* Notch Area */}
        <div className="absolute top-0 inset-x-0 h-4 flex justify-center pointer-events-none z-10">
          <div className="w-16 h-4 bg-[#1C1C1E] rounded-b-xl"></div>
        </div>

        {/* Status Bar */}
        <div className="h-6 w-full flex items-center justify-between px-4 pt-1 pb-1 text-[9px] font-medium text-black">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Dummy icons for signal, wifi, battery */}
            <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 11V8H3V11H1ZM5 11V6H7V11H5ZM9 11V4H11V11H9ZM13 11V1H15V11H13Z" /></svg>
            <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L0 3.33333C2.12132 1.15438 5.02944 0 8 0C10.9706 0 13.8787 1.15438 16 3.33333L8 12Z" /></svg>
            <svg width="22" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="10" rx="3" /><path d="M22 4V8" strokeWidth="2" strokeLinecap="round" /><rect x="2" y="2" width="14" height="8" rx="2" fill="currentColor" stroke="none" /></svg>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 overflow-y-auto px-3 py-2.5 bg-[#F9FAFB] flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] font-bold text-[#0A0A0A]">All Deals</h1>
            <span className="text-[#D97706] text-[10px] font-medium flex items-center gap-1">
              Planner mode <span className="text-[10px]">&gt;</span>
            </span>
          </div>

          {/* Toggle */}
          <div className="bg-[#EBEBEB] rounded-lg p-1 flex">
            <button className="flex-1 bg-[#005EF8] text-white rounded-md py-1.5 text-[10px] font-medium shadow-sm">
              Weekly deals
            </button>
            <button className="flex-1 text-[#6A7282] rounded-md py-1.5 text-[10px] font-medium">
              Custom deals
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search size={10} className="text-[#6A7282]" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#EBEBEB] rounded-lg text-[10px] text-[#0A0A0A] placeholder-[#A0AEC0] outline-none"
                readOnly
              />
            </div>
            <button className="w-[26px] h-[26px] flex items-center justify-center bg-white border border-[#EBEBEB] rounded-lg text-[#6A7282]">
              <Filter size={12} strokeWidth={1.5} />
            </button>
          </div>

          {/* Deal Card */}
          <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm flex overflow-hidden">
            <div className="flex-1 p-2 flex flex-col gap-1.5">
              <div className="flex gap-2">
                <div className="w-[36px] h-[36px] rounded bg-[#F5F5F5] overflow-hidden flex-shrink-0">
                  <img
                    src={formData.img || "https://images.unsplash.com/photo-1584308666744-24d5e4b6e58b?w=80&h=80&fit=crop"}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <h3 className="text-[10px] font-bold text-[#0A0A0A] leading-tight line-clamp-2">
                    {name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-[#0A0A0A] bg-[#E8F5E9] px-1 py-0.5 rounded-sm text-[#00A152] font-semibold">
                      BOGO
                    </span>
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[7px] text-[#6A7282] uppercase">Retail</span>
                      <span className="text-[9px] font-bold text-[#0A0A0A] line-through decoration-1">${retailNum.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-[#EBEBEB] pt-1 flex flex-col">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-[#6A7282] uppercase tracking-wider text-[8px]">Coupon</span>
                  <span className="text-[#00A152] font-bold">-${couponNum.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-[#6A7282] uppercase tracking-wider text-[8px]">You Pay</span>
                  <span className="text-[#0A0A0A] font-bold">${finalPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[8px] text-[#005EF8] font-semibold">Expires by {expiry}</span>
                <div className="bg-[#E8F0FE] text-[#005EF8] rounded-sm flex items-center px-1.5 py-0.5 gap-1">
                  <span className="text-[7px] uppercase tracking-wider">Earn</span>
                  <span className="text-[9px] font-bold">${rewardNum.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Vertical Blue Button */}
            <div className="w-[24px] bg-[#005EF8] text-white flex items-center justify-center cursor-pointer">
              <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                Add to Planner
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="h-[50px] bg-white border-t border-[#EBEBEB] flex items-center justify-between px-4 pb-2 pt-1.5">
          <div className="flex flex-col items-center gap-0.5 text-[#6A7282]">
            <Home size={14} strokeWidth={1.5} />
            <span className="text-[7px] font-medium">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-[#005EF8]">
            <Tag size={14} strokeWidth={2} fill="currentColor" className="text-[#005EF8]" />
            <span className="text-[7px] font-bold">Deals</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-[#6A7282]">
            <Calendar size={14} strokeWidth={1.5} />
            <span className="text-[7px] font-medium">Planner</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-[#6A7282]">
            <Calculator size={14} strokeWidth={1.5} />
            <span className="text-[7px] font-medium">Calculator</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-[#6A7282]">
            <User size={14} strokeWidth={1.5} />
            <span className="text-[7px] font-medium">Profile</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 inset-x-0 h-1.5 flex justify-center">
          <div className="w-32 h-1 bg-[#1C1C1E] rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default MobilePreview;
