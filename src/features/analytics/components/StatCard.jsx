import React from 'react';

const StatCard = ({ title, valueNode, subtextNode, iconNode }) => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 h-[140px] flex flex-col justify-between relative overflow-hidden shadow-sm">
      <div className="flex justify-between items-start z-10">
        <h3 className="text-[11px] font-bold text-[#8C8C8C] uppercase tracking-wider font-inter">{title}</h3>
        {iconNode && <div className="absolute top-4 right-4 z-0">{iconNode}</div>}
      </div>
      <div className="z-10">
        <div className="mb-1">{valueNode}</div>
        <div className="text-[13px] font-medium font-inter mt-2">
          {subtextNode}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
