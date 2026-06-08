import React from 'react';
import { motion } from 'framer-motion';

const UniversalLoader = ({ fullScreen = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#FAFAFA] ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[400px]'}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute w-16 h-16 border-4 border-transparent border-t-[#005EF8] border-r-[#005EF8] rounded-full opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Ring */}
        <motion.div
          className="w-10 h-10 border-4 border-[#005EF8] border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="mt-6 text-[13px] font-semibold text-[#005EF8] tracking-[0.2em] uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading
      </motion.p>
    </div>
  );
};

export default UniversalLoader;
