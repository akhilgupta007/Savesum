import React, { useState } from 'react';
import ViewDealModal from '../../deals/components/ViewDealModal';

const MostUsedDeals = ({ deals = [] }) => {
  const [viewDeal, setViewDeal] = useState(null);

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col w-full font-inter overflow-hidden">
      <ViewDealModal 
        isOpen={!!viewDeal} 
        onClose={() => setViewDeal(null)} 
        deal={viewDeal}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 border-b border-[#EBEBEB] gap-4 md:gap-0">
        <h2 className="text-[20px] font-semibold text-[#0A0A0A]">Most Used Deals</h2>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto w-full min-h-[300px]">
        {deals.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-[#6A7282]">No data available</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EBEBEB]">
                <th className="py-4 px-6 text-sm text-[#6A7282] font-normal">Item Details</th>
                <th className="py-4 px-6 text-sm text-[#6A7282] font-normal">Store</th>
                <th className="py-4 px-6 text-sm text-[#6A7282] font-normal">Coupon Amount</th>
                <th className="py-4 px-6 text-sm text-[#6A7282] font-normal text-center">Use Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {deals.map((deal, index) => (
                <tr 
                  key={deal.dealId || deal._id || index} 
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  onClick={() => setViewDeal(deal)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={deal.productImageUrl || 'https://via.placeholder.com/80'}
                        alt={deal.productName || 'Product'}
                        className="w-10 h-10 rounded bg-[#EBEBEB] object-cover"
                      />
                      <span className="text-[14px] font-medium text-[#0A0A0A]">{deal.productName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#0A0A0A] font-medium">{deal.storeName || '—'}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[#00A152]">${Number(deal.couponAmount || 0).toFixed(2)}</td>
                  <td className="py-4 px-6 text-[14px] text-[#0A0A0A] text-center">{deal.useCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MostUsedDeals;
