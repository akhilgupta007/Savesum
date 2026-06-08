import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Upload, Filter, Plus } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import EditDealModal from './EditDealModal';
import ConfirmationModal from './ConfirmationModal';
import FiltersModal from './FiltersModal';

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
    img: 'https://randomuser.me/api/portraits/lego/1.jpg', // dummy image
  },
  {
    id: 2,
    name: 'Dishwashing Liquid',
    upc: '098765432109',
    store: 'Amazon',
    retail: '$5.79',
    coupon: '-$1.50',
    rewards: '$1.50',
    expiry: 'In 24 hrs',
    isExpiryRed: true,
    status: 'Active',
    img: 'https://randomuser.me/api/portraits/lego/2.jpg',
  },
  {
    id: 3,
    name: 'Bathroom Cleaner',
    upc: '567890123456',
    store: 'Costco',
    retail: '$6.99',
    coupon: '-$2.50',
    rewards: '$2.50',
    expiry: '30-06-2024',
    status: 'Upcoming',
    img: 'https://randomuser.me/api/portraits/lego/3.jpg',
  },
  {
    id: 4,
    name: 'Fabric Softener',
    upc: '876543210987',
    store: 'Kroger',
    retail: '$7.29',
    coupon: '-$3.00',
    rewards: '$3.00',
    expiry: '10-12-2025',
    status: 'Active',
    img: 'https://randomuser.me/api/portraits/lego/4.jpg',
  },
  {
    id: 5,
    name: 'All-Purpose Cleaner',
    upc: '345678901234',
    store: 'Walmart',
    retail: '$4.29',
    coupon: '-$1.75',
    rewards: '$1.75',
    expiry: '20-08-2024',
    status: 'Upcoming',
    img: 'https://randomuser.me/api/portraits/lego/5.jpg',
  },
  {
    id: 6,
    name: 'Glass Cleaner',
    upc: '123456789012',
    store: 'Target',
    retail: '$3.59',
    coupon: '-$0.50',
    rewards: '$1.50',
    expiry: '15-09-2024',
    status: 'Archived',
    img: 'https://randomuser.me/api/portraits/lego/6.jpg',
  },
  {
    id: 7,
    name: 'Citrus Air Freshener',
    upc: '123456789012',
    store: 'Target',
    retail: '$3.49',
    coupon: '-$1.00',
    rewards: '$1.00',
    expiry: '15-03-2026',
    status: 'Active',
    img: 'https://randomuser.me/api/portraits/lego/7.jpg',
  },
];

const tabs = ['All', 'Active', 'Upcoming', 'Expiring', 'Drafts', 'Archived', 'Expired'];

const StatusBadge = ({ status }) => {
  let colors = 'bg-[#E6F4EA] text-[#00A152]'; // Default Active
  
  if (status === 'Upcoming') {
    colors = 'bg-[#E8F0FE] text-[#005EF8]';
  } else if (status === 'Archived') {
    colors = 'bg-[#FFF4E5] text-[#D97706]';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${colors}`}
    >
      {status}
    </span>
  );
};

const DealsInventoryTable = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [editingDeal, setEditingDeal] = useState(null);
  const [archivingDeal, setArchivingDeal] = useState(null);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter deals based on the active tab
  const filteredDeals = mockDeals.filter((deal) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Expiring') return deal.isExpiryRed;
    return deal.status === activeTab;
  });

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
        confirmText="Archive Deal"
        confirmColor="blue"
        onConfirm={() => setArchivingDeal(null)}
      />

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={!!deletingDeal}
        onClose={() => setDeletingDeal(null)}
        title="DELETE DEAL"
        description={<>This action will remove the deal data and history.<br/>You cannot undo this action</>}
        confirmText="Delete Deal"
        confirmColor="red"
        onConfirm={() => setDeletingDeal(null)}
      />

      {/* Filters Modal */}
      <FiltersModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Weekly Deals Inventory</h1>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EBEBEB] text-[#6A7282] bg-white hover:bg-gray-50 transition-colors">
            <Upload size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#EBEBEB] text-[#6A7282] bg-white hover:bg-gray-50 transition-colors"
          >
            <Filter size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => navigate(ROUTES.CREATE_DEAL)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#005EF8] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} strokeWidth={2} />
            Add Deal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-[#EBEBEB] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${
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
        <div className="overflow-x-auto w-full">
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
                <th className="py-4 px-6 text-sm font-medium text-[#6A7282] font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={deal.img} alt={deal.name} className="w-10 h-10 rounded bg-[#EBEBEB] object-cover" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-medium text-[#0A0A0A]">{deal.name}</span>
                        <span className="text-[12px] text-[#6A7282]">UPC: {deal.upc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#0A0A0A] font-medium">{deal.store}</td>
                  <td className="py-4 px-6 text-[14px] text-[#0A0A0A]">{deal.retail}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[#00A152]">{deal.coupon}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[#00A152]">{deal.rewards}</td>
                  <td className={`py-4 px-6 text-[14px] ${deal.isExpiryRed ? 'text-[#B00020]' : 'text-[#0A0A0A]'}`}>
                    {deal.expiry}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={deal.status} />
                  </td>
                  <td className="py-4 px-6 text-right w-[160px]">
                    <div className="flex items-center justify-end gap-5">
                      <button 
                        onClick={() => setEditingDeal(deal)}
                        className="text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                        title="Edit"
                      >
                        <EditIconCustom />
                      </button>
                      <button 
                        onClick={() => setArchivingDeal(deal)}
                        className="text-[#6A7282] hover:text-[#0A0A0A] transition-colors" 
                        title="Archive"
                      >
                        <ArchiveIconCustom />
                      </button>
                      <button 
                        onClick={() => setDeletingDeal(deal)}
                        className="text-[#B00020] hover:text-red-700 transition-colors" 
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

        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-[#EBEBEB]">
          <span className="text-[13px] text-[#6A7282]">
            Showing {filteredDeals.length > 0 ? 1 : 0}-{filteredDeals.length} of {mockDeals.length}
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium bg-[#E8F0FE] text-[#005EF8]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#6A7282] hover:bg-[#F5F5F5]">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsInventoryTable;
