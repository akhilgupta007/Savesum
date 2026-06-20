import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import StatCard from '../components/StatCard';
import DealsTable from '../components/DealsTable';
import { useDashboardStats } from '../hooks/useDashboardStats';
import Skeleton from '@/components/shared/Skeleton/Skeleton';

const DashboardPage = () => {
  const { data: statsResponse, isLoading } = useDashboardStats();
  const stats = statsResponse?.data;

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Admin Deal Manager</h1>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
          <Skeleton className="h-[140px] rounded-2xl w-full bg-white border border-[#EBEBEB] shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
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
