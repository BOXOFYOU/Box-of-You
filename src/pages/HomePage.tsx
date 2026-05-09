import React from 'react';
import { motion, useMotionValue, useTransform, animate, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Sparkles, Gift, Heart, Target, ChevronLeft, ChevronRight } from 'lucide-react';

import { PERSONALITIES } from '../data/personalities';
import { BlobBackground } from '../components/BlobBackground';

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

    // Initial calculation
    updateConstraints();
    
    // Update on resize
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const dragX = useMotionValue(0);
  const scrollProgress = useTransform(dragX, [constraints.left, 0], [100, 0]);

  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for ribbons
  const heroPitaY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroPitaRotate = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  
  const midPitaY = useTransform(scrollYProgress, [0.1, 0.5], [100, -100]);
  const midPitaRotate = useTransform(scrollYProgress, [0.1, 0.5], [10, -10]);
  
  const bottomPitaY = useTransform(scrollYProgress, [0.4, 0.8], [150, -150]);
  const bottomPitaRotate = useTransform(scrollYProgress, [0.4, 0.8], [-10, 10]);

  const scroll = (direction: 'left' | 'right') => {
    const currentX = dragX.get();
    const scrollAmount = 340; // Approx width of one card + gap
    let newX = direction === 'left' ? currentX + scrollAmount : currentX - scrollAmount;
    
    // Clamp values
    newX = Math.max(constraints.left, Math.min(0, newX));
    
    animate(dragX, newX, {
      type: "spring",
      bounce: 0,
      duration: 0.4
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-16 min-h-screen relative overflow-hidden">
      {/* Decorative Ribbon (Pita) - Top of Website */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0 overflow-hidden">
        <motion.img 
          style={{ y: heroPitaY, rotate: heroPitaRotate }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/pita2.png" 
          alt="" 
          className="absolute top-[-50px] md:top-[-100px] left-0 w-full h-full object-contain object-top opacity-100"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-4 md:px-8 relative z-10 mx-auto"
        style={{ height: '995.438px', width: '1357px', maxWidth: '100%' }}
      >
        {/* Mesh Background Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-100/30 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-green-50/30 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-7xl mx-auto w-full bg-white/5 backdrop-blur-3xl rounded-[40px] md:rounded-[100px] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] p-6 md:p-16 relative z-10 mt-20 md:mt-12 mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative group order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto">
                {/* Main Image with Organic Corners - Matching Reference Cutout */}
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 rounded-[60px] rounded-br-[180px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-4 border-white/60"
                >
                  <img 
                    src="/image1.png" 
                    alt="Gift Boxes" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Floating Arrow Button (Bottom Right) - Matching Reference Style */}
                <Link 
                  to="/quiz"
                  className="absolute bottom-[-10px] right-[-10px] w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center group/btn hover:scale-110 transition-all z-20 border border-ink/5"
                >
                  <ArrowRight className="text-ink group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={36} strokeWidth={1.5} />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-left order-1 lg:order-2"
            >
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase mb-10 backdrop-blur-md border border-white/10"
              >
                ✦ The Art of Gifting
              </motion.div>
              
              <div className="mb-10">
                <h1 className="text-4xl md:text-6xl text-ink font-bold tracking-tight leading-[1.1] flex flex-col">
                  <span className="select-none text-ink">
                    Not Just a Gift,
                  </span>
                  <span className="drop-shadow-2xl text-rose/80 italic font-normal text-[32px] md:text-[41px] leading-[40px] md:leading-[60px]">Their Personality in a Box.</span>
                </h1>
              </div>
              
              <p 
                className="text-lg md:text-xl mb-12 max-w-md leading-relaxed font-medium"
                style={{ color: '#616161' }}
              >
                Skip the guessing. Start giving something that actually fits. Answer 12 questions, and we’ll find the right one for you!
              </p>

              {/* Category Pills - Reference Style */}
              <div className="flex flex-wrap gap-3 mb-14">
                {[
                  { icon: <Sparkles size={16} />, label: "Curated" },
                  { icon: <Gift size={16} />, label: "Custom" },
                  { icon: <Heart size={16} />, label: "Corporate" }
                ].map((cat, i) => (
                  <motion.button
                    key={cat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.6, ease: "backOut" }}
                    className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-sm font-bold hover:bg-white/15 hover:text-white hover:border-white/30 transition-all shadow-xl group"
                    style={{ color: '#8f8f8f' }}
                  >
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">{cat.icon}</span>
                    {cat.label}
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <Link
                  to="/quiz"
                  className="px-10 py-5 rounded-full bg-white text-ink font-bold text-lg shadow-2xl hover:bg-rose hover:text-white transition-all hover:scale-105 flex items-center gap-4 group"
                >
                  Take the Quiz
                  <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works - Reference Style */}
      <section className="py-32 px-4 bg-transparent relative overflow-hidden">
        {/* Decorative Ribbon (Pita) - Elegant Mid-Section Flow with Parallax */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            style={{ y: midPitaY, rotate: midPitaRotate }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            src="/images/cards/pita1.png" 
            alt="" 
            className="absolute top-[-25%] right-[-45%] w-[150%] h-[150%] object-contain opacity-100 scale-x-[-1] mix-blend-soft-light blur-[1px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight mb-6">
                How It <span className="text-rose italic font-light">Works</span>
              </h2>
              <p className="text-lg text-ink-soft/50 leading-relaxed">
                The journey to finding the perfect gift box is simple and meaningful.
              </p>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { step: 1, icon: <Target className="w-5 h-5" />, title: "Take the Quiz", desc: "12 deep questions reveal how you (or the recipient) perceive the world." },
              { step: 2, icon: <Sparkles className="w-5 h-5" />, title: "Get Your Personality", desc: "We map your answers to one of 16 unique gift personalities." },
              { step: 3, icon: <Gift className="w-5 h-5" />, title: "Receive Your Box", desc: "A curated gift box arrives, feeling as if it was made specifically for them." }
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[40px] hover:shadow-2xl transition-all group hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/50 flex items-center justify-center text-ink/40 mb-8 group-hover:bg-rose group-hover:text-white transition-all shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-ink mb-4">{item.title}</h3>
                <p className="text-ink-soft/60 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Build Your Box - Reference Style */}
      <section className="py-32 px-4 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 md:p-20 rounded-[40px] md:rounded-[64px] flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex-1 text-center md:text-left relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-ink/40 text-[9px] font-bold tracking-widest uppercase mb-8">
                ✦ Custom Experience
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-ink tracking-tight leading-tight">
                Build Your <br /> <span className="text-rose italic font-light">Own Box</span>
              </h2>
              <p className="text-lg text-ink-soft/40 mb-10 max-w-sm mx-auto md:mx-0 leading-relaxed">
                Want to pick every single item yourself? Our custom box builder lets you choose the size, the items, and add a personal touch.
              </p>
              <Link
                to="/build"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-white font-bold shadow-xl hover:bg-rose transition-all hover:scale-105"
              >
                Start Building <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <div className="flex-1 relative w-full max-w-[480px] aspect-square group">
              {/* Torn Paper Visual Container */}
              <div className="relative w-full h-full rounded-[48px] overflow-hidden bg-white border border-white/20 shadow-2xl">
                {/* Background Image (The "Hole" content) */}
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src="/image1.png" 
                    alt="Curated Gift Boxes"
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Torn Paper Mask (SVG) */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-ink">
                    <path 
                      d="M0,0 H100 V100 H0 Z M50,50 m-42,0 c0,-20 15,-30 32,-35 c20,-5 32,2 42,15 c15,15 20,25 15,42 c-8,20 -20,32 -40,35 c-20,5 -40,0 -52,-20 c-6,-15 -6,-25 3,-37 Z" 
                      fillRule="evenodd"
                      className="opacity-98"
                    />
                    {/* Edge Thickness Simulation */}
                    <path 
                      d="M8,48 l2,-5 l3,2 l4,-6 l5,4 l6,-7 l7,5 l8,-6 l7,4 l6,-5 l5,3 l4,-4 l3,2 l2,-3 l5,6 l4,-2 l3,5 l6,-3 l4,4 l2,-6 l5,2 l3,-4 l4,3 l2,-5" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="0.4" 
                      className="opacity-10 blur-[0.5px]"
                    />
                  </svg>
                </div>

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

                {/* Inner Glow/Shadow for Depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-rose/20 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center text-4xl shadow-2xl z-20"
              >
                ✨
              </motion.div>
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center text-3xl shadow-2xl z-20"
              >
                💝
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Collection - Reference Style */}
      <section className="py-32 px-4 bg-transparent relative overflow-hidden">
        {/* Decorative Ribbon (Pita) - Final Flourish with Parallax */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            style={{ y: bottomPitaY, rotate: bottomPitaRotate }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            src="/images/cards/pita1.png" 
            alt="" 
            className="absolute bottom-[-45%] left-[-40%] w-[180%] h-[180%] object-contain opacity-100 mix-blend-soft-light blur-[1px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold text-ink tracking-tight leading-tight mb-4">
                The <span className="text-rose italic font-light">Collection</span>
              </h2>
              <p className="text-lg text-ink-soft/40 leading-relaxed">
                Discover the 16 personalities that define our curated gift boxes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/shop"
                className="group flex items-center gap-3 text-ink font-bold text-base hover:text-rose transition-colors"
              >
                View All Personalities <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative group/slider">
            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 rounded-full bg-white border border-ink/5 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-white shadow-xl active:scale-95 hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 rounded-full bg-white border border-ink/5 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-white shadow-xl active:scale-95 hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div 
                ref={scrollRef}
                drag="x"
                dragConstraints={constraints}
                style={{ x: dragX }}
                className="flex gap-8 pb-12"
              >
              {Object.values(PERSONALITIES).slice(0, 8).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[280px] md:min-w-[340px]"
                >
                  <Link to={`/shop?personality=${p.id}`} className="block h-full" draggable="false">
                    <motion.div
                      whileHover={{ y: -15 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[32px] md:rounded-[50px] h-full flex flex-col items-center text-center group transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)]"
                    >
                      <div className="mb-10 group-hover:scale-110 transition-transform duration-700 h-64 flex items-center justify-center pointer-events-none">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="h-full w-auto object-contain transition-all shadow-2xl rounded-[32px] border-4 border-white"
                          referrerPolicy="no-referrer"
                          draggable="false"
                        />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-ink mb-3 select-none">{p.persona}</h3>
                      
                      <div className="flex items-center gap-2 mb-8 select-none">
                        <span className="text-[10px] font-black text-ink/20 uppercase tracking-[0.2em]">
                          {p.mbti}
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-8 border-t border-ink/5 w-full flex items-center justify-between select-none opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-ink uppercase tracking-widest">Explore</span>
                        <ArrowRight size={14} className="text-rose group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sliding Bar Indicator */}
        <div className="mt-4 flex justify-center">
            <div className="w-48 h-1.5 bg-ink/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-ink rounded-full"
                style={{ width: '30%', x: useTransform(scrollProgress, [0, 100], [0, 134]) }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Reference Style */}
      <section className="py-32 px-4 bg-transparent overflow-hidden relative">
        {/* Decorative Ribbon (Pita) - Testimonial Flow */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            style={{ 
              y: useTransform(scrollYProgress, [0.6, 1], [200, -200]),
              rotate: useTransform(scrollYProgress, [0.6, 1], [0, 20])
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 2 }}
            src="/images/cards/pita1.png" 
            alt="" 
            className="absolute top-[-15%] right-[-35%] w-[140%] h-[140%] object-contain opacity-80 mix-blend-soft-light blur-[1px] scale-x-[-1]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-ink tracking-tight leading-tight mb-4">Loved by <span className="text-rose italic font-light">Gift Givers</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah K.", role: "Gift Giver", quote: "Finally found a gift that truly feels just right for them. The quiz is so accurate!" },
              { name: "David M.", role: "Corporate Client", quote: "Box of You helped our team feel more personally appreciated." },
              { name: "Lina W.", role: "Birthday Recipient", quote: "Receiving this gift made me feel like the sender really understands me." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[32px] md:rounded-[50px] relative hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] transition-all"
              >
                <div className="flex gap-2 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#E8637A" color="#E8637A" />)}
                </div>
                <p className="text-2xl text-ink-soft/70 mb-12 leading-relaxed italic font-medium">"{t.quote}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-rose flex items-center justify-center font-bold text-white text-base shadow-xl shadow-rose/20">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-ink text-base">{t.name}</p>
                    <p className="text-ink/30 text-[11px] uppercase tracking-[0.2em] font-bold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Banner - Aesthetic CTA */}
      <section className="px-4 py-24 relative overflow-hidden">
        {/* Decorative Ribbon (Pita) - Banner Flourish */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            style={{ 
              y: useTransform(scrollYProgress, [0.8, 1], [100, -100]),
              rotate: useTransform(scrollYProgress, [0.8, 1], [0, -15])
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 2 }}
            src="/images/cards/pita1.png" 
            alt="" 
            className="absolute bottom-[-35%] left-[-35%] w-[110%] h-[110%] object-contain opacity-60 mix-blend-soft-light blur-[1px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="glass p-8 md:p-16 rounded-[32px] md:rounded-[48px] bg-linear-to-r from-rose/20 via-rose/10 to-transparent border-white/60 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            
            <div className="text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose text-white text-[9px] font-black uppercase tracking-widest mb-6">
                Limited Time
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ink tracking-tight">Holiday Gifting Season</h2>
              <p className="text-lg text-muted max-w-md leading-relaxed">
                Send a Box of You before December 25th with free gift wrapping on all orders.
              </p>
            </div>
            
            <Link
              to="/shop"
              className="group relative px-10 py-5 rounded-full bg-ink text-white font-bold shadow-xl hover:scale-105 transition-all active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Shop Holiday Boxes <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-rose to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
