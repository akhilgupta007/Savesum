import React from 'react';
import { Bell } from 'lucide-react';

const TopHeader = ({ leftContent }) => {
  return (
    <header className="h-[88px] w-full flex items-center justify-between px-8 bg-white border-b border-[#EBEBEB]">
      <div>
        {leftContent}
      </div>
      
      <div className="flex items-center gap-6">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#EBEBEB] text-[#0A0A0A] hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-3">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-[#0A0A0A] text-sm font-medium font-inter">Admin Panel</span>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
