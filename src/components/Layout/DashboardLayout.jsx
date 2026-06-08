import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const DashboardLayout = ({ children, headerLeftContent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex w-full min-h-screen bg-[#F5F5F5] relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader 
          leftContent={headerLeftContent} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div ref={scrollRef} className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
