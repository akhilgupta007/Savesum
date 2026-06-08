import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileSettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-xl p-8 font-inter">
      <h2 className="text-[15px] font-semibold text-[#1A1A1A] mb-8 tracking-wide">
        PROFILE SETTINGS
      </h2>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8">

        {/* Full Name */}
        <div className="flex flex-col gap-2.5 min-w-0">
          <label className="text-[14px] font-semibold text-[#333333]">Full Name</label>
          <input
            type="text"
            defaultValue="Alex Hamilton"
            className="w-full px-4 py-3 border border-[#EBEBEB] rounded-lg text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2.5 min-w-0">
          <label className="text-[14px] font-semibold text-[#333333]">Email Address</label>
          <input
            type="email"
            defaultValue="xyz@mail.com"
            className="w-full px-4 py-3 border border-[#EBEBEB] rounded-lg text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2.5 min-w-0">
          <div className="flex items-center justify-between overflow-hidden">
            <label className="text-[14px] font-semibold text-[#333333] uppercase">Password</label>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-[14px] font-medium text-[#005EF8] hover:underline flex-shrink-0 ml-2"
            >
              Change
            </button>
          </div>
          <input
            type="password"
            defaultValue="*********"
            readOnly
            className="w-full px-4 py-3 border border-[#EBEBEB] rounded-lg text-[15px] text-[#8C8C8C] bg-white cursor-default focus:outline-none tracking-[0.2em]"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2.5 min-w-0">
          <label className="text-[14px] font-semibold text-[#333333]">Phone (Optional)</label>
          <input
            type="tel"
            defaultValue="012345678901"
            className="w-full px-4 py-3 border border-[#EBEBEB] rounded-lg text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
          />
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button className="px-8 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] font-medium text-[#D10020] hover:bg-red-50 transition-colors">
          Clear All
        </button>
        <button className="px-8 py-2.5 bg-[#005EF8] rounded-lg text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors">
          Update Details
        </button>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSettings;