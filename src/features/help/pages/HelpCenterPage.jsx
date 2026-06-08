import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import NewHelpQuestionModal from '../components/NewHelpQuestionModal';
import EditHelpQuestionModal from '../components/EditHelpQuestionModal';
import DeleteQuestionModal from '../components/DeleteQuestionModal';

const mockQuestions = [
  { id: 1, title: 'How do I add a trip?', status: 'Published', date: '02 Jun 2026' },
  { id: 2, title: 'How do rewards work?', status: 'Published', date: '02 Jun 2026' },
  { id: 3, title: 'How do I use coupons?', status: 'Published', date: '02 Jun 2026' },
  { id: 4, title: 'Why is a reward not working?', status: 'Published', date: '02 Jun 2026' },
  { id: 5, title: 'How do I sync my data?', status: 'Published', date: '02 Jun 2026' },
];

const HelpCenterPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full max-w-full pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-semibold text-[#0A0A0A]">Help Question List</h1>
            <p className="text-[14px] text-[#8C8C8C] font-inter mt-1 font-medium">
              Manage and organize frequently asked questions for your customer knowledge base.
            </p>
          </div>
        </div>
        <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-[#6A7282]" />
              </div>
              <input
                type="text"
                placeholder="Search for articles, guides, or topics..."
                className="pl-11 pr-4 py-[10px] border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#005EF8] w-[360px] font-inter transition-colors"
              />
            </div>
            <button 
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-2 px-5 py-[10px] bg-[#005EF8] rounded-xl text-[14px] text-white font-medium font-inter hover:bg-[#005EF8]/90 transition-colors"
            >
              <Plus size={16} />
              Add New Question
            </button>
          </div>

          <table className="w-full text-left border-collapse font-inter">
            <thead>
              <tr className="border-b border-[#EBEBEB]">
                <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[40%]">Question Title</th>
                <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-center">Status</th>
                <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-center">Last Updated</th>
                <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockQuestions.map((q) => (
                <tr key={q.id} className="border-b border-[#EBEBEB] last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 text-[14px] font-medium text-[#0A0A0A] pr-4">{q.title}</td>
                  <td className="py-6 text-center">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-semibold bg-[#C7F0D9] text-[#10B981] min-w-[90px]">
                      {q.status}
                    </span>
                  </td>
                  <td className="py-6 text-[14px] text-[#005EF8] font-medium text-center">{q.date}</td>
                  <td className="py-6">
                    <div className="flex items-center justify-end gap-6 pr-2">
                      <button onClick={() => setIsEditModalOpen(true)} className="text-[#6A7282] hover:text-[#0A0A0A] transition-colors">
                        <Edit2 size={18} strokeWidth={2} />
                      </button>
                      <button onClick={() => setIsDeleteModalOpen(true)} className="text-[#EF4444] hover:text-[#DC2626] transition-colors">
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewHelpQuestionModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
      <EditHelpQuestionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteQuestionModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </>
  );
};

export default HelpCenterPage;
