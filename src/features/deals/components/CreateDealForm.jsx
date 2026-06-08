import React, { useState, useRef, useEffect } from 'react';
import { Plus, Calendar, ChevronDown } from 'lucide-react';

const percentageOptions = ['10 %', '20 %', '30 %', '40 %', '50 %', '60 %', '70 %', '80 %', '90 %', 'Free', 'Custom'];

const CreateDealForm = ({ formData, setFormData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCouponTypeSelect = (option) => {
    setFormData(prev => ({ ...prev, couponType: option }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full font-inter pb-32">
      
      {/* ITEM INFORMATION */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">ITEM INFORMATION</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              placeholder="Eg., Pain relief Caplets"
              className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">UPC Code</label>
            <input 
              type="text"
              name="upc"
              value={formData.upc || ''}
              onChange={handleInputChange}
              placeholder="012345678901"
              className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Image</label>
          <div className="w-full h-[120px] border border-dashed border-[#D1D5DC] rounded-xl flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#005EF8] mb-2">
              <Plus size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[12px] font-medium text-[#0A0A0A]">
              Drag & drop product photo or <span className="text-[#005EF8]">Browse</span>
            </p>
            <p className="text-[11px] text-[#6A7282] mt-1">Supports PNG, JPG (Max 5MB)</p>
          </div>
        </div>
      </div>

      {/* RETAILER PRICING */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">RETAILER PRICING</h3>
        
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[13px] font-semibold text-[#0A0A0A]">Store/Retailer</label>
          <input 
            type="text"
            name="store"
            value={formData.store || ''}
            onChange={handleInputChange}
            placeholder="e.g., CVS"
            className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Retail Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input 
                type="text"
                name="retail"
                value={formData.retail || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Sale Price (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input 
                type="text"
                name="salePrice"
                value={formData.salePrice || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* OFFER DETAILS */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative z-20">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">OFFER DETAILS</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input 
                type="text"
                name="coupon"
                value={formData.coupon || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
          
          {/* Custom Dropdown for Coupon Type */}
          <div className="flex flex-col gap-2" ref={dropdownRef}>
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] bg-white flex items-center justify-between focus:outline-none focus:border-[#005EF8]"
              >
                <span className={formData.couponType ? 'text-[#0A0A0A]' : 'text-[#6A7282]'}>
                  {formData.couponType || 'Select'}
                </span>
                <ChevronDown size={16} className="text-[#6A7282]" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-2 max-h-[250px] overflow-y-auto">
                  {percentageOptions.map((opt, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCouponTypeSelect(opt)}
                      className={`px-4 py-2.5 text-[14px] text-[#0A0A0A] cursor-pointer hover:bg-[#F5F5F5] transition-colors border-b border-[#F5F5F5] last:border-0 ${
                        formData.couponType === opt ? 'bg-[#F0F5FF] border-l-2 border-l-[#005EF8] text-[#005EF8]' : ''
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Reward Name</label>
            <input 
              type="text"
              name="rewardName"
              value={formData.rewardName || ''}
              onChange={handleInputChange}
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
                name="reward"
                value={formData.reward || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN SCHEDULING */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm z-10">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">CAMPAIGN SCHEDULING</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Start Date</label>
            <div className="relative">
              <input 
                type="text"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleInputChange}
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
                name="endDate"
                value={formData.endDate || ''}
                onChange={handleInputChange}
                placeholder="dd-mm-yyyy"
                className="w-full pl-4 pr-10 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-[#6A7282]" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateDealForm;
