import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, ArrowUp, X, MessageCircle, Phone, AlarmClock } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { useQuiz } from '../context/QuizContext';
import { calculateResult, mbtiToPersonality } from '../utils/scoring';

export const QuizPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Kuis Kepribadian";
  }, []);
  const navigate = useNavigate();
  const { currentStep, answers, userName, setAnswer, setUserName, nextStep, prevStep, getFinalResult } = useQuiz();
  const [showNotification, setShowNotification] = React.useState(true);
  const notificationSound = React.useRef<HTMLAudioElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [history, setHistory] = useState<{ type: 'question' | 'answer', content: string, id: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isAskingName, setIsAskingName] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);

  const question = QUESTIONS[currentStep];
  const progress = `${String(currentStep + 1).padStart(2, '0')}/${QUESTIONS.length}`;

  // Sound effects - Refined to match the "cute & modern" vibe of the reference
  const playPop = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const playClick = () => {
    const audio = new Audio('/messagesend.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  // Helper to add messages one by one
  const addMessagesSequentially = async (messages: string[], type: 'question' | 'answer' = 'question', skipOptions = false) => {
    if (!skipOptions) setShowOptions(false);
    for (const content of messages) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
      setHistory(prev => [...prev, { type, content, id: `${type}-${Date.now()}-${Math.random()}` }]);
      setIsTyping(false);
      if (type === 'question') {
        playPop();
      } else {
        playClick();
      }
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    if (type === 'question' && !skipOptions) {
      setShowOptions(true);
    }
  };

  useEffect(() => {
    if (showNotification) return;

    // Initialize history with first question
    const init = async () => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        await addMessagesSequentially([
          "Hii bestie! Welcome to Box of You! ✨",
          "Aku MINYOU, your personal vibe checker. Let's find out your true self, shall we? 🕵️‍♀️",
          "Sebelum kita mulai, boleh tau nama kamu siapa? 💖"
        ], 'question', true);
        setShowNameInput(true);
      }
    };
    init();
  }, [showNotification]);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const name = nameInput.trim();
    setUserName(name);
    setIsAskingName(false);
    
    // Add name to history as an answer
    setHistory(prev => [...prev, { type: 'answer', content: name, id: `name-${Date.now()}` }]);
    playClick();

    // Proceed to first question
    await addMessagesSequentially([
      `Slay, ${name}! Nama yang cantik banget. ✨`,
      "Ready? Here's the first one... 👇",
      QUESTIONS[0].main
    ]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      // Small delay to ensure the options have started rendering
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [history, isTyping, showOptions]);

  const reactions = [
    "Okey, interesting choice! 😉",
    "Slay! Pilihan yang mantap. ✨",
    "Hmm, I see... Valid sih. 💅",
    "Next question, bestie! Let's gooo.",
    "Wah, honestly... itu jujur banget! Keren.",
    "I see, I see... You're unique, fr! 🌈",
    "Noted! Data tersimpan dengan aman. 📝",
    "Mantap! Keep it going ya... 🔥",
    "Hehe, vibes-nya kerasa banget nih. 🤭",
    "Wah, that's a vibe! Unik juga ya pilihanmu."
  ];

  const getContextualReaction = (step: number) => {
    switch(step) {
      case 0: return "Visionary banget ya kamu! Literally dapet ilham gitu aja? 🔮";
      case 2: return "Emang harus teliti sih, biar nggak boncos pas checkout! 🧐";
      case 4: return "Hati emang nggak bisa bohong ya... It's okay to be real! 🫠";
      case 7: return "Saldo e-wallet emang godaan paling berat, no cap! 😂";
      case 11: return "Efisien itu emang jalan ninja terbaik, fix! 🥷";
      default: return reactions[Math.floor(Math.random() * reactions.length)];
    }
  };

  const handleSelect = async (value: number) => {
    if (isTyping || (selectedOption !== null && currentStep < QUESTIONS.length - 1)) return;
    
    setSelectedOption(value);
    setAnswer(question.id, value);
    
    // Add answer to history
    const selectedOpt = question.opts ? (value === 1 ? question.opts.A : question.opts.B) : null;
    const answerText = selectedOpt ? selectedOpt.label : (value > 3 ? 'Sering Banget' : value < 3 ? 'Nggak Pernah' : 'Kadang-kadang');
    
    setHistory(prev => [...prev, { type: 'answer', content: answerText, id: `${question.id}-ans-${Date.now()}` }]);
    playClick();

    if (currentStep < QUESTIONS.length - 1) {
      const reactionText = getContextualReaction(currentStep);
      const nextQ = QUESTIONS[currentStep + 1];
      
      await addMessagesSequentially([reactionText, nextQ.main]);
      
      nextStep();
      setSelectedOption(null);
    } else {
      // Last question answered
      await addMessagesSequentially([
        "And... we're done! Akhirnya selesai juga! 🥳",
        "Semua jawaban kamu udah MINYOU simpan. Honestly, results-nya bakal seru banget nih!",
        "Wait a sec, aku lagi hitung-hitung kepribadian kamu yang super unik ini... ✨"
      ]);
    }
  };

  const handleFinish = () => {
    const { mbti, personality } = getFinalResult();
    navigate(`/result/${personality}?mbti=${mbti}`);
  };

  React.useEffect(() => {
    // Menggunakan file suara yang diupload ke /public/images/notification1.mp3
    const audioPath = '/images/notification1.mp3'; 
    const audio = new Audio(audioPath);
    audio.volume = 0.4; // Kecilkan suara (0.0 - 1.0)
    notificationSound.current = audio;
    
    let isMounted = true;

    if (showNotification) {
      let playCount = 0;
      const playSound = () => {
        if (!isMounted || !showNotification) return; // Jangan bunyi jika sudah ditutup

        if (playCount < 2) {
          audio.play().catch(() => console.log("Autoplay blocked"));
          playCount++;
          if (playCount < 2) {
            setTimeout(() => {
              if (isMounted && showNotification) playSound();
            }, 800); // Tunggu 800ms sebelum bunyi kedua
          }
        }
      };

      const timer = setTimeout(playSound, 500);
      return () => {
        isMounted = false;
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [showNotification]);

  const handleStartQuiz = () => {
    notificationSound.current?.pause();
    setShowNotification(false);
  };

  if (showNotification) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-xl" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative w-full max-w-[420px] aspect-square bg-white/10 backdrop-blur-2xl rounded-[60px] border border-white/20 shadow-2xl overflow-hidden flex flex-col p-10"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center relative z-20">
            <button 
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Central Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-sans text-4xl md:text-5xl leading-tight font-normal tracking-tight -mt-[117px] ml-[1px]"
            >
              MinYou
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 font-sans text-sm md:text-base -mt-[2px] font-normal w-[215.266px] h-[23px]"
            >
              Your Gift Bestie is calling 💌
            </motion.p>
          </div>

          {/* Middle Decorative Buttons (Matching Reference) */}
          <div className="flex items-center justify-between w-full mb-[17px] relative z-10 px-12 -ml-[1px] -mt-[8px]">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white">
                <AlarmClock size={26} />
              </div>
              <span className="text-white text-xs font-normal">Remind Me</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-white">
                <MessageCircle size={24} fill="currentColor" />
              </div>
              <span className="text-white text-xs font-normal">Message</span>
            </div>
          </div>

          {/* Slide to Answer Component */}
          <div className="relative z-10 w-full mt-auto">
            <div className="relative w-full h-[72px] bg-gradient-to-r from-[#FF85AA]/30 via-[#B388FF]/30 to-[#8C9EFF]/30 backdrop-blur-xl rounded-full border border-white/20 overflow-hidden flex items-center p-1.5">
              {/* Shimmering Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.span
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    x: [0, 5, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white font-medium text-lg tracking-tight ml-12"
                >
                  slide to answer
                </motion.span>
              </div>

              {/* Draggable Handle */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 260 }}
                dragElastic={0.05}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 180) {
                    handleStartQuiz();
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing group"
              >
                <Phone size={28} className="text-[#22C55E] fill-[#22C55E] group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
          </div>

          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF85AA]/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden font-sans p-4 md:p-8 pt-20 md:pt-32"
    >
      {/* Surreal Desert Cave Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/quizbg.png" 
          alt="Quiz Background" 
          className="w-full h-full object-cover opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>

      {/* Mobile Frame Container */}
      <div 
        className="w-full max-w-[450px] h-[85vh] md:h-[850px] max-h-[90vh] bg-gradient-to-br from-[#FFF0F3]/40 via-[#FFD1DC]/30 to-[#FFEBF2]/40 backdrop-blur-xl rounded-[60px] border-[5px] border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] relative z-10 flex flex-col overflow-hidden mt-0 md:mt-8"
      >
        {/* Header - More minimal and glassy */}
        <div 
          className="h-20 flex items-center px-6 relative z-20 bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-sm"
        >
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#FF85AA] mr-4 hover:scale-110 transition-transform border border-white/60"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A1D24] to-[#2D1115] flex items-center justify-center shadow-lg overflow-hidden border border-white/20">
              <img src="/logopink.png" alt="Box of You" className="w-[26px] h-auto object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-gray-800 leading-none tracking-tight">Chat dengan MinYou</h1>
              <p className="text-[11px] text-gray-500/60 mt-0.5 font-normal">
                {isTyping ? 'MinYou sedang berpikir...' : 'MinYou sedang online'}
              </p>
            </div>
          </div>
          <div className="ml-auto text-[10px] font-bold text-[#FF85AA] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
            {progress}
          </div>
        </div>

        {/* Chat Area */}
        <motion.div 
          ref={scrollRef}
          layout
          className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar relative z-10"
        >
          <AnimatePresence initial={false}>
            {history.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 15, x: msg.type === 'question' ? -5 : 5 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                className={`flex items-start gap-3 ${msg.type === 'question' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.type === 'question' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A1D24] to-[#2D1115] flex-shrink-0 flex items-center justify-center shadow-lg mt-1 border border-white/20 overflow-hidden">
                    <img src="/logopink.png" alt="Box of You" className="w-[26px] h-auto object-contain" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className={`max-w-[85%] p-4 px-6 rounded-[28px] shadow-sm text-sm leading-relaxed backdrop-blur-xl border ${
                  msg.type === 'question' 
                    ? 'bg-white/60 text-gray-800 rounded-tl-none border-white/60 shadow-rose/5' 
                    : 'bg-[#ff0071] text-white rounded-tr-none shadow-xl shadow-[#ff0071]/20 border-white/20'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex items-start gap-3 justify-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A1D24] to-[#2D1115] flex-shrink-0 flex items-center justify-center shadow-lg mt-1 border border-white/20 overflow-hidden">
                  <img src="/logopink.png" alt="Box of You" className="w-[26px] h-auto object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-white/60 backdrop-blur-xl p-4 px-6 rounded-[28px] rounded-tl-none border border-white/60 flex gap-2 items-center shadow-sm">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#FF85AA]/50 rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#FF85AA]/50 rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#FF85AA]/50 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Spacer for when options appear */}
          {showOptions && <div className="h-4" />}
        </motion.div>

        {/* Options Area */}
        <div className="p-6 pt-0 space-y-4 relative z-20">
          {isAskingName && showNameInput && !isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="pt-2"
            >
              <form 
                onSubmit={handleNameSubmit} 
                className="relative flex items-center gap-2 p-1.5 pl-6 rounded-full bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              >
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nama kamu..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500/60 font-medium text-sm py-3"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    nameInput.trim() 
                      ? 'bg-white text-[#FF85AA] shadow-md scale-100' 
                      : 'bg-white/40 text-gray-400 scale-95 opacity-50'
                  }`}
                >
                  <ArrowUp size={20} strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          )}

          {showOptions && selectedOption === null && !isTyping && !isAskingName && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white/20 backdrop-blur-3xl p-6 rounded-[40px] border border-white/30 shadow-2xl font-sans relative overflow-hidden">
                {/* Decorative background glow - even more subtle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFB3CC]/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#B2EBF2]/5 blur-3xl rounded-full" />
                
                <div className="text-center mb-6 relative z-10">
                  {question.sub && (
                    <p className="text-[11px] text-gray-700 italic opacity-80 font-medium">"{question.sub}"</p>
                  )}
                </div>

                {question.type === 'choice' && question.opts && (
                  <div className="grid grid-cols-1 gap-4 relative z-10">
                    {(['A', 'B'] as const).map((key) => {
                      const opt = question.opts![key];
                      return (
                        <button
                          key={key}
                          onClick={() => handleSelect(opt.score)}
                          className="group relative flex items-center gap-4 p-4 rounded-[28px] bg-white/25 backdrop-blur-xl border border-white/30 hover:bg-white/40 hover:shadow-xl transition-all text-left overflow-hidden shadow-sm"
                        >
                          {/* Subtle soft pink gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB3CC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md shadow-md flex items-center justify-center text-3xl group-hover:scale-110 transition-transform relative z-10 border border-white/30">
                            {opt.emoji}
                          </div>
                          <div className="flex-1 relative z-10">
                            <div className="font-medium text-sm text-gray-800 flex items-center gap-2.5">
                              <span className="text-[#FF85AA] font-black text-[11px] w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-md border border-[#FFD1DC]/30">{key}</span>
                              {opt.label}
                            </div>
                            <div className="text-[11px] text-gray-600 mt-1 leading-tight font-normal opacity-90">{opt.sub}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {question.type === 'likert' && (
                  <div className="flex flex-col items-center gap-10 py-6 relative z-10">
                    <div className="flex justify-between w-full max-w-xs relative px-2">
                      <div className="absolute top-1/2 left-0 w-full h-2 bg-white/30 rounded-full -translate-y-1/2 shadow-inner border border-white/20" />
                      <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-[#FFB3CC]/30 via-[#FF85AA]/50 to-[#FFB3CC]/30 rounded-full -translate-y-1/2 blur-[1px]" />
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleSelect(val)}
                          className="w-11 h-11 rounded-full bg-white/40 backdrop-blur-md border-2 border-white/50 shadow-xl flex items-center justify-center relative z-10 hover:scale-110 hover:border-[#FFB3CC]/50 transition-all group"
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-[#FFB3CC]/30 group-hover:bg-[#FF85AA] transition-colors shadow-sm" />
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between w-full text-[10px] font-black text-[#FF85AA] uppercase tracking-[0.2em] opacity-70">
                      <span className="px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-sm">{question.poles?.[0]}</span>
                      <span className="px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-sm">{question.poles?.[1]}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Finish Button - Matching the 'Save' button in reference */}
          {currentStep === QUESTIONS.length - 1 && selectedOption !== null && !isTyping && showOptions && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinish}
              className="w-full py-5 rounded-full bg-gradient-to-r from-[#FFB3CC] via-[#FFD1DC] to-[#FFB3CC] text-[#4A1D24] text-base font-black shadow-xl shadow-[#FFB3CC]/30 flex items-center justify-center gap-3 border border-white/60 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                <ArrowRight size={18} className="text-[#4A1D24]" />
              </div>
              REVEAL MY PERSONALITY
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
