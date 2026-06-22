import React from 'react';

const Divider = ({ children }) => {
  if (!children) {
    return <hr className="border-[#D1D5DC] w-full" />;
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-[1px] bg-[#D1D5DC]"></div>
      <span className="text-sm text-[#6A7282] uppercase tracking-wide">
        {children}
      </span>
      <div className="flex-1 h-[1px] bg-[#D1D5DC]"></div>
    </div>
  );
};

export default Divider;
