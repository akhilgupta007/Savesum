import React from 'react';
import AuthBranding from '../components/AuthBranding';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
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
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
