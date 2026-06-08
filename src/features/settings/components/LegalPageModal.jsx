import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const LegalPageModal = ({ isOpen, onClose, pageType }) => {
  if (!isOpen) return null;

  const isPrivacy = pageType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  const initialPrivacyContent = `Effective Date: May 23, 2026

Save Sum ("App", "we", "our", or "us") is a coupon planning and savings organization tool. This Privacy Policy explains how we collect and use information when you use the App. By using Save Sum, you agree to this Privacy Policy.

1. Information We Collect
Information You Provide
We may collect information you provide directly, including name, email address, account password (stored in encrypted form), account login information, coupon and savings data, shopping lists and trip plans, reward tracking information, notes and preferences, and support messages or feedback.

Automatically Collected Information
We may automatically collect device type and operating system, app usage activity (screens viewed and actions taken), crash reports and performance data, IP address, and approximate location based on IP address.

2. How We Use Information
We use collected information to operate and maintain Save Sum, manage accounts, sync user data across devices, store and display trips, deals, and rewards, improve app performance and features, fix bugs, provide customer support, send important notifications, and analyze usage trends.

3. Push Notifications
Save Sum may send notifications including deal alerts, expiring reminders, trip reminders, account updates, and app announcements. Users may disable notifications at any time in device settings.

4. Analytics and Usage Data
We collect usage data such as feature usage, app errors, interaction patterns, and performance metrics to improve the App.`;

  const initialTermsContent = `Effective Date: May 23, 2026

These Terms govern your use of Save Sum. By using the App, you agree to these Terms.

1. Acceptance of Terms
By creating an account or using Save Sum, you agree to these Terms and the Privacy Policy. If you do not agree, you may not use the App.

2. App Purpose
Save Sum is a planning and organization tool designed to help users plan shopping trips, track coupons and deals, organize savings and rewards, and estimate shopping totals. Save Sum does not guarantee pricing, coupons, or retailer outcomes.

3. Eligibility
Users must be at least 13 years old to use Save Sum.

4. Accounts
Users are responsible for providing accurate information, maintaining account security, and all activity under their account. We may suspend or terminate accounts for misuse or violations.

5. User Data and Content
Users may input data such as shopping trips, coupons, rewards, transactions, and savings plans.

Save Sum may securely store and process this data in order to provide core App functionality, including saving, organizing, and syncing user information across devices. Users retain ownership of their personal data. We do not claim ownership of user-submitted content.`;

  const [content, setContent] = useState('');

  // Initialize content when modal opens or pageType changes
  useEffect(() => {
    if (isOpen) {
      setContent(isPrivacy ? initialPrivacyContent : initialTermsContent);
    }
  }, [isOpen, isPrivacy]);

  const handlePublish = () => {
    // Here you would normally dispatch an action or call an API to save the content
    console.log('Publishing content:', content);
    onClose();
  };

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
        <div className="px-8 flex-1 overflow-hidden relative pb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none outline-none text-[15px] text-[#0A0A0A] leading-relaxed custom-scrollbar p-4 border border-[#EBEBEB] rounded-xl focus:border-[#005EF8] focus:ring-1 focus:ring-[#005EF8] transition-colors"
            placeholder="Enter policy content here..."
          />
        </div>

        {/* Footer */}
        <div className="p-8 pt-4 flex justify-end border-t border-transparent">
          <button 
            onClick={handlePublish}
            className="px-10 py-3 bg-[#005EF8] rounded-xl text-[15px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors w-[220px]"
          >
            Publish
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EBEBEB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8C8C8C;
        }
      `}} />
    </div>
  );
};

export default LegalPageModal;
