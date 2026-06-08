import React from 'react';
import AuthBranding from '../components/AuthBranding';
import LoginForm from '../components/LoginForm';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';

/**
 * LoginPage — Figma node 434:1727 "Log in"
 *
 * Right panel (716:809):
 *   width: 720px, height: 1024px
 *
 * Inner container (716:618):
 *   width: 540px, height: 448px
 *   position: absolute, left: 90px, top: 288px
 *   flexDirection: column, gap: 32px
 *   padding: 16px 16px 29px
 *
 * This design has NO social login section — just heading + form.
 */
const LoginPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">

      {/* Left panel — branding + illustration */}
      <AuthBranding />

      {/* Right panel — vertically centred at approx 288px from top */}
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

          <LoginForm />
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
