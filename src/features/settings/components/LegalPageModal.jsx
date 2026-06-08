import React from 'react';
import { X } from 'lucide-react';

const LegalPageModal = ({ isOpen, onClose, pageType }) => {
  if (!isOpen) return null;

  const isPrivacy = pageType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[900px] h-[85vh] max-h-[800px] max-w-[95vw] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <h2 className="text-[20px] font-bold text-[#0A0A0A]">{title}</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 flex-1 overflow-hidden relative">
          <div className="h-full overflow-y-auto pr-8 flex flex-col gap-6 pb-6 custom-scrollbar">
            <p className="text-[14px] font-medium text-[#0A0A0A]">
              Effective Date: May 23, 2026
            </p>
            
            {isPrivacy ? (
              <>
                <p className="text-[14px] text-[#0A0A0A] leading-relaxed">
                  Save Sum ("App", "we", "our", or "us") is a coupon planning and savings organization tool. This Privacy Policy explains how we collect and use information when you use the App. By using Save Sum, you agree to this Privacy Policy.
                </p>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">1. Information We Collect</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    <span className="font-medium">Information You Provide</span><br/>
                    We may collect information you provide directly, including name, email address, account password (stored in encrypted form), account login information, coupon and savings data, shopping lists and trip plans, reward tracking information, notes and preferences, and support messages or feedback.
                  </p>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-4">
                    <span className="font-medium">Automatically Collected Information</span><br/>
                    We may automatically collect device type and operating system, app usage activity (screens viewed and actions taken), crash reports and performance data, IP address, and approximate location based on IP address.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">2. How We Use Information</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    We use collected information to operate and maintain Save Sum, manage accounts, sync user data across devices, store and display trips, deals, and rewards, improve app performance and features, fix bugs, provide customer support, send important notifications, and analyze usage trends.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">3. Push Notifications</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    Save Sum may send notifications including deal alerts, expiring reminders, trip reminders, account updates, and app announcements. Users may disable notifications at any time in device settings.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">4. Analytics and Usage Data</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    We collect usage data such as feature usage, app errors, interaction patterns, and performance metrics to improve the App.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-[14px] text-[#0A0A0A] leading-relaxed">
                  These Terms govern your use of Save Sum. By using the App, you agree to these Terms.
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">1. Acceptance of Terms</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    By creating an account or using Save Sum, you agree to these Terms and the Privacy Policy. If you do not agree, you may not use the App.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">2. App Purpose</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    Save Sum is a planning and organization tool designed to help users plan shopping trips, track coupons and deals, organize savings and rewards, and estimate shopping totals. Save Sum does not guarantee pricing, coupons, or retailer outcomes.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">3. Eligibility</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    Users must be at least 13 years old to use Save Sum.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">4. Accounts</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    Users are responsible for providing accurate information, maintaining account security, and all activity under their account. We may suspend or terminate accounts for misuse or violations.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">5. User Data and Content</h3>
                  <p className="text-[14px] text-[#0A0A0A] leading-relaxed mt-2">
                    Users may input data such as shopping trips, coupons, rewards, transactions, and savings plans.<br/><br/>
                    Save Sum may securely store and process this data in order to provide core App functionality, including saving, organizing, and syncing user information across devices. Users retain ownership of their personal data. We do not claim ownership of user-submitted content.
                  </p>
                </div>
              </>
            )}
          </div>
          
          <div className="absolute right-2 top-0 bottom-4 w-1.5 bg-[#EBEBEB] rounded-full">
            <div className="w-full h-[40%] bg-[#8C8C8C] rounded-full"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-6 flex justify-end border-t border-transparent">
          <button 
            className="px-10 py-3 bg-[#005EF8] rounded-xl text-[15px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors w-[220px]"
          >
            Publish
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default LegalPageModal;
