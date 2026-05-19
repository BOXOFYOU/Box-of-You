import React from 'react';
import { motion } from 'motion/react';
import { Target, ArrowRight, Star, Gift } from 'lucide-react';

export const AIShowcase = () => {
  return (
    <section className="py-24 px-4 relative z-10 w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        
        {/* Left Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[320px] bg-[#140c17] border border-white/5 rounded-[32px] p-6 relative shadow-2xl flex flex-col justify-between shrink-0 h-[400px] z-10"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Perfect Match</h3>
                <p className="text-white/40 text-sm">Based on 12 points</p>
              </div>
              <div className="bg-[#FF007F] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,0,127,0.5)]">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                99%
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black text-white tracking-tight">High</span>
              <span className="text-white/50 text-lg font-medium">Confidence</span>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.05] transition-colors cursor-pointer mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF007F]/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF007F]/40 flex items-center justify-center border border-[#FF007F]/50">
                    <Target size={16} className="text-[#F4B8E4]" />
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Recommended</div>
                  <div className="text-white/40 text-xs">For minimal aesthetic</div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <ArrowRight size={14} className="text-white/70" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF007F] to-[#9D4EDD] shadow-[0_0_20px_rgba(255,0,127,0.3)]"></div>
              <div className="h-4 w-24 bg-white/10 rounded-full"></div>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-black/40"></div>
              <div className="h-4 flex-1 bg-white/10 rounded-full"></div>
              <div className="h-4 w-12 bg-[#FF007F]/40 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Middle Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[420px] bg-gradient-to-b from-[#1c1221] to-[#140c17] border border-white/10 rounded-[40px] p-8 shadow-[0_30px_100px_rgba(255,20,147,0.15)] relative h-[520px] z-20 flex flex-col items-center flex-shrink-0"
        >
          {/* Top Pill */}
          <div className="bg-white/5 border border-white/10 text-white/80 text-sm font-medium px-6 py-2 rounded-full mb-8 backdrop-blur-md">
            Curated AI Selection
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-white/80 leading-tight">
              Scanning <span className="text-[#FF85AA] font-bold text-3xl">200+</span><br />
              <span className="text-white font-light text-2xl tracking-wide">Items In Real-Time</span>
            </h2>
          </div>

          <div className="w-full flex items-center justify-center gap-6 mb-8 px-4">
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="#FF007F" strokeWidth="6" strokeDasharray="226.2" strokeDashoffset="13.5" className="drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">94%</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[180px]">
              Perfect match confidence for the curated box.
            </p>
          </div>

          <div className="flex-1 w-full bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/5 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('/image1.png')] bg-cover bg-center opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 blur-[2px] group-hover:blur-0 scale-105 group-hover:scale-100"></div>
             
             {/* Torn paper overlay effect (simulated with SVG mask or just gradient for now) */}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-[#FF007F] font-black text-9xl absolute opacity-30 blur-xl rotate-12 scale-150">?</div>
             </div>

             {/* Inner image container */}
             <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
               <img src="/image1.png" alt="Curated Box" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
             </div>

             <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500 border border-[#1c1221]" />
                  <div className="w-5 h-5 rounded-full bg-pink-500 border border-[#1c1221]" />
                </div>
                <span className="text-xs font-semibold text-white">Highly Rated</span>
             </div>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-[320px] bg-[#140c17] border border-white/5 rounded-[32px] p-6 relative shadow-2xl flex flex-col justify-between shrink-0 h-[400px] z-10"
        >
          {/* Top badge */}
          <div className="flex justify-between items-start mb-6 w-full">
            <div className="bg-[#FF007F]/10 border border-[#FF007F]/30 text-[#FF85AA] text-[10px] font-bold tracking-widest px-4 py-2 rounded-full uppercase flex items-center gap-2">
              <Star size={12} /> Premium Picks
            </div>
          </div>

          <div className="absolute -top-6 -right-6 lg:-right-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-2 pl-2 pr-6 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-30 transform hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF007F] to-[#9D4EDD] p-[1px]">
              <img src="https://i.pravatar.cc/100?img=47" alt="AI Agent" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <div className="text-white text-sm font-bold">@curation_bot</div>
              <div className="text-[#FF85AA] text-xs font-medium">AI Gift Matcher</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-white/40 text-sm mb-1">Status</div>
            <h3 className="text-3xl font-bold text-white leading-tight tracking-tight mb-2">
              Curated Box <br/> Ready To Ship
            </h3>
            <p className="text-white/60 text-sm mb-12">
              Matching <span className="text-[#F4B8E4] font-semibold tracking-wide">The Creator</span> Personality
            </p>
          </div>

          <div className="relative h-24 mb-6">
            {/* Curved dashed line */}
            <svg width="100%" height="80" className="absolute top-4 left-0">
              <path 
                d="M 10 70 Q 150 -10 290 70" 
                fill="transparent" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF007F" />
                  <stop offset="50%" stopColor="#F4B8E4" />
                  <stop offset="100%" stopColor="#9D4EDD" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Gift Icon floating on the curve */}
            <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-[#2a1b2e] border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,20,147,0.3)] z-10"
            >
              <Gift size={20} className="text-[#F4B8E4]" />
            </motion.div>
          </div>

          <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF007F] to-[#9D4EDD] flex items-center justify-center shadow-[0_0_25px_rgba(255,20,147,0.4)] hover:shadow-[0_0_35px_rgba(255,20,147,0.6)] hover:scale-105 transition-all text-white group cursor-pointer border-none outline-none">
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
