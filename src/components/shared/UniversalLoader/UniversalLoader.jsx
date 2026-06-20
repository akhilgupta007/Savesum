import React from 'react';
import { motion } from 'framer-motion';
import logo1 from '@/assets/save_sum_logo_1.svg';
import logo2 from '@/assets/save_sum_logo_2.svg';

const UniversalLoader = ({ fullScreen = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#FAFAFA] ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]'}`}>
      
      {/* Top Loading Bar - Only on Full Screen */}
      {fullScreen && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#005EF8] to-[#00A152]"
            initial={{ width: '0%', marginLeft: '0%' }}
            animate={{
              width: ['0%', '30%', '100%'],
              marginLeft: ['0%', '40%', '100%']
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
      )}

      {fullScreen ? (
        <>
          {/* Branded Logo Animation for Initial Boot */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img 
              src={logo1} 
              alt="Save Sum Logo" 
              className="h-[48px] w-auto object-contain"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <img 
              src={logo2} 
              alt="Save Sum Text" 
              className="h-[22px] w-auto object-contain" 
            />
          </motion.div>
          <motion.p
            className="mt-6 text-[13px] font-semibold text-[#6A7282] tracking-[0.2em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            Loading
          </motion.p>
        </>
      ) : (
        <>
          {/* Standard Spinner for non-fullscreen areas until replaced by Skeletons */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-10 h-10 border-3 border-transparent border-t-[#005EF8] border-r-[#005EF8] rounded-full opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-6 h-6 border-3 border-[#005EF8] border-b-transparent border-l-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UniversalLoader;
