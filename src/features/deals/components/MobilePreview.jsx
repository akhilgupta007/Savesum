import React from 'react';
import { Search, Filter, Home, Tag, Calendar, Calculator, User } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

const MobilePreview = ({ formData }) => {
  // Default values for empty form state
  const name = formData.name || 'Enter Product Name';

  // Calculate final price logic for the preview
  const retailNum = parseFloat(formData.retail) || 0;
  const couponNum = parseFloat(formData.coupon) || 0;
  const rewardNum = parseFloat(formData.reward) || 0;
  const finalPrice = formatPrice(Math.max(0, retailNum - couponNum));

  const expiry = formData.endDate || 'MM/DD/YY';

  return (
    <div className="flex flex-col items-center w-full max-w-[320px] mx-auto sticky top-0">
      {/* Label */}
      <div className="w-full bg-[#C2E8CE] rounded-xl py-2.5 mb-4 flex justify-center shadow-sm">
        <span className="text-[#00A152] text-[11px] font-bold tracking-wider uppercase">Live Mobile Preview</span>
      </div>

      {/* Phone Frame */}
      <div className="w-[300px] h-[540px] bg-white border-[8px] border-[#1C1C1E] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col font-inter">

        {/* Notch Area */}
        <div className="absolute top-0 inset-x-0 h-4 flex justify-center pointer-events-none z-10">
          <div className="w-16 h-4 bg-[#1C1C1E] rounded-b-xl"></div>
        </div>

        {/* Status Bar */}
        <div className="h-6 w-full flex items-center justify-between px-4 pt-1 pb-1 text-[9px] font-medium text-black bg-[#F9FAFB]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 11V8H3V11H1ZM5 11V6H7V11H5ZM9 11V4H11V11H9ZM13 11V1H15V11H13Z" /></svg>
            <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L0 3.33333C2.12132 1.15438 5.02944 0 8 0C10.9706 0 13.8787 1.15438 16 3.33333L8 12Z" /></svg>
            <svg width="22" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="20" height="10" rx="3" /><path d="M22 4V8" strokeWidth="2" strokeLinecap="round" /><rect x="2" y="2" width="14" height="8" rx="2" fill="currentColor" stroke="none" /></svg>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#F9FAFB] flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-bold text-[#0A0A0A]">All Deals</h1>
            <span className="text-[#D97706] text-[11px] font-medium flex items-center gap-1">
              Planner mode <span className="text-[11px]">&gt;</span>
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-[#6A7282]" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#EBEBEB] rounded-xl text-[12px] text-[#0A0A0A] placeholder-[#A0AEC0] outline-none shadow-sm"
                readOnly
              />
            </div>
            <button className="w-[34px] h-[34px] flex items-center justify-center bg-white border border-[#EBEBEB] rounded-xl text-[#6A7282] shadow-sm">
              <Filter size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* NEW DEAL CARD (Matching Screenshot) */}
          <div className="bg-white rounded-[20px] border border-[#EBEBEB] p-3 shadow-sm w-full font-inter">
            <div className="flex gap-3">
              {/* Left Column */}
              <div className="flex flex-col gap-2 w-[100px] shrink-0">
                <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-[#F5F5F5] shrink-0">
                  <img
                    src={formData.img || "https://images.unsplash.com/photo-1584308666744-24d5e4b6e58b?w=200&h=200&fit=crop"}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-bold text-[#005EF8] text-center w-full block">Expires by {expiry}</span>
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col flex-1">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-[13px] font-bold text-[#0A0A0A] leading-tight line-clamp-2 pr-1">{name}</h3>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[9px] font-bold text-[#6A7282] uppercase tracking-wider">Price</span>
                    <span className="text-[14px] font-bold text-[#0A0A0A]">${formatPrice(retailNum)}</span>
                  </div>
                </div>
                
                <div className="mt-1.5 mb-2">
                  <span className="bg-[#C2E8CE] text-[#00A152] px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider inline-block">
                    {formData.couponType || 'Coupon Type'}
                  </span>
                </div>
                
                <div className="border-t border-[#EBEBEB] my-2"></div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] font-bold text-[#6A7282] uppercase tracking-wider">Coupon</span>
                  <span className="text-[14px] font-bold text-[#00A152]">-${formatPrice(couponNum)}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-bold text-[#6A7282] uppercase tracking-wider">You Pay</span>
                  <span className="text-[14px] font-bold text-[#0A0A0A]">${finalPrice}</span>
                </div>
                
                <div className="border-t border-[#EBEBEB] my-2"></div>
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="flex gap-3 mt-1">
              <div className="w-[100px] shrink-0 bg-[#E8F0FE] rounded-xl flex flex-col items-center justify-center py-2">
                <span className="text-[9px] font-bold text-[#6A7282] uppercase tracking-wider">Earn</span>
                <span className="text-[14px] font-bold text-[#005EF8]">${formatPrice(rewardNum)}</span>
              </div>
              <button className="flex-1 bg-[#005EF8] text-white font-bold text-[13px] rounded-xl py-2 flex items-center justify-center shadow-sm">
                Add to Planner
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="h-[60px] bg-white border-t border-[#EBEBEB] flex items-center justify-between px-5 pb-3 pt-2 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col items-center gap-1 text-[#6A7282]">
            <Home size={16} strokeWidth={1.5} />
            <span className="text-[8px] font-medium">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#005EF8]">
            <Tag size={16} strokeWidth={2} fill="currentColor" className="text-[#005EF8]" />
            <span className="text-[8px] font-bold">Deals</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#6A7282]">
            <Calendar size={16} strokeWidth={1.5} />
            <span className="text-[8px] font-medium">Planner</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#6A7282]">
            <Calculator size={16} strokeWidth={1.5} />
            <span className="text-[8px] font-medium">Calculator</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#6A7282]">
            <User size={16} strokeWidth={1.5} />
            <span className="text-[8px] font-medium">Profile</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 h-1 flex justify-center z-20">
          <div className="w-32 h-1 bg-[#1C1C1E] rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default MobilePreview;
