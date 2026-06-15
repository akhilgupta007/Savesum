import React from 'react';

const MostUsedDeals = ({ deals = [] }) => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 font-inter h-[400px] flex flex-col">
      <h2 className="text-[15px] font-bold text-[#0A0A0A] mb-4">Most Used Deals</h2>
      {deals.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[14px] text-[#8C8C8C]">No data available</p>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto pr-2 custom-scrollbar">
          {deals.map((deal, index) => (
            <div 
              key={deal.dealId || deal._id || index} 
              className={`flex items-center justify-between py-4 ${index !== deals.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={deal.productImageUrl || 'https://via.placeholder.com/100'} 
                  alt={deal.productName || 'Product'} 
                  className="w-11 h-11 rounded-lg object-cover bg-gray-100" 
                />
                <div>
                  <h4 className="text-[14px] font-semibold text-[#0A0A0A] leading-tight line-clamp-1">{deal.productName}</h4>
                  <p className="text-[12px] text-[#8C8C8C] mt-1 font-medium">{deal.storeName}</p>
                </div>
              </div>
              <div className="text-[15px] font-bold text-[#10B981] flex flex-col items-end">
                <span>${deal.couponAmount}</span>
                <span className="text-[11px] text-[#8C8C8C] font-normal">Used: {deal.useCount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostUsedDeals;
