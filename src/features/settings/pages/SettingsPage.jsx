import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProfileSettings from '../components/ProfileSettings';
import LegalPages from '../components/LegalPages';

const SettingsPage = () => {
  return (
    <div className="flex flex-col w-full max-w-full pb-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Configuration & Preferences</h1>
      </div>
      <div className="flex flex-col gap-6">
        <ProfileSettings />
        <LegalPages />
      </div>
    </div>
  );
};

export default SettingsPage;
