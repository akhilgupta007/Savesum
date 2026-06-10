import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ChangePasswordModal from './ChangePasswordModal';
import { useGetProfile, useUpdateProfile } from '../hooks/useProfile';
import { Loader2 } from 'lucide-react';

const profileSchema = z.object({
  displayName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
});

const ProfileSettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { data: profileData, isLoading: isFetching } = useGetProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        displayName: profileData.displayName || '',
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
      });
    }
  }, [profileData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('displayName', data.displayName);
    formData.append('email', data.email);
    if (data.phoneNumber) {
      formData.append('phoneNumber', data.phoneNumber);
    }
    
    // If we had a profile picture, we would append it here
    // formData.append('profile', selectedFile);

    updateProfile(formData);
  };

  const handleClear = () => {
    if (profileData) {
      reset({
        displayName: profileData.displayName || '',
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
      });
    } else {
      reset();
    }
  };

  if (isFetching) {
    return (
      <div className="bg-white border border-[#EBEBEB] rounded-xl p-8 flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-[#005EF8] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-xl p-8 font-inter">
      <h2 className="text-[15px] font-semibold text-[#1A1A1A] mb-8 tracking-wide">
        PROFILE SETTINGS
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">

          {/* Full Name */}
          <div className="flex flex-col gap-2.5 min-w-0">
            <label className="text-[14px] font-semibold text-[#333333]">Full Name</label>
            <input
              type="text"
              {...register('displayName')}
              placeholder="Alex Hamilton"
              className={`w-full px-4 py-3 border ${errors.displayName ? 'border-red-500' : 'border-[#EBEBEB]'} rounded-lg text-[16px] md:text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors`}
            />
            {errors.displayName && <span className="text-red-500 text-[12px]">{errors.displayName.message}</span>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2.5 min-w-0">
            <label className="text-[14px] font-semibold text-[#333333]">Email Address</label>
            <input
              type="email"
              {...register('email')}
              placeholder="xyz@mail.com"
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-[#EBEBEB]'} rounded-lg text-[16px] md:text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors`}
            />
            {errors.email && <span className="text-red-500 text-[12px]">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2.5 min-w-0">
            <div className="flex items-center justify-between overflow-hidden">
              <label className="text-[14px] font-semibold text-[#333333] uppercase">Password</label>
              <button
                type="button"
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
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-lg text-[16px] md:text-[15px] text-[#8C8C8C] bg-gray-50 cursor-default focus:outline-none tracking-[0.2em]"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2.5 min-w-0">
            <label className="text-[14px] font-semibold text-[#333333]">Phone (Optional)</label>
            <input
              type="tel"
              {...register('phoneNumber')}
              placeholder="012345678901"
              className={`w-full px-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-[#EBEBEB]'} rounded-lg text-[16px] md:text-[15px] text-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors`}
            />
            {errors.phoneNumber && <span className="text-red-500 text-[12px]">{errors.phoneNumber.message}</span>}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 w-full">
          <button 
            type="button"
            onClick={handleClear}
            className="w-full md:w-auto px-8 py-3 md:py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] font-medium text-[#D10020] hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
          <button 
            type="submit"
            disabled={isUpdating}
            className="w-full flex justify-center items-center gap-2 md:w-auto px-8 py-3 md:py-2.5 bg-[#005EF8] rounded-lg text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Details
          </button>
        </div>
      </form>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSettings;