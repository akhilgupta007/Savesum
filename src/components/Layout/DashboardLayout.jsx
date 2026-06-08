import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const DashboardLayout = ({ children, headerLeftContent }) => {
  return (
    <div className="flex w-full min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader leftContent={headerLeftContent} />
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
