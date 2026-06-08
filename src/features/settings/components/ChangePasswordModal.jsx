import React from 'react';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-[500px] max-w-[90vw] overflow-hidden flex flex-col font-inter p-10">
        <h2 className="text-[18px] font-semibold text-[#005EF8] text-center mb-8">Change Password</h2>
        
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#0A0A0A] uppercase">NEW PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#0A0A0A] uppercase">CONFIRM PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-[12px] bg-[#E5E7EB] rounded-xl text-[14px] font-semibold text-[#6B7280] hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-[12px] bg-[#005EF8] rounded-xl text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
