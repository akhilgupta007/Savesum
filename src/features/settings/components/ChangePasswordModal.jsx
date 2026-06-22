import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useChangePassword } from '../hooks/useProfile';
import { Loader2 } from 'lucide-react';

const passwordSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { mutate: changePassword, isPending, isSuccess, reset: resetMutation } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      resetMutation();
      onClose();
    }
  }, [isSuccess, onClose, reset, resetMutation]);

  const handleClose = () => {
    reset();
    resetMutation();
    onClose();
  };

  const onSubmit = (data) => {
    changePassword({ password: data.password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-[500px] max-w-[90vw] overflow-hidden flex flex-col font-inter p-10">
        <h2 className="text-[18px] font-semibold text-[#005EF8] text-center mb-8">Change Password</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#0A0A0A] uppercase">NEW PASSWORD</label>
            <input 
              type="password" 
              {...register('password')}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-[#EBEBEB]'} rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors`}
            />
            {errors.password && <span className="text-red-500 text-[12px]">{errors.password.message}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#0A0A0A] uppercase">CONFIRM PASSWORD</label>
            <input 
              type="password" 
              {...register('confirmPassword')}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#EBEBEB]'} rounded-xl text-[14px] text-[#0A0A0A] focus:outline-none focus:border-[#005EF8] transition-colors`}
            />
            {errors.confirmPassword && <span className="text-red-500 text-[12px]">{errors.confirmPassword.message}</span>}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button 
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 py-[12px] bg-[#E5E7EB] rounded-xl text-[14px] font-semibold text-[#6B7280] hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isPending}
              className="flex-1 flex justify-center items-center gap-2 py-[12px] bg-[#005EF8] rounded-xl text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors disabled:opacity-70"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
