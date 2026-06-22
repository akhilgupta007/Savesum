import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'flex items-center justify-center w-full h-[52px] rounded-xl text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary:
      'bg-[#005EF8] text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed',
    outline:
      'border border-[#D1D5DC] text-[#0A0A0A] bg-transparent hover:bg-gray-50 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
