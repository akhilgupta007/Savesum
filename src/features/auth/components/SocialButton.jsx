import React from 'react';

const SocialButton = ({ provider, iconSrc, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        height: 47,
        border: '0.8px solid #D1D5DC',
        borderRadius: 12,
      }}
    >
      <img src={iconSrc} alt={`${provider} icon`} className="w-5 h-5 object-contain" />
      <span
        className="font-medium text-[#0A0A0A]"
        style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: '21px' }}
      >
        {provider}
      </span>
    </button>
  );
};

export default SocialButton;
