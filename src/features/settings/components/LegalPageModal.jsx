import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdatePrivacyPolicy, useUpdateTerms } from '../hooks/useLegalPages';

const LegalPageModal = ({ isOpen, onClose, pageType, initialContent }) => {
  if (!isOpen) return null;

  const isPrivacy = pageType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  const [content, setContent] = useState('');

  const updatePrivacyPolicy = useUpdatePrivacyPolicy();
  const updateTerms = useUpdateTerms();

  const isPending = updatePrivacyPolicy.isPending || updateTerms.isPending;

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || '');
    }
  }, [isOpen, initialContent]);

  const handlePublish = () => {
    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    const payload = { text: content };

    if (isPrivacy) {
      updatePrivacyPolicy.mutate(payload, {
        onSuccess: () => {
          toast.success('Privacy policy updated successfully');
          onClose();
        },
        onError: (err) => {
          const errorMessage = err.response?.data?.message || 'Failed to update privacy policy';
          toast.error(errorMessage);
        }
      });
    } else {
      updateTerms.mutate(payload, {
        onSuccess: () => {
          toast.success('Terms updated successfully');
          onClose();
        },
        onError: (err) => {
          const errorMessage = err.response?.data?.message || 'Failed to update terms and conditions';
          toast.error(errorMessage);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[900px] h-[85vh] max-h-[800px] max-w-[95vw] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <h2 className="text-[20px] font-bold text-[#0A0A0A]">{title}</h2>
          <button onClick={onClose} disabled={isPending} className="text-[#0A0A0A] hover:bg-gray-100 p-1 rounded-full transition-colors disabled:opacity-50">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 flex-1 overflow-hidden relative pb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPending}
            className="w-full h-full resize-none outline-none text-[15px] text-[#0A0A0A] leading-relaxed custom-scrollbar p-4 border border-[#EBEBEB] rounded-xl focus:border-[#005EF8] focus:ring-1 focus:ring-[#005EF8] transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Enter policy content here..."
          />
        </div>

        {/* Footer */}
        <div className="p-8 pt-4 flex justify-end border-t border-transparent">
          <button 
            onClick={handlePublish}
            disabled={isPending}
            className="px-10 py-3 bg-[#005EF8] rounded-xl text-[15px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors w-[220px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? 'Publishing...' : 'Publish'}
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
