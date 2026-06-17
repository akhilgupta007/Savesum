import React from 'react';
import AnalyticsHeader from '../components/AnalyticsHeader';
import StatCard from '../components/StatCard';
import MostUsedDeals from '../components/MostUsedDeals';
import { useAnalyticsStats } from '../hooks/useAnalyticsStats';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { downloadCsv } from '@/utils/exportCsv';

const AnalyticsPage = () => {
  const { data: stats, isLoading, isError } = useAnalyticsStats();

  const handleExport = () => {
    if (!stats) {
      toast.error('No analytics data available to export');
      return;
    }

    const rows = [
      ['Savesum Analytics Report'],
      ['Exported At', dayjs().format('YYYY-MM-DD HH:mm')],
      [],
      ['Overview'],
      ['Metric', 'Value'],
      ['Total Clicks', stats.totalClicks ?? 0],
      ['Most Popular Store', stats.mostPopularStore?.name || 'N/A'],
      ['User Growth', stats.userGrowth ?? 0],
    ];

    if (stats.mostUsedDeals?.length) {
      rows.push(
        [],
        ['Most Used Deals'],
        ['Item Details', 'Store', 'Coupon Amount', 'Use Count'],
      );

      stats.mostUsedDeals.forEach((deal) => {
        rows.push([
          deal.productName || '—',
          deal.storeName || '—',
          Number(deal.couponAmount || 0).toFixed(2),
          deal.useCount || 0,
        ]);
      });
    }

    downloadCsv(`analytics-report-${dayjs().format('YYYY-MM-DD_HH-mm')}.csv`, rows);
    toast.success('Analytics report exported as CSV');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-full pb-8">
        <AnalyticsHeader onExport={handleExport} />
        <UniversalLoader />
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
      <AnalyticsHeader onExport={handleExport} />
      
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
      <div className="w-full">
        <MostUsedDeals deals={stats.mostUsedDeals || []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
