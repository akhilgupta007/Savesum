import React from 'react';

const DeleteQuestionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-[500px] max-w-[90vw] p-10 flex flex-col font-inter">
        <h2 className="text-[18px] font-bold text-[#0A0A0A] text-center mb-6">DELETE QUESTION ?</h2>
        
        <p className="text-[15px] text-[#0A0A0A] text-center leading-relaxed mb-10">
          This action will remove the help question from the<br />
          user's help center. You cannot undo this action
        </p>
        
        <div className="flex items-center justify-center gap-4 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-[12px] border border-[#EBEBEB] rounded-xl text-[15px] font-semibold text-[#D10020] hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-[12px] bg-[#B00020] rounded-xl text-[15px] font-semibold text-white hover:bg-[#90001A] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestionModal;
