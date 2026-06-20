import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div 
      className={`animate-pulse bg-[#EBEBEB] rounded ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
