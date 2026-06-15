import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import StatCard from '../components/StatCard';
import DealsTable from '../components/DealsTable';
import { useDashboardStats } from '../hooks/useDashboardStats';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';

const DashboardPage = () => {
  const { data: statsResponse, isLoading } = useDashboardStats();
  const stats = statsResponse?.data;

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Admin Deal Manager</h1>
      </div>
      
      {isLoading ? (
        <div className="h-[150px] flex items-center justify-center bg-white rounded-xl border border-[#EBEBEB]">
          <UniversalLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="TOTAL ACTIVE DEALS"
            value={stats?.totalActiveDeals?.toLocaleString() || '0'}
            trend=""
            isPositive={true}
            valueColor="#005EF8"
          />
          <StatCard
            title="AVG. SAVINGS"
            value={`$${stats?.averageSavings?.toFixed(2) || '0.00'}`}
            trend={null}
            valueColor="#00A152"
          />
          <StatCard
            title="EXPIRING DEALS"
            value={stats?.expiringDeals?.toLocaleString() || '0'}
            trend=""
            isPositive={false}
            valueColor="#B00020"
          />
        </div>
      )}
      
      <div>
        <DealsTable />
      </div>
    </div>
  );
};

export default DashboardPage;
