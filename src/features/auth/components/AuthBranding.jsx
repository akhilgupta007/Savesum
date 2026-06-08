import React from 'react';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';
import shoppingIllustration from '@/assets/shopping-illustration.svg';

/**
 * AuthBranding — Left panel for Figma node 434:1727
 *
 * Figma specs (434:1774 "Frame 2147230010"):
 *   width: 720px, height: 1024px, bg: rgba(69, 153, 255, 0.1)
 *
 * Logo (719:3378): 210×63px at top-left (left:30, top:52)
 * Illustration (434:1947): 593×442px centred in panel (left:63, top:305 → vertically centred)
 * Decorative circle (434:2465): 347×333px at (-99, -166)
 * Blue glow (434:2466): 656×126px at bottom, blur 200px
 */
const AuthBranding = () => {
  return (
    <div
      className="relative hidden lg:flex w-1/2 min-h-screen overflow-hidden flex-col"
      style={{ backgroundColor: 'rgba(69, 153, 255, 0.1)' }}
    >
      {/* Decorative circle — top-left, partially off-screen */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 347,
          height: 333,
          left: -99,
          top: -166,
          backgroundColor: 'rgba(69, 153, 255, 0.05)',
          borderRadius: 999,
        }}
      />

      {/* Blue glow at bottom */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '91%',
          height: 126,
          left: 21,
          bottom: '10%',
          backgroundColor: 'rgba(69, 153, 255, 0.8)',
          filter: 'blur(200px)',
        }}
      />

      {/* Logo — fixed at top, not scrolled */}
      <div className="flex items-center gap-3" style={{ padding: '32px 30px 0' }}>
        <img
          src={logo1}
          alt="Save Sum Logo 1"
          style={{ height: 60, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
        <img
          src={logo2}
          alt="Save Sum Logo 2"
          style={{ height: 28, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* Illustration — vertically centred in remaining space */}
      <div className="flex flex-1 items-center justify-center" style={{ padding: '0 20px' }}>
        <img
          src={shoppingIllustration}
          alt="Shopping illustration"
          style={{
            width: '85%',
            maxWidth: 593,
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

export default AuthBranding;
