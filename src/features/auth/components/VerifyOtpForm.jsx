import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { useForgotPassword } from '../hooks/useForgotPassword';

const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 characters'),
});

const VerifyOtpForm = ({ email, onSuccess }) => {
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useForgotPassword();
  
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: '' },
  });

  const onSubmit = (data) => {
    verifyOtp(
      { email, otp: data.otp },
      {
        onSuccess: (res) => {
          toast.success('OTP verified successfully');
          // Expecting res.data.data.resetToken based on Swagger spec
          const resetToken = res.data?.data?.resetToken || res.data?.resetToken;
          if (resetToken) {
            onSuccess(resetToken);
          } else {
            toast.error('Token not found in response');
          }
        },
        onError: (err) => {
          const errorMessage = err.response?.data?.message || 'Invalid or expired OTP';
          toast.error(errorMessage);
          setError('otp', { type: 'manual', message: errorMessage });
        },
      }
    );
  };

  const handleResend = () => {
    if (cooldown > 0 || isResending) return;
    resendOtp(
      { email },
      {
        onSuccess: () => {
          toast.success('OTP resent successfully');
          setCooldown(60);
        },
        onError: (err) => {
          const errorMessage = err.response?.data?.message || 'Failed to resend OTP';
          toast.error(errorMessage);
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
    letterSpacing: '2px',
    textAlign: 'center',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full" style={{ gap: 24 }}>
      <div className="flex flex-col w-full" style={{ gap: 12 }}>
        <h1
          className="w-full text-center"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 500, color: '#0A0A0A', lineHeight: '28px', margin: 0 }}
        >
          Verify OTP
        </h1>
        <p
          className="text-center"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#6A7282', lineHeight: '21px', margin: 0 }}
        >
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <div className="flex flex-col w-full" style={{ gap: 8 }}>
        <label htmlFor="otp" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#0A0A0A', lineHeight: '20px' }}>
          VERIFICATION CODE
        </label>
        <input
          id="otp"
          type="text"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="••••••"
          disabled={isVerifying}
          {...register('otp')}
          style={{ ...inputBase, borderColor: errors.otp ? '#ef4444' : '#D1D5DC' }}
          onFocus={(e) => { e.target.style.borderColor = '#005EF8'; e.target.style.boxShadow = '0 0 0 1px #005EF8'; }}
          onBlur={(e) => { e.target.style.borderColor = errors.otp ? '#ef4444' : '#D1D5DC'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.otp && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444' }}>{errors.otp.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isVerifying}
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
          cursor: isVerifying ? 'not-allowed' : 'pointer',
        }}
      >
        {isVerifying ? 'VERIFYING...' : 'VERIFY CODE'}
      </button>

      <div className="flex justify-center items-center mt-2 w-full">
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: (cooldown > 0 || isResending) ? '#9CA3AF' : '#005EF8',
            fontWeight: 500,
            cursor: (cooldown > 0 || isResending) ? 'not-allowed' : 'pointer',
            padding: 0,
          }}
          className={(cooldown === 0 && !isResending) ? 'hover:underline' : ''}
        >
          {isResending ? 'Sending...' : cooldown > 0 ? `Resend Code in ${cooldown}s` : 'Resend Code'}
        </button>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
