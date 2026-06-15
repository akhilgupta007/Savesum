import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Upload, Filter, Plus, ArchiveRestore } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import dayjs from 'dayjs';
import EditDealModal from './EditDealModal';
import ConfirmationModal from './ConfirmationModal';
import FiltersModal from './FiltersModal';
import { useDeals } from '../hooks/useDeals';
import { useUpdateDeal } from '../hooks/useUpdateDeal';
import { useDeleteDeal } from '../hooks/useDeleteDeal';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';

const EditIconCustom = () => (
  <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 7.00005L21 10.5001M15.1666 23.3334H24.5M5.83329 18.6667L4.66663 23.3334L9.33329 22.1667L22.8503 8.64972C23.2877 8.21216 23.5335 7.61877 23.5335 7.00005C23.5335 6.38134 23.2877 5.78795 22.8503 5.35039L22.6496 5.14972C22.2121 4.71229 21.6187 4.46655 21 4.46655C20.3812 4.46655 19.7879 4.71229 19.3503 5.14972L5.83329 18.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArchiveIconCustom = () => (
  <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.5 8.16667H3.5M3.5 8.16667L4.9 6.3C5.93017 4.92567 6.44583 4.2385 7.18433 3.86983C7.924 3.5 8.78267 3.5 10.5 3.5H17.5C19.2173 3.5 20.076 3.5 20.8157 3.86983C21.5542 4.2385 22.0698 4.92567 23.1 6.3L24.5 8.16667V15.1667C24.5 19.5662 24.4988 21.7653 23.1327 23.1327C21.7665 24.5 19.5662 24.5 15.1667 24.5H12.8333C8.43383 24.5 6.23467 24.4988 4.86733 23.1327C3.5 21.7665 3.5 19.5662 3.5 15.1667V8.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 19.8333V12.25M10.5 16.9167C11.1883 17.6248 13.02 20.4167 14 20.4167C14.98 20.4167 16.8117 17.6248 17.5 16.9167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tabs = ['All', 'Active', 'Upcoming', 'Expiring', 'Drafts', 'Archived', 'Expired'];

const StatusBadge = ({ status }) => {
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
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${colors}`}
    >
      {status}
    </span>
  );
};

const getDealStatus = (deal, nowMs) => {
  if (deal.isArchived) return 'Archived';
  if (deal.isDraft) return 'Draft';
  
  const endMs = new Date(deal.endDate).getTime();
  const startMs = new Date(deal.startDate).getTime();
  
  if (endMs < nowMs) return 'Expired';
  if (startMs > nowMs) return 'Upcoming';
  
  // Expiring in less than 24h
  const hoursLeft = (endMs - nowMs) / (1000 * 60 * 60);
  if (hoursLeft > 0 && hoursLeft <= 24) return 'Expiring';
  
  return 'Active';
};

const mapTabToStatus = (tab) => {
  if (tab === 'All') return undefined;
  if (tab === 'Active') return 'ACTIVE';
  if (tab === 'Upcoming') return 'UPCOMING';
  if (tab === 'Expiring') return 'EXPIRING';
  if (tab === 'Drafts') return 'DRAFTS';
  if (tab === 'Archived') return 'ARCHIVED';
  if (tab === 'Expired') return 'EXPIRED';
  return undefined;
};

const getSort = (sortBy) => {
  if (!sortBy) return undefined;
  switch (sortBy) {
    case 'Value (high - low)': return { field: 'value', order: 'desc' };
    case 'Value (low - high)': return { field: 'value', order: 'asc' };
    case 'Newest first': return { field: 'createdAt', order: 'desc' };
    case 'Expiring Soon': return { field: 'endDate', order: 'asc' };
    default: return undefined;
  }
};

const DealsInventoryTable = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [editingDeal, setEditingDeal] = useState(null);
  const [archivingDeal, setArchivingDeal] = useState(null);
  const [unarchivingDeal, setUnarchivingDeal] = useState(null);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination & Filters state
  const [page, setPage] = useState(1);
  const limit = 10;
  const [modalFilters, setModalFilters] = useState(null);

  const activeStores = modalFilters ? Object.entries(modalFilters.stores).filter(([_, v]) => v).map(([k]) => k) : [];
  const activeRewards = modalFilters ? Object.entries(modalFilters.rewardTypes).filter(([_, v]) => v).map(([k]) => k) : [];

  const apiFilters = {
    status: mapTabToStatus(activeTab),
    ...(modalFilters && {
      ...(activeStores.length > 0 && { stores: activeStores }),
      ...(activeRewards.length > 0 && { rewardTypes: activeRewards }),
      dateRange: (modalFilters.startDate || modalFilters.endDate) ? {
        startDate: modalFilters.startDate || undefined,
        endDate: modalFilters.endDate || undefined,
      } : undefined
    })
  };

  const sortParam = getSort(modalFilters?.sortBy);

  const { data, isLoading } = useDeals({
    search: searchQuery,
    filters: apiFilters,
    sort: sortParam,
    pagination: { page, limit }
  });
  
  const { mutate: updateDeal, isPending: isUpdating } = useUpdateDeal();
  const { mutate: deleteDeal, isPending: isDeleting } = useDeleteDeal();

  const handleArchiveConfirm = () => {
    if (!archivingDeal) return;
    const formData = new FormData();
    formData.append('isArchived', 'true');
    updateDeal({ id: archivingDeal._id || archivingDeal.id, formData }, {
      onSuccess: () => setArchivingDeal(null)
    });
  };

  const handleUnarchiveConfirm = () => {
    if (!unarchivingDeal) return;
    const formData = new FormData();
    formData.append('isArchived', 'false');
    updateDeal({ id: unarchivingDeal._id || unarchivingDeal.id, formData }, {
      onSuccess: () => setUnarchivingDeal(null)
    });
  };

  const rawDeals = data?.data || [];
  
  const deals = useMemo(() => {
    const nowMs = Date.now(); // Absolute UTC milliseconds independent of local timezone
    return rawDeals.map(deal => {
      const status = getDealStatus(deal, nowMs);
      return {
        ...deal,
        computedStatus: status,
        isExpiryRed: status === 'Expiring' || status === 'Expired'
      };
    });
  }, [rawDeals]);
  const paginationInfo = data?.pagination || { total: 0, page: 1, limit: 10, pages: 1 };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // Reset to first page on tab change
  };

  const handleApplyFilters = (filters) => {
    setModalFilters(filters);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="flex flex-col w-full font-inter">
      {/* Edit Modal */}
      <EditDealModal 
        isOpen={!!editingDeal} 
        onClose={() => setEditingDeal(null)} 
        deal={editingDeal} 
      />

      {/* Archive Modal */}
      <ConfirmationModal
        isOpen={!!archivingDeal}
        onClose={() => setArchivingDeal(null)}
        title="ARCHIVE DEAL"
        description="The deal will be moved to inactive list, but not permanently deleted. You can restore it anytime from your archive settings."
        confirmText={isUpdating ? "Archiving..." : "Archive Deal"}
        confirmColor="blue"
        onConfirm={handleArchiveConfirm}
      />

      {/* Unarchive Modal */}
      <ConfirmationModal
        isOpen={!!unarchivingDeal}
        onClose={() => setUnarchivingDeal(null)}
        title="UNARCHIVE DEAL"
        description="The deal will be moved to active list."
        confirmText={isUpdating ? "Unarchiving..." : "Unarchive Deal"}
        confirmColor="blue"
        onConfirm={handleUnarchiveConfirm}
      />

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={!!deletingDeal}
        onClose={() => setDeletingDeal(null)}
        title="DELETE DEAL"
        description={<>This action will remove the deal data and history.<br/>You cannot undo this action</>}
        confirmText={isDeleting ? "Deleting..." : "Delete Deal"}
        confirmColor="red"
        onConfirm={() => {
          if (!deletingDeal) return;
          deleteDeal(deletingDeal._id || deletingDeal.id, {
            onSuccess: () => setDeletingDeal(null)
          });
        }}
      />

      {/* Filters Modal */}
      <FiltersModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={modalFilters}
        onApply={handleApplyFilters}
      />

      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Weekly Deals Inventory</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EBEBEB] text-[#6A7282] bg-white hover:bg-gray-50 transition-colors shrink-0">
            <Upload size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EBEBEB] text-[#6A7282] bg-white hover:bg-gray-50 transition-colors shrink-0"
          >
            <Filter size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => navigate(ROUTES.CREATE_DEAL)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#005EF8] text-white text-sm font-medium hover:bg-blue-700 transition-colors flex-1 md:flex-none"
          >
            <Plus size={18} strokeWidth={2} />
            Add Deal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-[#EBEBEB] mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-4 px-2 text-[15px] font-medium transition-colors relative shrink-0 ${
              activeTab === tab ? 'text-[#005EF8]' : 'text-[#6A7282] hover:text-[#0A0A0A]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005EF8]" />
            )}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)] w-full overflow-hidden">
        <div className="overflow-x-auto w-full min-h-[300px]">
          {isLoading ? (
            <UniversalLoader />
          ) : deals.length === 0 ? (
             <div className="flex items-center justify-center h-[300px] text-[#6A7282]">No deals found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EBEBEB]">
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Item Details</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Store</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Retail</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Coupon</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Rewards</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Expiry</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal">Status</th>
                  <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal text-center w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB]">
                {deals.map((deal) => {
                  return (
                    <tr key={deal._id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={deal.productImageUrl || 'https://via.placeholder.com/80'} alt={deal.productName} className="w-10 h-10 rounded bg-[#EBEBEB] object-cover" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[14px] font-medium text-[#0A0A0A]">{deal.productName}</span>
                            <span className="text-[12px] text-[#6A7282]">UPC: {deal.upcCode}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[14px] text-[#0A0A0A] font-medium">{deal.storeName || deal.store || '—'}</td>
                      <td className="py-4 px-6 text-[14px] text-[#0A0A0A]">${deal.retailPrice?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[#00A152]">-${deal.couponAmount?.toFixed(2) || '0.00'}</td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[#00A152]">
                        {deal.rewardName ? (
                          <div className="flex flex-col">
                            <span className="text-[#00A152]">{deal.rewardName}</span>
                            <span className="text-[#00A152]">${deal.rewardAmount?.toFixed(2) || '0.00'}</span>
                          </div>
                        ) : deal.rewardAmount ? (
                          `$${deal.rewardAmount.toFixed(2)}`
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className={`py-4 px-6 text-[14px] whitespace-nowrap ${deal.isExpiryRed ? 'text-[#B00020]' : 'text-[#0A0A0A]'}`}>
                        {dayjs(deal.endDate).format('DD-MM-YYYY')}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={deal.computedStatus} />
                      </td>
                      <td className="py-4 px-6 w-[120px]">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            onClick={() => setEditingDeal(deal)}
                            className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                            title="Edit"
                          >
                            <EditIconCustom />
                          </button>
                          {deal.isArchived ? (
                            <button 
                              onClick={() => setUnarchivingDeal(deal)}
                              className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                              title="Unarchive"
                            >
                              <ArchiveRestore size={20} strokeWidth={1.5} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => setArchivingDeal(deal)}
                              className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                              title="Archive"
                            >
                              <ArchiveIconCustom />
                            </button>
                          )}
                          <button 
                            onClick={() => setDeletingDeal(deal)}
                            className="p-2 text-[#B00020] hover:text-red-700 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={20} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && deals.length > 0 && (
          <div className="flex items-center justify-between p-6 border-t border-[#EBEBEB]">
            <span className="text-[13px] text-[#6A7282]">
              Showing {((paginationInfo.page - 1) * limit) + 1}-{Math.min(paginationInfo.page * limit, paginationInfo.total)} of {paginationInfo.total}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              
              {/* Simplified pagination display */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium bg-[#E8F0FE] text-[#005EF8]">
                {page}
              </button>

              <button 
                onClick={() => setPage(p => Math.min(paginationInfo.pages, p + 1))}
                disabled={page === paginationInfo.pages || paginationInfo.pages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsInventoryTable;
