import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import AnalyticsHeader from '../components/AnalyticsHeader';
import StatCard from '../components/StatCard';
import MostUsedDeals from '../components/MostUsedDeals';
import PopularItems from '../components/PopularItems';

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col w-full max-w-full pb-8">
      <AnalyticsHeader />
      
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <StatCard 
          title="TOTAL CLICKS"
          valueNode={<span className="text-[32px] font-bold text-[#005EF8]">842,109</span>}
          subtextNode={
            <>
              <span className="text-[#10B981]">+12.5%</span> <span className="text-[#8C8C8C]">from last week</span>
            </>
          }
        />
        <StatCard 
          title="MOST POPULAR STORE"
          valueNode={<span className="text-[32px] font-bold text-[#10B981]">CVS</span>}
          subtextNode={<span className="text-[#8C8C8C]">24.2k redemptions</span>}
        />
        <StatCard 
          title="USER GROWTH"
          valueNode={<span className="text-[32px] font-bold text-[#005EF8]">12.8k</span>}
          subtextNode={<span className="text-[#8C8C8C]">+4.2% from last week</span>}
        />
      </div>

      {/* Bottom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <MostUsedDeals />
        <PopularItems />
      </div>
    </div>
  );
};

export default AnalyticsPage;
