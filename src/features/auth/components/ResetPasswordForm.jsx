import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ROUTES } from '@/constants/routes.constants';
import { useResetPassword } from '../hooks/useResetPassword';

const resetPasswordSchema = z.object({
  password: z.string().min(1, 'Password is required')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const ResetPasswordForm = ({ token }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (data) => {
    resetPassword(
      { token, password: data.password },
      {
        onSuccess: () => {
          toast.success('Password reset successfully');
          navigate(ROUTES.LOGIN, { replace: true });
        },
        onError: (err) => {
          const errorMessage = err.response?.data?.message || 'Failed to reset password';
          toast.error(errorMessage);
          setError('confirmPassword', { type: 'manual', message: errorMessage });
        },
      }
    );
  };

  const inputBase = {
    height: 49,
    borderWidth: '0.8px',
    borderStyle: 'solid',
    borderRadius: 12,
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    color: '#0A0A0A',
    backgroundColor: '#FFFFFF',
    outline: 'none',
    width: '100%',
    padding: '0 16px',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full" style={{ gap: 24 }}>
      <div className="flex flex-col w-full" style={{ gap: 12 }}>
        <h1 className="w-full text-center" style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 500, color: '#0A0A0A', lineHeight: '28px', margin: 0 }}>
          Reset Password
        </h1>
        <p className="text-center" style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A7282', lineHeight: '21px', margin: 0 }}>
          Please enter your new password below.
        </p>
      </div>

      <div className="flex flex-col w-full" style={{ gap: 8 }}>
        <label htmlFor="password" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#0A0A0A', lineHeight: '20px' }}>
          NEW PASSWORD
        </label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={isPending}
            {...register('password')}
            style={{ ...inputBase, borderColor: errors.password ? '#ef4444' : '#D1D5DC', paddingRight: 48 }}
            onFocus={(e) => { e.target.style.borderColor = '#005EF8'; e.target.style.boxShadow = '0 0 0 1px #005EF8'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.password ? '#ef4444' : '#D1D5DC'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {errors.password && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444' }}>{errors.password.message}</span>}
      </div>

      <div className="flex flex-col w-full" style={{ gap: 8 }}>
        <label htmlFor="confirmPassword" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#0A0A0A', lineHeight: '20px' }}>
          CONFIRM PASSWORD
        </label>
        <div className="relative w-full">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={isPending}
            {...register('confirmPassword')}
            style={{ ...inputBase, borderColor: errors.confirmPassword ? '#ef4444' : '#D1D5DC', paddingRight: 48 }}
            onFocus={(e) => { e.target.style.borderColor = '#005EF8'; e.target.style.boxShadow = '0 0 0 1px #005EF8'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#D1D5DC'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {errors.confirmPassword && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444' }}>{errors.confirmPassword.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EF8] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          height: 52,
          backgroundColor: '#005EF8',
          borderRadius: 12,
          border: 'none',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: '#FFFFFF',
          lineHeight: '20px',
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? 'RESETTING...' : 'RESET PASSWORD'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
