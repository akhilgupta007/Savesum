import React from 'react';
import { X } from 'lucide-react';

const NewHelpQuestionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[800px] max-w-[90vw] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h2 className="text-[18px] font-semibold text-[#0A0A0A]">New Help Question</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-medium text-[#0A0A0A]">Question Title</label>
            <input 
              type="text" 
              placeholder="e.g. How do I reset my account password?"
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-medium text-[#0A0A0A]">Answer Content</label>
            <textarea 
              className="w-full h-[280px] px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#EBEBEB]">
          <button 
            onClick={onClose}
            className="px-6 py-[10px] border border-[#EBEBEB] rounded-xl text-[14px] font-medium text-[#D10020] hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-[10px] border border-[#EBEBEB] rounded-xl text-[14px] font-medium text-[#005EF8] hover:bg-blue-50 transition-colors"
          >
            Save as Draft
          </button>
          <button 
            className="px-6 py-[10px] bg-[#005EF8] rounded-xl text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewHelpQuestionModal;
