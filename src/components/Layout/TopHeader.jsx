import React from 'react';
import { Menu } from 'lucide-react';

const TopHeader = ({ leftContent, onMenuClick }) => {
  return (
    <header className="h-[88px] w-full flex items-center justify-between px-4 md:px-8 bg-white border-b border-[#EBEBEB]">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 md:hidden text-[#0A0A0A] hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        {leftContent}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="hidden md:block text-[#0A0A0A] text-sm font-medium font-inter">Admin Panel</span>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
