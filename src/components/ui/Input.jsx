import React, { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && (
          <label className="text-sm font-medium text-[#0A0A0A]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full h-[49px] rounded-xl border-[0.8px] bg-white px-4 text-base text-[#0A0A0A] placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-[#D1D5DC]'
            } ${rightIcon ? 'pr-12' : ''}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
