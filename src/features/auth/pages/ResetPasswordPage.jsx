import React from 'react';
import AuthBranding from '../components/AuthBranding';
import ResetPasswordForm from '../components/ResetPasswordForm';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';

const ResetPasswordPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Left panel — branding + illustration */}
      <AuthBranding />

      {/* Right panel */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <div
          className="w-full flex flex-col"
          style={{
            maxWidth: 540,
            gap: 32,
            padding: '16px 16px 29px',
          }}
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 w-full mb-4">
            <img src={logo1} alt="Save Sum Logo 1" className="h-[48px] w-auto object-contain" />
            <img src={logo2} alt="Save Sum Logo 2" className="h-[22px] w-auto object-contain" />
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
