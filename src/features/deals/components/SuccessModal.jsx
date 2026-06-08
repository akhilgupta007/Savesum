import React from 'react';
import { Check } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const isDraft = type === 'draft';
  const title = isDraft ? 'DRAFT SAVED' : 'DEAL PUBLISHED';
  const colorClass = isDraft ? 'bg-[#005EF8]' : 'bg-[#22C55E]';
  const line1 = isDraft ? 'Deal saved as Draft.' : 'Deal has been published.';
  const line2 = isDraft ? 'You can access it in the deals dashboard.' : 'You can track it in the deals dashboard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-[500px] flex flex-col items-center py-12 px-8">
        
        <h2 className="text-[14px] font-bold text-[#0A0A0A] tracking-wider mb-8 uppercase">
          {title}
        </h2>
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-8 ${colorClass}`}>
          <Check size={32} strokeWidth={3} />
        </div>
        
        <div className="text-center">
          <p className="text-[14px] text-[#0A0A0A]">{line1}</p>
          <p className="text-[14px] text-[#0A0A0A]">{line2}</p>
        </div>
        
      </div>
    </div>
  );
};

export default SuccessModal;
