import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const percentageOptions = ['10 %', '20 %', '30 %', '40 %', '50 %', '60 %', '70 %', '80 %', '90 %', 'Free', 'Custom'];

const CouponTypeSelect = ({ value, onChange, placeholder = 'Select' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Type</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] bg-white flex items-center justify-between focus:outline-none focus:border-[#005EF8]"
        >
          <span className={value ? 'text-[#0A0A0A]' : 'text-[#6A7282]'}>
            {value || placeholder}
          </span>
          <ChevronDown size={16} className="text-[#6A7282]" />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-2 max-h-[250px] overflow-y-auto">
            {percentageOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2.5 text-[14px] text-[#0A0A0A] cursor-pointer hover:bg-[#F5F5F5] transition-colors border-b border-[#F5F5F5] last:border-0 ${value === option ? 'bg-[#F0F5FF] border-l-2 border-l-[#005EF8] text-[#005EF8]' : ''}`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponTypeSelect;