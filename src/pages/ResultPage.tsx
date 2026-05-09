import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { PERSONALITIES } from '../data/personalities';
import { Share2, Copy, ArrowRight, RotateCcw, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

export const ResultPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userName, resetQuiz } = useQuiz();
  const mbti = searchParams.get('mbti') || "";
  const personality = PERSONALITIES[type?.toUpperCase() || "BONDY"];
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = React.useState({ left: 0, right: 0 });
  const dragX = useMotionValue(0);
  const scrollProgress = useTransform(dragX, [constraints.left, 0], [100, 0]);

  const scroll = (direction: 'left' | 'right') => {
    const currentX = dragX.get();
    const scrollAmount = 260; // Approx width of one card + gap
    let newX = direction === 'left' ? currentX + scrollAmount : currentX - scrollAmount;
    
    // Clamp values
    newX = Math.max(constraints.left, Math.min(0, newX));
    
    animate(dragX, newX, {
      type: "spring",
      bounce: 0,
      duration: 0.4
    });
  };

  React.useEffect(() => {
    if (personality) {
      document.title = `Box of You | You are ${personality.name}`;
    }

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
  }, [personality]);

  if (!personality) return <div className="pt-24 text-center">Personality not found</div>;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.preventDefault();
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="pt-32 md:pt-52 pb-20 px-4 min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 opacity-20 blur-[120px]"
        style={{ background: `radial-gradient(circle at 50% 50%, ${personality.accent}, transparent)` }}
      />

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[180px] font-bold text-ink opacity-[0.03] whitespace-nowrap pointer-events-none select-none tracking-tighter">
          {personality.id}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border text-sm font-bold mb-8"
          style={{ 
            color: personality.accent, 
            borderColor: `${personality.accent}40`,
          }}
        >
          ✦ {userName ? `Hi ${userName}, ` : ''}Your Gift Personality
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
          className="mb-12 relative inline-block group perspective-1000"
        >
          {/* Decorative background glow */}
          <div 
            className="absolute -inset-4 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 rounded-[40px]"
            style={{ backgroundColor: personality.accent }}
          />
          
          {/* Card Container */}
          <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:rotate-1">
            <img 
              src={personality.image} 
              alt={personality.name}
              className="w-72 md:w-96 h-auto rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative z-10 border-8 border-white/80 backdrop-blur-sm"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = document.getElementById('emoji-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            
            {/* File Name Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 font-mono text-[10px] text-muted opacity-50">
              {personality.id}.png
            </div>
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none z-20" />
            
            {/* Card Badge */}
            <div className="absolute -top-4 -right-4 z-30 bg-white text-ink px-4 py-2 rounded-2xl shadow-xl font-bold text-xs border border-ink/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: personality.accent }} />
              OFFICIAL CARD
            </div>
          </div>

          <div 
            id="emoji-fallback"
            className="text-9xl hidden py-10"
          >
            {personality.emoji}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-lg glass text-xs font-bold text-muted border border-white/40 mx-auto">
              {mbti || personality.mbti}
            </span>
          </div>
        </motion.div>
      </section>

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-8 mt-24 pt-0 h-auto min-h-[708px]">
        {/* 2. Recommended Box Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass p-8 md:p-10 rounded-[32px]"
        >
          <h3 className="text-2xl mb-8 flex items-center justify-center gap-3">
            <span className="text-3xl">🎁</span> The Box That Fits You Best
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {personality.gifts.map((gift, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 border border-white/40">
                <div className="text-3xl">{gift.emoji}</div>
                <div>
                  <h4 className="font-bold text-ink text-sm">{gift.name}</h4>
                  <p className="text-xs text-muted leading-tight mt-1">{gift.why}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={`/shop?personality=${personality.id}`}
            className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
            style={{ backgroundColor: personality.accent }}
          >
            Explore This Box <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* 4. All Personalities Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-12 px-4 md:px-8"
        >
          <div className="flex flex-col items-center text-center mb-10">
            <h3 className="text-3xl font-bold text-ink mb-2">Meet the Squad</h3>
            <p className="text-muted">Explore all 8 unique gift personalities</p>
          </div>
          
          <div className="relative group/slider">
            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-ink/10 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-white shadow-lg active:scale-95 hidden md:flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-ink/10 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-white shadow-lg active:scale-95 hidden md:flex"
            >
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing -mx-4 px-4">
              <motion.div 
                ref={scrollRef}
                drag="x"
                dragConstraints={constraints}
                style={{ x: dragX }}
                className="flex gap-4 md:gap-6 pb-8"
              >
              {Object.values(PERSONALITIES).map((p) => (
                <div key={p.id} className="min-w-[200px] md:min-w-[240px] flex flex-col items-center gap-2">
                  <Link 
                    to={`/result/${p.id.toLowerCase()}`}
                    draggable="false"
                    className={`group relative rounded-2xl overflow-hidden aspect-[3/4] w-full transition-all duration-500 hover:scale-[1.05] hover:z-10 shadow-lg ${p.id === personality.id ? 'ring-4 ring-offset-4' : 'opacity-70 hover:opacity-100'}`}
                    style={{ ringColor: p.accent }}
                  >
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm">{p.persona}</h3>
                    </div>
                    {p.id === personality.id && (
                      <div className="absolute top-2 right-2 bg-white text-ink text-[8px] font-bold px-2 py-1 rounded-full shadow-sm">
                        YOURS
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sliding Bar Indicator */}
        <div className="mt-4 flex justify-center">
            <div className="w-48 h-1 bg-ink/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-ink/20 rounded-full"
                style={{ width: '30%', x: useTransform(scrollProgress, [0, 100], [0, 134]) }}
              />
            </div>
          </div>
        </motion.div>

        {/* Share Row */}
        <div className="flex flex-col items-center justify-center gap-6 pt-8 border-t border-ink/5">
          <p className="font-medium text-ink">Share your result!</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = personality.image;
                link.download = `${personality.name}-Card.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white font-bold hover:bg-ink/90 transition-all shadow-lg active:scale-95"
            >
              <Download size={18} /> Download Card
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-md hover:scale-105 transition-all">
              <Share2 size={18} /> WhatsApp
            </button>
            <button 
              onClick={copyLink}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/50 text-ink font-bold hover:bg-white/50 transition-all"
            >
              <Copy size={18} /> Copy Link
            </button>
          </div>
        </div>

        {/* Retry */}
        <button
          onClick={handleRetry}
          className="px-12 py-4 text-center rounded-2xl border-2 border-[#ff0000] bg-white text-rose font-bold hover:bg-rose/5 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw size={20} /> Try Again
        </button>
      </div>
    </div>
  );
};
