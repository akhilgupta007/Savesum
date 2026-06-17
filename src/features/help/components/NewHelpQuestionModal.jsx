import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useCreateHelpQuestion } from '../hooks/useHelpQuestions';

const NewHelpQuestionModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([{ head: '', body: '' }]);
  const [savingStatus, setSavingStatus] = useState(null);
  
  const { mutate: createQuestion, isPending } = useCreateHelpQuestion();

  if (!isOpen) return null;

  const handleUpdateAnswer = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleAddStep = () => {
    setAnswers([...answers, { head: '', body: '' }]);
  };

  const handleRemoveStep = (index) => {
    if (answers.length > 1) {
      setAnswers(answers.filter((_, i) => i !== index));
    }
  };

  const handleSave = (status) => {
    if (!title.trim() || answers.some(a => !a.head.trim() || !a.body.trim())) {
      alert('Please fill out all fields.');
      return;
    }
    
    setSavingStatus(status);
    createQuestion(
      { title, answer: answers, status },
      { 
        onSuccess: () => {
          setTitle('');
          setAnswers([{ head: '', body: '' }]);
          setSavingStatus(null);
          onClose();
        },
        onError: () => {
          setSavingStatus(null);
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[800px] max-w-[90vw] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h2 className="text-[18px] font-semibold text-[#0A0A0A]">New Help Question</h2>
          <button onClick={onClose} className="text-[#0A0A0A] hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label className="text-[15px] font-medium text-[#0A0A0A]">Question Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter question title"
              className="w-full px-4 py-3 border border-[#EBEBEB] rounded-xl text-[14px] text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[15px] font-medium text-[#0A0A0A]">Answer Content</label>
              <button onClick={handleAddStep} className="flex items-center gap-1 text-[13px] font-medium text-[#005EF8] hover:text-blue-700 transition-colors">
                <Plus size={14} /> Add Step
              </button>
            </div>
            
            <div className="w-full border border-[#EBEBEB] rounded-xl overflow-hidden bg-gray-50/30">
              <div className="p-6 flex flex-col gap-6">
                {answers.map((ans, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative group">
                    <div className="w-8 h-8 rounded-full bg-[#005EF8] flex items-center justify-center text-white text-[14px] font-medium shrink-0 mt-1">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col gap-3 w-full pr-8">
                      <input 
                        type="text" 
                        value={ans.head}
                        onChange={(e) => handleUpdateAnswer(idx, 'head', e.target.value)}
                        placeholder="Enter step title"
                        className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-[14px] font-medium text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors"
                      />
                      <textarea 
                        value={ans.body}
                        onChange={(e) => handleUpdateAnswer(idx, 'body', e.target.value)}
                        placeholder="Enter step description..."
                        className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-[13px] text-[#0A0A0A] placeholder-[#8C8C8C] focus:outline-none focus:border-[#005EF8] transition-colors resize-none h-[60px]"
                      ></textarea>
                    </div>
                    {answers.length > 1 && (
                      <button 
                        onClick={() => handleRemoveStep(idx)}
                        className="absolute right-0 top-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#EBEBEB]">
          <button 
            onClick={onClose}
            className="px-6 py-[10px] border border-[#EBEBEB] rounded-xl text-[14px] font-medium text-[#D10020] hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleSave('draft')}
            disabled={isPending}
            className="px-6 py-[10px] border border-[#EBEBEB] rounded-xl text-[14px] font-medium text-[#005EF8] hover:bg-blue-50 transition-colors disabled:opacity-50 min-w-[130px]"
          >
            {isPending && savingStatus === 'draft' ? 'Saving...' : 'Save as Draft'}
          </button>
          <button 
            onClick={() => handleSave('published')}
            disabled={isPending}
            className="px-6 py-[10px] bg-[#005EF8] rounded-xl text-[14px] font-medium text-white hover:bg-[#005EF8]/90 transition-colors disabled:opacity-50 min-w-[100px]"
          >
            {isPending && savingStatus === 'published' ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewHelpQuestionModal;
