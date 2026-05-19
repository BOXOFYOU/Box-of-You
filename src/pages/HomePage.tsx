import React from 'react';
import { motion, useMotionValue, useTransform, animate, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Sparkles, Gift, Heart, Target, ChevronLeft, ChevronRight, Zap, Shield, Globe } from 'lucide-react';

import { PERSONALITIES } from '../data/personalities';
import { AIShowcase } from '../components/AIShowcase';

export const HomePage: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = React.useState({ left: 0, right: 0 });

  React.useEffect(() => {
    document.title = "Box of You | Find the Gift That Feels Just Right";
    
    const updateConstraints = () => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const offsetWidth = scrollRef.current.offsetWidth;
        setConstraints({ left: Math.min(0, -(scrollWidth - offsetWidth)), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const dragX = useMotionValue(0);
  const scrollProgress = useTransform(dragX, [constraints.left, 0], [100, 0]);

  const { scrollYProgress } = useScroll();

  const scroll = (direction: 'left' | 'right') => {
    const currentX = dragX.get();
    const scrollAmount = 350;
    let newX = direction === 'left' ? currentX + scrollAmount : currentX - scrollAmount;
    newX = Math.max(constraints.left, Math.min(0, newX));
    animate(dragX, newX, {
      type: "spring",
      bounce: 0,
      duration: 0.4
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#050109] min-h-screen text-white font-sans overflow-hidden selection:bg-[#FF007F]/30 pb-20 relative">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen mix-blend-color-dodge"></div>
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#FF007F]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#9D4EDD]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 lg:order-1 relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF85AA] text-[10px] font-bold tracking-[0.3em] uppercase mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(255,20,147,0.15)]"
            >
              <Sparkles size={14} className="text-[#FF007F]" /> Gift Smarter With Box of You
            </motion.div>
            
            <h1 className="text-[62px] font-bold tracking-tight leading-[1.05] mb-8 text-white">
              Save Time & Money {' '}
              <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] via-[#FF85AA] to-[#F4B8E4] drop-shadow-[0_0_30px_rgba(255,20,147,0.4)]">
                On Every Gift
              </span> 
            </h1>
            
            <p className="text-[17px] mb-12 max-w-xl leading-relaxed text-white/60 font-normal text-center md:text-left">
              Discover the perfect items, get personalized curated recommendations, and gift effortlessly with our AI-powered platform.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/quiz"
                className="group relative pt-[11px] pl-[39px] pb-[12px] pr-8 md:pr-10 rounded-full bg-gradient-to-r from-[#FF007F] to-[#D100D1] text-white font-bold text-base md:text-lg shadow-[0_0_40px_rgba(255,20,147,0.4)] hover:shadow-[0_0_60px_rgba(255,20,147,0.6)] hover:-translate-y-1 transition-all overflow-hidden flex items-center gap-4"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Find The Perfect Gift</span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-6 text-white/40 text-sm font-medium uppercase tracking-wider">
              <span>Loved By</span>
              <div className="h-px bg-white/10 flex-1"></div>
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center">
                    <UserIcon size={14} className="text-white/60" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating 3D Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full flex items-center justify-center"
          >
            {/* Holographic Glowing Orb */}
             <motion.div 
               animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#FF007F] via-[#9D4EDD] to-transparent rounded-full blur-[60px] opacity-60"
             />

             {/* Floating UI Cards */}
             <div className="relative w-full max-w-[480px] aspect-[4/5] perspective-1000">
               <motion.div 
                 animate={{ y: [-15, 15, -15], rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(255,20,147,0.2)] bg-white/5 backdrop-blur-3xl"
               >
                  <img 
                    src="/image1.png" 
                    alt="Gift Box" 
                    className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/80" />
               </motion.div>

               {/* Smaller Floating Card 1 */}
               <motion.div
                 animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -right-4 md:-right-12 top-20 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-48"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF007F] to-[#9D4EDD] p-[1px]">
                     <div className="w-full h-full bg-[#050109] rounded-full flex items-center justify-center">
                        <Star size={16} className="text-[#F4B8E4]" />
                     </div>
                   </div>
                   <div>
                     <div className="text-white text-xs font-bold">Perfect Match</div>
                     <div className="text-[#FF85AA] text-[10px]">99% Accuracy</div>
                   </div>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-[#FF007F] to-[#F4B8E4] w-[99%]" />
                 </div>
               </motion.div>

               {/* Smaller Floating Card 2 */}
               <motion.div
                 animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute -left-4 md:-left-16 bottom-24 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-4"
               >
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF007F]/20 to-[#9D4EDD]/20 border border-white/10 flex items-center justify-center">
                    <Gift size={20} className="text-white" />
                 </div>
                 <div>
                   <div className="text-white text-xs font-bold">Curated Box</div>
                   <div className="text-white/50 text-[10px]">Ready to ship</div>
                 </div>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <AIShowcase />

      {/* Feature Grid Section */}
      <section className="py-24 relative z-10 px-4 bg-white rounded-[64px] mx-2 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center justify-center">
            <div className="bg-[#f0f2f5] text-[#4a5568] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-8">
              AI Features Section
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1a202c] tracking-tight leading-tight max-w-4xl">
              AI-Powered Features, Gifting Effortless With Box of You
            </h2>
            <p className="text-[#718096] text-lg max-w-3xl mx-auto font-medium leading-relaxed">
               enjoy seamless curation, smarter matching predictions, and personalized rewards powered by our ai for smoother experiences.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Zap className="w-5 h-5 text-[#FF007F]" />, title: "Real-Time Box Predictions", desc: "know exactly what to buy to get the best items." },
              { icon: <Target className="w-5 h-5 text-[#FF85AA]" />, title: "Smart Box Optimization", desc: "ai suggests better, cheaper, or more personalized products." },
              { icon: <Star className="w-5 h-5 text-[#F4B8E4]" />, title: "Dynamic Loyalty Tracking", desc: "see your points grow live as you curate and build." },
              { icon: <Heart className="w-5 h-5 text-[#FF007F]" />, title: "Personalized Alerts", desc: "get alerts for price drops on favorite items." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative bg-white border border-gray-100 p-8 rounded-[32px] hover:bg-gradient-to-br hover:from-[#FF007F] hover:to-[#D100D1] transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF007F]/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all text-[#FF007F] group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a202c] group-hover:text-white mb-3 tracking-wide transition-colors">{feature.title}</h3>
                  <p className="text-[#718096] group-hover:text-white/90 text-[15px] leading-relaxed transition-colors mb-8">{feature.desc}</p>
                </div>
                
                <div className="flex items-center gap-2 text-[#FF007F] group-hover:text-white text-sm font-bold transition-colors">
                  Learn more <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-32 px-4 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF007F]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B8E4] to-[#FF007F]">Collection</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                Discover the 16 personalities that define our curated gift boxes.
              </p>
            </div>
            <Link
              to="/shop"
              className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-[#FF007F]/50 hover:shadow-[0_0_20px_rgba(255,20,147,0.2)] transition-all"
            >
              View All Personalities <ArrowRight size={16} className="text-[#FF85AA] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative group/slider mt-12">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#050109]/80 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white/10 hover:border-[#FF007F]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:flex"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#050109]/80 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white/10 hover:border-[#FF007F]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:flex"
            >
              <ChevronRight size={24} />
            </button>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing px-4 -mx-4 md:px-8 md:-mx-8">
              <motion.div 
                ref={scrollRef}
                drag="x"
                dragConstraints={constraints}
                style={{ x: dragX }}
                className="flex gap-6 pb-12 pt-4"
              >
              {Object.values(PERSONALITIES).slice(0, 8).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[280px] md:min-w-[320px] aspect-square"
                >
                  <Link to={`/shop?personality=${p.id}`} className="block h-full" draggable="false">
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="bg-white border-2 border-gray-100/60 p-4 rounded-[32px] h-full flex flex-col group transition-all duration-500 hover:border-transparent hover:shadow-[0_40px_80px_-20px_rgba(255,0,127,0.4)] relative overflow-hidden"
                    >
                      {/* Gradient Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF007F] via-[#FF007F] to-[#D100D1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                      
                      {/* Pattern Overlay on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                      <div className="mb-4 relative z-10 w-full flex-1 rounded-[24px] overflow-hidden flex items-center justify-center bg-[#f8f9fa] group-hover:bg-white/10 transition-colors duration-500 border border-transparent group-hover:border-white/20">
                        {/* Floor Shadow */}
                        <div className="absolute bottom-[15%] w-[50%] h-[15px] bg-black/10 blur-[10px] rounded-[100%] group-hover:w-[40%] group-hover:bg-black/20 transition-all duration-700" />
                        
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="h-[85%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.12] group-hover:-translate-y-3 drop-shadow-2xl relative z-10"
                          referrerPolicy="no-referrer"
                          draggable="false"
                        />
                      </div>
                      
                      <div className="px-2 relative z-10 flex-col flex shrink-0">
                        <div className="flex justify-between items-center mb-1">
                           <h3 className="text-xl md:text-2xl font-extrabold text-[#1a202c] group-hover:text-white tracking-tight transition-colors line-clamp-1">{p.persona}</h3>
                           <div className="px-2.5 py-1 bg-[#FF007F]/10 group-hover:bg-white/20 rounded-lg text-[9px] uppercase font-black tracking-widest text-[#FF007F] group-hover:text-white transition-colors shrink-0 ml-2">
                             {p.mbti}
                           </div>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between border-t border-gray-100 group-hover:border-white/20 pt-3 transition-colors">
                          <span className="text-[11px] font-bold text-[#1a202c] group-hover:text-white transition-colors uppercase tracking-wider">Explore Box</span>
                          <div className="w-7 h-7 rounded-full bg-[#1a202c] group-hover:bg-white flex items-center justify-center transition-colors transform group-hover:translate-x-1 shadow-md">
                             <ArrowRight size={12} className="text-white group-hover:text-[#FF007F] transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-4 flex justify-center">
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF007F] to-[#F4B8E4] rounded-full"
                  style={{ width: '20%', x: useTransform(scrollProgress, [0, 100], [0, 204]) }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-24 px-4 relative z-10">
         <div className="max-w-5xl mx-auto">
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative rounded-[40px] p-12 md:p-20 overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-3xl text-center shadow-[0_0_50px_rgba(255,20,147,0.15)]"
            >
               {/* Gradients */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-gradient-to-b from-[#FF007F]/20 to-transparent blur-[80px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-[#9D4EDD]/20 to-transparent blur-[80px] pointer-events-none" />
               
               <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight relative z-10">
                  Ready to elevate <br className="hidden md:block"/> your gifting?
               </h2>
               <p className="text-white/50 text-xl font-light mb-12 max-w-xl mx-auto relative z-10">
                  Join the smarter way to gift. AI-curated, beautifully boxed, globally delivered.
               </p>
               
               <Link
                to="/quiz"
                className="inline-flex items-center gap-4 px-12 py-5 rounded-full bg-white text-[#050109] font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform relative z-10"
              >
                Start Experience <ArrowRight size={20} />
              </Link>
            </motion.div>
         </div>
      </section>

    </div>
  );
};

// Dummy icon for user since we removed it
const UserIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
