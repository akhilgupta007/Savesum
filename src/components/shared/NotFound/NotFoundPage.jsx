import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center font-inter p-6">
      {/* Brand Logo Header */}
      <div className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD)}>
        <img src={logo1} alt="Save Sum Logo" className="h-[40px] w-auto object-contain" />
        <img src={logo2} alt="Save Sum Text" className="h-[18px] w-auto object-contain" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-[600px] w-full text-center flex flex-col items-center">
        {/* Abstract 404 Visual */}
        <div className="relative mb-8 flex items-center justify-center">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#005EF8] to-[#00A152] leading-none select-none drop-shadow-sm">
            404
          </h1>
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] mix-blend-overlay rounded-full"></div>
        </div>

        <h2 className="text-[32px] md:text-[40px] font-bold text-[#0A0A0A] mb-4 tracking-tight">
          Page not found
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-[#6A7282] mb-10 max-w-[450px] leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#EBEBEB] bg-white text-[#0A0A0A] font-semibold text-[15px] hover:bg-gray-50 transition-all shadow-sm group"
          >
            <ArrowLeft size={18} className="text-[#6A7282] group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          <button 
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#005EF8] text-white font-semibold text-[15px] hover:bg-[#004ACC] transition-all shadow-md group"
          >
            <Home size={18} className="text-white/80 group-hover:scale-110 transition-transform" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
