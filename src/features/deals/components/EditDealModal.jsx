import React from 'react';
import { X, Calendar, Plus } from 'lucide-react';

const EditDealModal = ({ isOpen, onClose, deal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#EBEBEB]">
          <h2 className="text-[16px] font-bold text-[#0A0A0A] tracking-wider uppercase">
            Edit Deal
          </h2>
          <button 
            onClick={onClose}
            className="text-[#0A0A0A] hover:text-gray-500 transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Name</label>
              <input 
                type="text" 
                defaultValue={deal?.name || ''}
                placeholder="Eg., Pain relief Caplets"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">UPC Code</label>
              <input 
                type="text" 
                defaultValue={deal?.upc || ''}
                placeholder="012345678901"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Store</label>
              <input 
                type="text" 
                defaultValue={deal?.store || ''}
                placeholder="eg., walmart"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Retail Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="text" 
                  defaultValue={deal?.retail ? deal.retail.replace('$', '') : ''}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="text" 
                  defaultValue={deal?.coupon ? deal.coupon.replace('-$', '') : ''}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Type</label>
              <select className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] appearance-none bg-white focus:outline-none focus:border-[#005EF8]">
                <option>Select</option>
                <option>Digital</option>
                <option>Paper</option>
              </select>
              <div className="absolute right-12 mt-10 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Reward Name</label>
              <input 
                type="text" 
                placeholder="e.g. ExtraBucks reward"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Reward Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="text" 
                  defaultValue={deal?.rewards ? deal.rewards.replace('$', '') : ''}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Complex layout with Dates and Image */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* Left side: Dates */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0A0A0A]">Start Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy"
                    className="w-full pl-4 pr-10 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-[#6A7282]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0A0A0A]">End Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue={deal?.expiry && deal.expiry !== 'In 24 hrs' ? deal.expiry : ''}
                    placeholder="dd-mm-yyyy"
                    className="w-full pl-4 pr-10 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-[#6A7282]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Image Uploader */}
            <div className="flex flex-col gap-2 h-full">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Update Product Image</label>
              <div className="flex gap-4 flex-1">
                {/* Existing Image Thumbnail */}
                <div className="w-[120px] bg-[#EBEBEB] rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={deal?.img || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Drag and Drop Zone */}
                <div className="flex-1 border border-dashed border-[#D1D5DC] rounded-xl flex flex-col items-center justify-center p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#005EF8] mb-3">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[12px] font-medium text-[#0A0A0A] text-center leading-tight">
                    Drag & drop product photo or <span className="text-[#005EF8]">Browse</span>
                  </p>
                  <p className="text-[11px] text-[#6A7282] mt-1 text-center">
                    Supports PNG, JPG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-[#B00020] text-[#B00020] rounded-xl text-[14px] font-semibold hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              className="flex-1 py-3 bg-[#005EF8] text-white rounded-xl text-[14px] font-semibold hover:bg-blue-700 transition-colors"
            >
              Update Deal
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditDealModal;
