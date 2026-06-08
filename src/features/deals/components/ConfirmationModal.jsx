import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, title, description, confirmText, cancelText = 'Cancel', onConfirm, confirmColor = 'blue' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[500px] mx-4 flex flex-col p-8 items-center text-center">
        
        <h2 className="text-[16px] font-bold text-[#0A0A0A] uppercase mb-4">
          {title}
        </h2>
        
        <p className="text-[15px] text-[#0A0A0A] leading-relaxed mb-8 max-w-[380px]">
          {description}
        </p>

        <div className="flex items-center gap-4 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border border-[#B00020] text-[#B00020] rounded-xl text-[14px] font-semibold hover:bg-red-50 transition-colors uppercase"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-3 text-white rounded-xl text-[14px] font-semibold transition-colors uppercase ${
              confirmColor === 'red' 
                ? 'bg-[#B00020] hover:bg-red-800' 
                : 'bg-[#005EF8] hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ConfirmationModal;
