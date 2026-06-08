import React from 'react';
import AuthBranding from '../components/AuthBranding';
import LoginForm from '../components/LoginForm';

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
        {/*
          Inner container: max-w matches Figma 540px width.
          The vertical centering approximates the Figma top:288px
          within a 1024px height panel (288 / 1024 ≈ 28% from top).
          We use pt-[28%] to mimic this without fixed positioning.
        */}
        <div
          className="w-full flex flex-col"
          style={{
            maxWidth: 540,
            gap: 32,
            padding: '16px 16px 29px',
          }}
        >
          <LoginForm />
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
