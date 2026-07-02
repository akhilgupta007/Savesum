import React, { useState, useMemo } from 'react';
import AnalyticsHeader from '../components/AnalyticsHeader';
import StatCard from '../components/StatCard';
import MostUsedDeals from '../components/MostUsedDeals';
import { useAnalyticsStats } from '../hooks/useAnalyticsStats';
import Skeleton from '@/components/shared/Skeleton/Skeleton';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { downloadCsv } from '@/utils/exportCsv';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const { data: stats, isLoading: isStatsLoading, isError } = useAnalyticsStats();
  const [currentFilters, setCurrentFilters] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter and search deals
  const filteredDeals = useMemo(() => {
    if (!stats?.mostUsedDeals) return [];

    let filtered = [...stats.mostUsedDeals];

    // Apply store filters
    if (currentFilters?.stores) {
      const selectedStores = Object.entries(currentFilters.stores)
        .filter(([_, checked]) => checked)
        .map(([id]) => id);
      
      if (selectedStores.length > 0) {
        filtered = filtered.filter(deal => selectedStores.includes(deal.storeId));
      }
    }

    // Apply reward type filters
    if (currentFilters?.rewardTypes) {
      const selectedRewards = Object.entries(currentFilters.rewardTypes)
        .filter(([_, checked]) => checked)
        .map(([name]) => name);
      
      if (selectedRewards.length > 0) {
        filtered = filtered.filter(deal => selectedRewards.includes(deal.rewardType));
      }
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(deal => 
        (deal.productName?.toLowerCase().includes(query)) ||
        (deal.storeName?.toLowerCase().includes(query))
      );
    }

    // Apply sort
    if (currentFilters?.sortBy) {
      switch (currentFilters.sortBy) {
        case 'Value (high - low)':
          filtered.sort((a, b) => (b.couponAmount || 0) - (a.couponAmount || 0));
          break;
        case 'Value (low - high)':
          filtered.sort((a, b) => (a.couponAmount || 0) - (b.couponAmount || 0));
          break;
        case 'Newest first':
          filtered.sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
          break;

        default:
          break;
      }
    }

    return filtered;
  }, [stats?.mostUsedDeals, currentFilters, searchQuery]);

  const isLoading = isStatsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-full pb-8">
        <AnalyticsHeader onExport={handleExport} />
        {/* Skeleton Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
        </div>
        {/* Skeleton Table Container */}
        <div className="w-full">
          <Skeleton className="h-[400px] rounded-xl w-full bg-white border border-[#EBEBEB]" />
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
      <AnalyticsHeader 
        onExport={handleExport}
        onSearchChange={setSearchQuery}
        currentSearch={searchQuery}
      />
      
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
        <MostUsedDeals deals={filteredDeals} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
