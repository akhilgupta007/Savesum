import React from 'react';

const StatCard = ({ title, value, subtitle, trend, isPositive, valueColor }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#EBEBEB] flex flex-col gap-2 font-inter shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <h3 className="text-[#6A7282] text-xs font-semibold tracking-wider uppercase">
        {title}
      </h3>
      <div 
        className="text-[40px] font-bold"
        style={{ color: valueColor || '#0A0A0A', lineHeight: '48px' }}
      >
        {value}
      </div>
      <div className="flex items-center gap-1 mt-2 text-[13px]">
        {trend && (
          <span 
            className={`font-semibold ${
              isPositive ? 'text-[#00A152]' : 'text-[#B00020]'
            }`}
          >
            {trend}
          </span>
        )}
        <span className="text-[#0A0A0A]">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatCard;
