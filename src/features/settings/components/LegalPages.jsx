import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import LegalPageModal from './LegalPageModal';
import { usePrivacyPolicy, useTerms } from '../hooks/useLegalPages';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';

const LegalPages = () => {
  const [activeModal, setActiveModal] = useState(null); // activeModal is now the full page object

  const { data: privacyRes, isLoading: isPrivacyLoading } = usePrivacyPolicy();
  const { data: termsRes, isLoading: isTermsLoading } = useTerms();

  const privacyData = privacyRes?.data?.data || {};
  const termsData = termsRes?.data?.data || {};

  const formatDate = (isoString) => {
    if (!isoString) return 'Not Published';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const pages = [
    { 
      id: 'privacy', 
      title: 'Privacy Policy', 
      status: privacyData.privacyPolicy ? 'Published' : 'Draft', 
      date: formatDate(privacyData.lastUpdated),
      content: privacyData.privacyPolicy || ''
    },
    { 
      id: 'terms', 
      title: 'Terms & Conditions', 
      status: termsData.termsAndConditions ? 'Published' : 'Draft', 
      date: formatDate(termsData.lastUpdated),
      content: termsData.termsAndConditions || ''
    }
  ];

  if (isPrivacyLoading || isTermsLoading) {
    return (
      <div className="bg-white border border-[#EBEBEB] rounded-2xl p-8 shadow-sm font-inter">
        <h2 className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wide mb-8">LEGAL PAGES</h2>
        <UniversalLoader />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-8 shadow-sm font-inter">
      <h2 className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wide mb-8">LEGAL PAGES</h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-[#EBEBEB]">
              <th className="pb-4 text-[13px] font-medium text-[#8C8C8C] w-[40%] font-normal">Page Type</th>
              <th className="pb-4 text-[13px] font-medium text-[#8C8C8C] w-[20%] text-center font-normal">Status</th>
              <th className="pb-4 text-[13px] font-medium text-[#8C8C8C] w-[20%] text-center font-normal">Last Updated</th>
              <th className="pb-4 text-[13px] font-medium text-[#8C8C8C] w-[20%] text-right pr-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-[#EBEBEB] last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-6 text-[14px] font-medium text-[#0A0A0A]">{page.title}</td>
                <td className="py-6 text-center">
                  <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-medium bg-[#C7F0D9] text-[#10B981] min-w-[100px]">
                    {page.status}
                  </span>
                </td>
                <td className="py-6 text-[14px] text-[#005EF8] font-medium text-center">{page.date}</td>
                <td className="py-6 text-right pr-4">
                  <button 
                    onClick={() => setActiveModal(page)}
                    className="p-2 -mr-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors inline-flex justify-end"
                  >
                    <Edit2 size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeModal && (
        <LegalPageModal 
          isOpen={!!activeModal} 
          onClose={() => setActiveModal(null)}
          pageType={activeModal.id}
          initialContent={activeModal.content}
        />
      )}
    </div>
  );
};

export default LegalPages;
