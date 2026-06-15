import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import DealsInventoryTable from '../components/DealsInventoryTable';
import SuccessModal from '../components/SuccessModal';
import { useDebounce } from '@/hooks/useDebounce';

const DealsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const location = useLocation();

  const [successType, setSuccessType] = useState(null);

  useEffect(() => {
    if (location.state?.showSuccess) {
      setSuccessType(location.state.showSuccess);
      // Clear the state so refreshing doesn't re-show the modal
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-full pb-8">
      <SuccessModal
        isOpen={!!successType}
        onClose={() => setSuccessType(null)}
        type={successType}
      />

      <div className="flex items-center justify-between mb-2 w-full">
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={16} className="text-[#6A7282]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item name, store, or UPC..."
            className="pl-11 pr-4 py-3 md:py-[10px] border border-[#EBEBEB] rounded-xl text-[16px] md:text-sm text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:ring-2 focus:ring-[#005EF8] w-full md:w-[320px]"
          />
        </div>
      </div>
      <DealsInventoryTable searchQuery={debouncedSearchTerm} />
    </div>
  );
};

export default DealsPage;
