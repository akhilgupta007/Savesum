import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import NewHelpQuestionModal from '../components/NewHelpQuestionModal';
import EditHelpQuestionModal from '../components/EditHelpQuestionModal';
import DeleteQuestionModal from '../components/DeleteQuestionModal';
import { useHelpQuestions } from '../hooks/useHelpQuestions';
import dayjs from 'dayjs';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';

const HelpCenterPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: response, isLoading } = useHelpQuestions();
  const questions = response?.data || [];

  const filteredQuestions = questions.filter(q =>
    q.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-[#6A7282]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, guides, or topics..."
                className="pl-11 pr-4 py-3 md:py-[10px] border border-[#EBEBEB] rounded-xl text-[16px] md:text-[14px] text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#005EF8] w-full md:w-[360px] font-inter transition-colors"
              />
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 md:py-[10px] bg-[#005EF8] rounded-xl text-[14px] text-white font-medium font-inter hover:bg-[#005EF8]/90 transition-colors w-full md:w-auto"
            >
              <Plus size={16} />
              Add New Question
            </button>
          </div>

          <div className="w-full overflow-x-auto min-h-[300px]">
            {isLoading ? (
              <UniversalLoader />
            ) : filteredQuestions.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-[#8C8C8C]">
                No questions found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse font-inter min-w-[500px]">
                <thead>
                  <tr className="border-b border-[#EBEBEB]">
                    <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[40%]">Question Title</th>
                    <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-center">Status</th>
                    <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-center">Last Updated</th>
                    <th className="py-4 text-[13px] font-semibold text-[#8C8C8C] font-inter w-[20%] text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((q) => (
                    <tr key={q._id} className="border-b border-[#EBEBEB] last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-6 text-[14px] font-medium text-[#0A0A0A] pr-4">{q.title}</td>
                      <td className="py-6 text-center">
                        <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-semibold min-w-[90px] capitalize ${q.status === 'published' ? 'bg-[#C7F0D9] text-[#10B981]' : 'bg-[#E8F0FE] text-[#005EF8]'}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-6 text-[14px] text-[#005EF8] font-medium text-center">
                        {q.updatedAt ? dayjs(q.updatedAt).format('DD MMM YYYY') : '—'}
                      </td>
                      <td className="py-6">
                        <div className="flex items-center justify-end gap-6 pr-2">
                          <button onClick={() => setEditingQuestion(q)} className="p-2 text-[#6A7282] hover:text-[#0A0A0A] transition-colors">
                            <Edit2 size={18} strokeWidth={2} />
                          </button>
                          <button onClick={() => setDeletingQuestion(q)} className="p-2 text-[#EF4444] hover:text-[#DC2626] transition-colors">
                            <Trash2 size={18} strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <NewHelpQuestionModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
      <EditHelpQuestionModal isOpen={!!editingQuestion} onClose={() => setEditingQuestion(null)} question={editingQuestion} />
      <DeleteQuestionModal isOpen={!!deletingQuestion} onClose={() => setDeletingQuestion(null)} question={deletingQuestion} />
    </>
  );
};

export default HelpCenterPage;
