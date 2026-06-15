import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import AnalyticsHeader from '../components/AnalyticsHeader';
import StatCard from '../components/StatCard';
import MostUsedDeals from '../components/MostUsedDeals';
import PopularItems from '../components/PopularItems';
import { useAnalyticsStats } from '../hooks/useAnalyticsStats';

const AnalyticsPage = () => {
  const { data: stats, isLoading, isError } = useAnalyticsStats();

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-full pb-8">
        <AnalyticsHeader />
        <div className="flex items-center justify-center h-64">
          <p className="text-[#8C8C8C]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col w-full max-w-full pb-8">
        <AnalyticsHeader />
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Failed to load analytics data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-full pb-8">
      <AnalyticsHeader />
      
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <StatCard 
          title="TOTAL CLICKS"
          valueNode={<span className="text-[32px] font-bold text-[#005EF8]">{stats.totalClicks?.toLocaleString() || 0}</span>}
        />
        <StatCard 
          title="MOST POPULAR STORE"
          valueNode={<span className="text-[32px] font-bold text-[#10B981]">{stats.mostPopularStore?.name || 'N/A'}</span>}
        />
        <StatCard 
          title="USER GROWTH"
          valueNode={<span className="text-[32px] font-bold text-[#005EF8]">{stats.userGrowth?.toLocaleString() || 0}</span>}
        />
      </div>

      {/* Bottom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <MostUsedDeals deals={stats.mostUsedDeals || []} />
        <PopularItems />
      </div>
    </div>
  );
};

export default AnalyticsPage;
