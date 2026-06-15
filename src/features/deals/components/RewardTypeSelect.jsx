import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const rewardOptions = [
  'ExtraBucks (ECB)',
  'Promo credit',
  'Cash rewards',
  'Store credit',
  'Coupon reward',
  'Loyalty points'
];

const RewardTypeSelect = ({ value, onChange, placeholder = 'Select reward type' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
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
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 border rounded-lg text-[14px] text-left transition-all duration-150 bg-white flex items-center justify-between
          \${isOpen
            ? 'border-[#005EF8] ring-2 ring-[#005EF8]/10'
            : 'border-[#EBEBEB] hover:border-[#D1D5DC]'
          }`}
      >
        <span className={`truncate \${value ? 'text-[#0A0A0A]' : 'text-[#6A7282]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-[#6A7282] shrink-0 transition-transform duration-200 \${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-2 max-h-[250px] overflow-y-auto">
          <div
            onClick={() => handleSelect('')}
            className="px-4 py-2.5 text-[14px] text-[#6A7282] cursor-pointer hover:bg-[#F5F5F5] transition-colors border-b border-[#F5F5F5]"
          >
            None (No Reward)
          </div>
          {rewardOptions.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2.5 text-[14px] text-[#0A0A0A] cursor-pointer hover:bg-[#F5F5F5] transition-colors border-b border-[#F5F5F5] last:border-0 \${value === opt ? 'bg-[#F0F5FF] border-l-2 border-l-[#005EF8] text-[#005EF8]' : ''
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardTypeSelect;
