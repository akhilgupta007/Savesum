import React from 'react';
import { X } from 'lucide-react';

const EditHelpQuestionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[800px] max-w-[90vw] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h2 className="text-[18px] font-semibold text-[#0A0A0A]">Edit Help Question</h2>
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
              defaultValue="How do I add a trip?"
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-medium text-[#0A0A0A]">Answer Content</label>
            <div className="w-full h-[280px] border border-[#EBEBEB] rounded-xl overflow-hidden relative">
              <div className="p-6 flex flex-col gap-8 h-full overflow-y-auto pr-10">
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#005EF8] flex items-center justify-center text-white text-[14px] font-medium shrink-0">1</div>
                  <div className="flex flex-col mt-1">
                    <h4 className="text-[15px] text-[#0A0A0A] font-medium">Open Dashboard</h4>
                    <p className="text-[13px] text-[#8C8C8C] mt-0.5">Go to the Dashboard screen after logging in.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#005EF8] flex items-center justify-center text-white text-[14px] font-medium shrink-0">2</div>
                  <div className="flex flex-col mt-1">
                    <h4 className="text-[15px] text-[#0A0A0A] font-medium">Tap "Create New Trip"</h4>
                    <p className="text-[13px] text-[#8C8C8C] mt-0.5">Select the Create New Trip button.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#005EF8] flex items-center justify-center text-white text-[14px] font-medium shrink-0">3</div>
                  <div className="flex flex-col mt-1">
                    <h4 className="text-[15px] text-[#0A0A0A] font-medium">Enter Trip Details</h4>
                    <p className="text-[13px] text-[#8C8C8C] mt-0.5 leading-snug">Add a trip name such as Weekly CVS Trip or<br/>Walgreens Deals.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#005EF8] flex items-center justify-center text-white text-[14px] font-medium shrink-0">4</div>
                  <div className="flex flex-col mt-1">
                    <h4 className="text-[15px] text-[#0A0A0A] font-medium">Create the Trip</h4>
                    <p className="text-[13px] text-[#8C8C8C] mt-0.5">Tap Save or Create Trip.</p>
                  </div>
                </div>

              </div>
              
              <div className="absolute right-2 top-4 bottom-4 w-1.5 bg-[#F5F5F5] rounded-full">
                <div className="w-full h-[60%] bg-[#8C8C8C] rounded-full"></div>
              </div>
            </div>
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
            className="px-6 py-[10px] bg-[#005EF8] rounded-xl text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHelpQuestionModal;
