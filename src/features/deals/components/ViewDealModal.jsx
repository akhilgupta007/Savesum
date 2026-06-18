import React from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';
import { fetchDealById } from '../services/deals.service';

const StatusBadge = ({ status }) => {
  if (status === '—') return <span className="text-[15px] font-medium text-[#0A0A0A]">—</span>;
  
  let colors = 'bg-[#E6F4EA] text-[#00A152]'; // Default Active
  
  if (status === 'Upcoming') {
    colors = 'bg-[#E8F0FE] text-[#005EF8]';
  } else if (status === 'Archived') {
    colors = 'bg-[#F1F5F9] text-[#475569]';
  } else if (status === 'Draft') {
    colors = 'bg-[#F3F4F6] text-[#4B5563]';
  } else if (status === 'Expired') {
    colors = 'bg-[#FEE2E2] text-[#B91C1C]';
  } else if (status === 'Expiring') {
    colors = 'bg-[#FEF3C7] text-[#B45309]';
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${colors}`}>
      {status}
    </span>
  );
};

const ViewDealModal = ({ isOpen, onClose, deal }) => {
  const dealId = deal?.dealId || deal?._id || deal?.id;

  const {
    data: dealDetailsResponse,
    isLoading: isLoadingDealDetails,
  } = useQuery({
    queryKey: ['deal', dealId],
    queryFn: () => fetchDealById(dealId),
    enabled: isOpen && !!dealId,
    staleTime: 0,
  });

  const dealDetails = dealDetailsResponse?.data || dealDetailsResponse || deal;

  if (!isOpen) return null;

  if (isLoadingDealDetails && !dealDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
        <div className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[700px] mx-4 overflow-hidden flex flex-col min-h-[300px] items-center justify-center">
          <UniversalLoader />
        </div>
      </div>
    );
  }

  const computedStatus = (() => {
    if (!dealDetails) return '—';
    if (dealDetails.isArchived) return 'Archived';
    if (dealDetails.isDraft) return 'Draft';
    
    const nowMs = Date.now();
    const endMs = new Date(dealDetails.endDate).getTime();
    const startMs = new Date(dealDetails.startDate).getTime();
    
    if (endMs < nowMs) return 'Expired';
    if (startMs > nowMs) return 'Upcoming';
    
    const hoursLeft = (endMs - nowMs) / (1000 * 60 * 60);
    if (hoursLeft > 0 && hoursLeft <= 24) return 'Expiring';
    
    return 'Active';
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[700px] mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#EBEBEB]">
          <h2 className="text-[16px] font-bold text-[#0A0A0A] tracking-wider uppercase">
            Deal Details
          </h2>
          <button 
            onClick={onClose}
            className="text-[#0A0A0A] hover:text-gray-500 transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* Top section with Image and primary info */}
          <div className="flex gap-6 items-start border-b border-[#EBEBEB] pb-6">
            <div className="w-[120px] h-[120px] bg-[#F9FAFB] rounded-xl overflow-hidden flex-shrink-0 border border-[#EBEBEB]">
              <img 
                src={dealDetails?.productImageUrl || "https://images.unsplash.com/photo-1584308666744-24d5e4b6e58b?w=120&h=120&fit=crop"} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <h3 className="text-[20px] font-bold text-[#0A0A0A]">{dealDetails?.productName || '—'}</h3>
              <p className="text-[14px] text-[#6A7282] font-medium">Store: <span className="text-[#0A0A0A]">{dealDetails?.store?.name || dealDetails?.storeName || dealDetails?.store || '—'}</span></p>
              <p className="text-[14px] text-[#6A7282] font-medium">UPC Code: <span className="text-[#0A0A0A]">{dealDetails?.upcCode || '—'}</span></p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#6A7282] uppercase tracking-wider">Retail Price</span>
              <span className="text-[15px] font-medium text-[#0A0A0A]">${Number(dealDetails?.retailPrice || 0).toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#6A7282] uppercase tracking-wider">Coupon Amount</span>
              <span className="text-[15px] font-medium text-[#00A152]">${Number(dealDetails?.couponAmount || 0).toFixed(2)} {dealDetails?.couponType ? `(${dealDetails.couponType})` : ''}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#6A7282] uppercase tracking-wider">Reward</span>
              <span className="text-[15px] font-medium text-[#00A152]">
                {dealDetails?.rewardName ? `${dealDetails.rewardName} ` : ''}
                {dealDetails?.rewardAmount ? `($${Number(dealDetails.rewardAmount).toFixed(2)})` : (!dealDetails?.rewardName ? '—' : '')}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#6A7282] uppercase tracking-wider">Dates</span>
              <span className="text-[15px] font-medium text-[#0A0A0A]">
                {dealDetails?.startDate ? dayjs(dealDetails.startDate).format('MMM D, YYYY') : '—'} - {dealDetails?.endDate ? dayjs(dealDetails.endDate).format('MMM D, YYYY') : '—'}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#6A7282] uppercase tracking-wider">Status</span>
              <div className="flex items-center mt-1">
                <StatusBadge status={computedStatus} />
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 px-8 py-6 border-t border-[#EBEBEB] bg-[#F9FAFB]">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-[#EBEBEB] text-[#0A0A0A] rounded-xl text-[14px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDealModal;
