import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import CreateDealForm from '../components/CreateDealForm';
import MobilePreview from '../components/MobilePreview';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';

const CreateDealPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({});
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [successType, setSuccessType] = useState(null); // 'draft' | 'publish' | null

  const handleCancelConfirm = () => {
    setIsCancelOpen(false);
    navigate(ROUTES.DEALS);
  };

  const handlePublishConfirm = () => {
    setIsPublishOpen(false);
    setSuccessType('publish');
  };

  const handleSaveDraft = () => {
    setSuccessType('draft');
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
        confirmText="YES"
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
        <div className="fixed bottom-0 right-0 left-[280px] h-[72px] bg-[#F5F5F5] border-t border-[#EBEBEB] flex items-center justify-between px-8 z-40 shadow-[0_-4px_6px_rgba(0,0,0,0.02)]">
          <p className="text-[13px] text-[#6A7282]">
            All required fields completed. Auto saved 2 mins ago.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCancelOpen(true)}
              className="px-6 py-2.5 text-[14px] font-bold text-[#B00020] hover:bg-red-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveDraft}
              className="px-6 py-2.5 text-[14px] font-bold text-[#005EF8] bg-[#E8F0FE] hover:bg-[#D1E0FD] rounded-xl transition-colors"
            >
              Save as Draft
            </button>
            <button 
              onClick={() => setIsPublishOpen(true)}
              className="px-6 py-2.5 text-[14px] font-bold text-white bg-[#005EF8] hover:bg-blue-700 rounded-xl transition-colors shadow-md"
            >
              Publish Deal
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateDealPage;
