import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="bg-white rounded-[24px] shadow-2xl w-[520px] p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Icon Circle */}
        <div className="w-[88px] h-[88px] rounded-full bg-[#FFF0F2] flex items-center justify-center mb-6">
          <LogOut size={36} className="text-[#C10015] ml-1" strokeWidth={2} />
        </div>

        {/* Title */}
        <h2 className="text-[26px] font-bold font-inter text-[#0A0A0A] mb-4">
          Log Out
        </h2>

        {/* Subtitle */}
        <p className="text-[16px] text-[#4A4A4A] font-inter mb-10 leading-relaxed max-w-[360px]">
          Are you sure you want to log out?<br/>
          You will need to sign in again to access your trips.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full">
          <button 
            onClick={onClose}
            className="flex-1 bg-[#B1B1B1] hover:bg-[#9CA3AF] text-[#1A1A1A] text-[16px] font-semibold py-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-[#C10015] hover:bg-[#A00012] text-white text-[16px] font-semibold py-4 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogoutModal;
