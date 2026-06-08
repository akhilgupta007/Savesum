import React, { useState } from 'react';
import { Search, Trash2, Filter } from 'lucide-react';
import EditDealModal from '@/features/deals/components/EditDealModal';
import ConfirmationModal from '@/features/deals/components/ConfirmationModal';
import FiltersModal from '@/features/deals/components/FiltersModal';

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

const mockDeals = [
  {
    id: 1,
    name: 'Liquid Hand Soap',
    upc: '732985029574',
    store: 'Walgreen',
    retail: '$4.99',
    coupon: '-$2.00',
    rewards: '$2.00',
    expiry: '24-12-2025',
    status: 'Active',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5e4b6e58b?w=80&h=80&fit=crop',
  },
  {
    id: 2,
    name: 'Citrus Air Freshener',
    upc: '123456789012',
    store: 'Target',
    retail: '$3.49',
    coupon: '-$1.00',
    rewards: '$1.00',
    expiry: '15-03-2026',
    status: 'Active',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
  },
  {
    id: 3,
    name: 'Dishwashing Liquid',
    upc: '098765432109',
    store: 'Amazon',
    retail: '$5.79',
    coupon: '-$1.50',
    rewards: '$1.50',
    expiry: '01-09-2025',
    status: 'Active',
    img: 'https://images.unsplash.com/photo-1571781926291-c477ebefa4f7?w=80&h=80&fit=crop',
  },
  {
    id: 4,
    name: 'Bathroom Cleaner',
    upc: '567890123456',
    store: 'Costco',
    retail: '$6.99',
    coupon: '-$2.50',
    rewards: '$2.50',
    expiry: '30-06-2024',
    status: 'Upcoming',
    img: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop',
  },
  {
    id: 5,
    name: 'Fabric Softener',
    upc: '876543210987',
    store: 'Kroger',
    retail: '$7.29',
    coupon: '-$3.00',
    rewards: '$3.00',
    expiry: '10-12-2025',
    status: 'Active',
    img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=80&h=80&fit=crop',
  },
  {
    id: 6,
    name: 'All-Purpose Cleaner',
    upc: '345678901234',
    store: 'Walmart',
    retail: '$4.29',
    coupon: '-$1.75',
    rewards: '$1.75',
    expiry: '20-08-2024',
    status: 'Upcoming',
    img: 'https://images.unsplash.com/photo-1584483768567-bea5b4df2768?w=80&h=80&fit=crop',
  },
];

const StatusBadge = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-[#E6F4EA] text-[#00A152]'
          : 'bg-[#FFF4E5] text-[#D97706]'
      }`}
    >
      {status}
    </span>
  );
};

const DealsTable = () => {
  const [editingDeal, setEditingDeal] = useState(null);
  const [archivingDeal, setArchivingDeal] = useState(null);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col w-full font-inter overflow-hidden">
      <FiltersModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <EditDealModal 
        isOpen={!!editingDeal} 
        onClose={() => setEditingDeal(null)} 
        deal={editingDeal} 
      />
      <ConfirmationModal
        isOpen={!!archivingDeal}
        onClose={() => setArchivingDeal(null)}
        title="ARCHIVE DEAL"
        description="The deal will be moved to inactive list, but not permanently deleted. You can restore it anytime from your archive settings."
        confirmText="Archive Deal"
        confirmColor="blue"
        onConfirm={() => setArchivingDeal(null)}
      />
      <ConfirmationModal
        isOpen={!!deletingDeal}
        onClose={() => setDeletingDeal(null)}
        title="DELETE DEAL"
        description={<>This action will remove the deal data and history.<br/>You cannot undo this action</>}
        confirmText="Delete Deal"
        confirmColor="red"
        onConfirm={() => setDeletingDeal(null)}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 border-b border-[#EBEBEB] gap-4 md:gap-0">
        <h2 className="text-[20px] font-semibold text-[#0A0A0A]">Recent Deals</h2>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center justify-between md:justify-start gap-3 border border-[#EBEBEB] rounded-full px-4 py-2 bg-white w-full md:w-auto">
            <span className="text-[14px] font-medium text-[#0A0A0A]">Live Preview</span>
            <div className="w-10 h-6 bg-[#EBEBEB] rounded-full relative cursor-pointer flex items-center p-1">
              <div className="w-4 h-4 bg-[#6A7282] rounded-full absolute left-1"></div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-[#6A7282]" />
              </div>
              <input
                type="text"
                placeholder="Search by item name, store, or UPC..."
                className="pl-11 pr-4 py-3 md:py-[10px] border border-[#EBEBEB] rounded-xl text-[16px] md:text-sm text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:ring-2 focus:ring-[#005EF8] w-full md:w-[260px]"
              />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center p-3 md:p-[10px] border border-[#EBEBEB] rounded-xl text-[#6A7282] hover:bg-[#F5F5F5] transition-colors shrink-0"
            >
              <Filter size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EBEBEB]">
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Item Details</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Store</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Retail</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Coupon</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Rewards</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Expiry</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6A7282] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB]">
            {mockDeals.map((deal) => (
              <tr key={deal.id} className="hover:bg-[#F9FAFB] transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img src={deal.img} alt={deal.name} className="w-10 h-10 rounded bg-[#EBEBEB]" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#0A0A0A]">{deal.name}</span>
                      <span className="text-xs text-[#6A7282]">UPC: {deal.upc}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-[#0A0A0A] font-medium">{deal.store}</td>
                <td className="py-4 px-6 text-sm text-[#6A7282]">{deal.retail}</td>
                <td className="py-4 px-6 text-sm font-medium text-[#00A152]">{deal.coupon}</td>
                <td className="py-4 px-6 text-sm font-medium text-[#005EF8]">{deal.rewards}</td>
                <td className="py-4 px-6 text-sm text-[#6A7282]">{deal.expiry}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={deal.status} />
                </td>
                <td className="py-4 px-6 text-right w-[160px]">
                  <div className="flex items-center justify-end gap-2 md:gap-5">
                    <button 
                      onClick={() => setEditingDeal(deal)}
                      className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                      title="Edit"
                    >
                      <EditIconCustom />
                    </button>
                    <button 
                      onClick={() => setArchivingDeal(deal)}
                      className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                      title="Archive"
                    >
                      <ArchiveIconCustom />
                    </button>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-6 border-t border-[#EBEBEB]">
        <span className="text-[13px] text-[#6A7282]">Showing 1-6 of 50</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium bg-[#E8F0FE] text-[#005EF8]">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default DealsTable;
