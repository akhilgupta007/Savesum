import React, { useEffect, useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, type }) => {
  const [visible, setVisible] = useState(false);
  const [animateCheck, setAnimateCheck] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const t = setTimeout(() => setAnimateCheck(true), 150);
      return () => clearTimeout(t);
    } else {
      setAnimateCheck(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  const isDraft = type === 'draft';

  const config = isDraft
    ? {
        title: 'Draft Saved',
        subtitle: 'Your deal has been saved as a draft.',
        detail: 'You can access and publish it anytime from the deals dashboard.',
        gradient: 'from-[#005EF8] to-[#3B82F6]',
        ringColor: 'ring-blue-100',
        bgAccent: 'bg-blue-50',
        badge: 'Draft',
        badgeColor: 'bg-[#E8F0FE] text-[#005EF8]',
      }
    : {
        title: 'Deal Published!',
        subtitle: 'Your deal is now live for users to see.',
        detail: 'Track performance and manage it anytime from the deals dashboard.',
        gradient: 'from-[#16A34A] to-[#22C55E]',
        ringColor: 'ring-green-100',
        bgAccent: 'bg-green-50',
        badge: 'Live',
        badgeColor: 'bg-[#DCFCE7] text-[#16A34A]',
      };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center font-inter transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-[440px] max-w-[90vw] overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        {/* Top Gradient Bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6A7282] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="flex flex-col items-center px-8 pt-8 pb-8 gap-6">
          {/* Animated Check Icon */}
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg ring-8 ${config.ringColor} transition-all duration-500 ${animateCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
            >
              <Check
                size={36}
                strokeWidth={3}
                className={`text-white transition-all duration-300 delay-200 ${animateCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${config.badgeColor}`}>
                {config.badge}
              </span>
            </div>
            <h2 className="text-[22px] font-bold text-[#0A0A0A] leading-tight">
              {config.title}
            </h2>
            <p className="text-[14px] text-[#6A7282] leading-relaxed">
              {config.subtitle}
            </p>
            <p className="text-[13px] text-[#9CA3AF]">
              {config.detail}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold text-white bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-opacity shadow-md`}
          >
            View in Dashboard
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
