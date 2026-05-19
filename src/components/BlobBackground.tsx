import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export const BlobBackground: React.FC = () => {
  const location = useLocation();
  const whiteBgPaths = ['/shop', '/build', '/corporate', '/about', '/faq', '/product'];
  const isWhiteBgPage = whiteBgPaths.some(path => location.pathname.startsWith(path));

  if (isWhiteBgPage) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#fdfdfd]">
        {/* Soft elegant white/pastel background for secondary pages */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-[60px] z-10" />
        <motion.div
           animate={{ y: [0, -20, 0], opacity: [0.6, 0.8, 0.6] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-radial from-[#FFF3E0]/70 to-transparent blur-[120px]"
        />
        <motion.div
           animate={{ y: [0, 30, 0], opacity: [0.5, 0.7, 0.5] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-[10%] left-[15%] w-[80%] h-[80%] rounded-full bg-radial from-[#FCE4EC]/70 to-transparent blur-[120px]"
        />
        <motion.div
           animate={{ y: [0, -15, 0], opacity: [0.6, 0.8, 0.6] }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
           className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-radial from-[#E8EAF6]/80 to-transparent blur-[120px]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Global Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-50 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
      </div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-radial from-pink-200/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-radial from-blush/15 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute -bottom-[10%] left-[20%] w-[55%] h-[55%] rounded-full bg-radial from-pink-300/10 to-transparent blur-3xl"
      />
    </div>
  );
};
