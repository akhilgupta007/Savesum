import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import CreateDealForm from '../components/CreateDealForm';
import MobilePreview from '../components/MobilePreview';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';
import { useCreateDeal } from '../hooks/useCreateDeal';
import { useQueryClient } from '@tanstack/react-query';
import { formatRelativeTime } from '@/utils/formatDate';

const CreateDealPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createDeal, isPending: isCreating } = useCreateDeal();
  
  const [formData, setFormData] = useState({});
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [successType, setSuccessType] = useState(null); // 'draft' | 'publish' | null
  
  // Dynamic Text State
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Check for required fields (based on API requirements)
    const requiredFields = ['name', 'upc', 'store', 'retail', 'coupon', 'couponType', 'startDate', 'endDate'];
    const complete = requiredFields.every(field => formData[field] && formData[field] !== '');
    setIsComplete(complete);

    // Debounce simulated auto-save (e.g., to localStorage)
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setLastSavedTime(Date.now());
        // localStorage.setItem('dealDraft', JSON.stringify(formData)); // Could be enabled for real persistence
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    // Refresh the "time ago" string every minute
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCancelConfirm = () => {
    setIsCancelOpen(false);
    navigate(ROUTES.DEALS);
  };

  const constructApiPayload = (isDraft) => {
    const data = new FormData();
    
    const mapping = {
      name: 'productName',
      upc: 'upcCode',
      retail: 'retailPrice',
      coupon: 'couponAmount',
      couponType: 'couponType',
      rewardName: 'rewardName',
      reward: 'rewardAmount',
      startDate: 'startDate',
      endDate: 'endDate'
    };

    Object.keys(mapping).forEach(formKey => {
      if (formData[formKey]) {
        if (formKey === 'couponType') {
          // Map to backend expected values
          const typeValue = formData.couponType.includes('%') ? 'percentage' : 'flat';
          data.append('couponType', typeValue);
        } else {
          data.append(mapping[formKey], formData[formKey]);
        }
      }
    });

    if (formData.store) {
      data.append('store', formData.store);
      const storesCache = queryClient.getQueryData(['stores']);
      const storesList = storesCache?.data || [];
      const selectedStore = storesList.find(s => s.name.toLowerCase() === formData.store.toLowerCase());
      if (selectedStore) {
        data.append('storeId', selectedStore._id);
      }
    }

    if (formData.imgFile) {
      data.append('productImage', formData.imgFile);
    }
    
    if (isDraft) {
      data.append('isDraft', 'true');
    }

    return data;
  };

  const handlePublishConfirm = () => {
    setIsPublishOpen(false);
    const data = constructApiPayload(false);
    createDeal(data, {
      onSuccess: () => {
        setSuccessType('publish');
      }
    });
  };

  const handleSaveDraft = () => {
    const data = constructApiPayload(true);
    createDeal(data, {
      onSuccess: () => {
        setSuccessType('draft');
      }
    });
  };

  const handleSuccessClose = () => {
    setSuccessType(null);
    navigate(ROUTES.DEALS);
  };

  return (
    <>
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={() => navigate(ROUTES.DEALS)}
          className="flex items-center gap-3 text-[22px] font-bold text-[#0A0A0A] hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
          Create new Deal
        </button>
        <div className="bg-[#E8F0FE] text-[#005EF8] px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase">
          Draft Mode
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        title="CANCEL DEAL ?"
        description={<>Are you sure you want to cancel this deal?<br/>The data logged will be erased.</>}
        cancelText="NO"
        confirmText="YES"
        confirmColor="blue"
        onConfirm={handleCancelConfirm}
      />
      
      <ConfirmationModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        title="PUBLISH DEAL ?"
        description={<>The users will be able to see this deal once it is published. You can edit it from the dashboard.</>}
        cancelText="NO"
        confirmText={isCreating ? "PUBLISHING..." : "YES"}
        confirmColor="blue"
        onConfirm={handlePublishConfirm}
      />

      <SuccessModal
        isOpen={!!successType}
        onClose={handleSuccessClose}
        type={successType}
      />

      <div className="flex flex-col h-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <CreateDealForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Right Column: Mobile Preview */}
          <div className="lg:col-span-4 h-full relative z-0">
            <MobilePreview formData={formData} />
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="fixed bottom-0 right-0 left-0 lg:left-[280px] p-4 lg:p-0 lg:h-[72px] bg-[#F5F5F5] border-t border-[#EBEBEB] flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 z-40 shadow-[0_-4px_6px_rgba(0,0,0,0.02)] gap-4 lg:gap-0">
          <div className="flex items-center gap-2 w-full lg:w-auto justify-center lg:justify-start">
            <p className="text-[12px] lg:text-[13px] text-[#6A7282] text-center">
              {isComplete ? (
                <span className="text-[#00A152] font-medium">All required fields completed.</span>
              ) : (
                <span className="text-[#D97706] font-medium">Missing required fields.</span>
              )}
            </p>
            {lastSavedTime && (
              <p className="text-[12px] lg:text-[13px] text-[#6A7282]">
                • Auto saved {formatRelativeTime(lastSavedTime)}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
            <button 
              onClick={() => setIsCancelOpen(true)}
              disabled={isCreating}
              className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 text-[13px] lg:text-[14px] font-bold text-[#B00020] hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveDraft}
              disabled={isCreating}
              className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 text-[13px] lg:text-[14px] font-bold text-[#005EF8] bg-[#E8F0FE] hover:bg-[#D1E0FD] rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {isCreating && !isPublishOpen ? 'Saving...' : 'Save Draft'}
            </button>
            <button 
              onClick={() => setIsPublishOpen(true)}
              disabled={isCreating || !isComplete}
              className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 text-[13px] lg:text-[14px] font-bold text-white bg-[#005EF8] hover:bg-blue-700 rounded-xl transition-colors shadow-md disabled:opacity-50 whitespace-nowrap"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateDealPage;
