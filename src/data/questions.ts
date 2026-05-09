export interface QuestionOption {
  label: string;
  sub: string;
  emoji: string;
  score: number;
}

export interface Question {
  id: number;
  fn: "Ni" | "Ne" | "Ti" | "Te" | "Fi" | "Fe" | "Si" | "Se";
  type: "choice" | "likert";
  vibe: string;
  main: string;
  sub?: string;
  poles?: [string, string];
  opts?: {
    A: QuestionOption;
    B: QuestionOption;
  };
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    fn: "Ni",
    type: "likert",
    vibe: "The Gift Vision",
    main: "Ceritanya kamu lagi asik bengong, tiba-tiba muncul 'ide' kado yang perfect buat seseorang, padahal belum mulai scrolling sama sekali. Seberapa sering 'ide' ini dateng?",
    sub: "Pernah ngerasa dapet 'bisikan' ide kado ajaib?",
    poles: ["Nggak pernah", "Sering banget"]
  },
  {
    id: 2,
    fn: "Ne",
    type: "choice",
    vibe: "Shopping Mission",
    main: "Lagi otw checkout kado yang udah di-list. Eh, di jalan malah salfok liat barang random yang lebih gemas. Ujung-ujungnya?",
    opts: {
      A: { emoji: "🎯", label: "Back to Track", sub: "Tetap beli yang emang udah direncanain dari awal.", score: 0 },
      B: { emoji: "🛍️", label: "Misi Sampingan", sub: "Beli barang random tadi karena lebih seru & tak terduga.", score: 4 }
    }
  },
  {
    id: 3,
    fn: "Ti",
    type: "likert",
    vibe: "Deep Dive Mode",
    main: "Lagi scroll TikTok nemu barang lucu. Sebelum checkout, kamu bakal deep-dive baca review & bandingin spek-nya dulu nggak?",
    sub: "Si paling teliti sebelum beli barang.",
    poles: ["Langsung gas", "Riset dulu"]
  },
  {
    id: 4,
    fn: "Te",
    type: "choice",
    vibe: "The Ultimate Vibe",
    main: "Kado kayak gimana yang bikin kamu ngerasa 'menang banyak' pas nerimanya?",
    opts: {
      A: { emoji: "💫", label: "Aesthetic Vibe", sub: "Yang estetik, punya makna mendalam, & dapet feel-nya.", score: 0 },
      B: { emoji: "📦", label: "Sat-Set Utility", sub: "Yang fungsional & beneran ngebantu hidup jadi lebih praktis.", score: 4 }
    }
  },
  {
    id: 5,
    fn: "Fi",
    type: "choice",
    vibe: "Vibe Check",
    main: "Dapet kado mahal tapi 'nggak kamu banget'. Di depan orangnya sih senyum, tapi di dalem hati...",
    opts: {
      A: { emoji: "🤗", label: "Hargai Niat", sub: "Gak papa, yang penting niat & ketulusan orangnya.", score: 0 },
      B: { emoji: "🫠", label: "Tetap Jujur", sub: "Duh, sayang banget barangnya nggak sreg sama selera aku.", score: 4 }
    }
  },
  {
    id: 6,
    fn: "Fe",
    type: "likert",
    vibe: "The Reaction",
    main: "Pas ngasih kado, ngeliat muka kaget & seneng mereka itu rasanya lebih 'bikin hati adem' daripada sekadar tau kadonya berguna.",
    sub: "Kebahagiaan mereka adalah reward buat kamu.",
    poles: ["Biasa aja", "Bener banget"]
  },
  {
    id: 7,
    fn: "Si",
    type: "choice",
    vibe: "Gifting Ritual",
    main: "Buat kamu, kado ultah itu harus dikasih pas hari-H biar dapet 'feel'-nya, atau bebas kapan aja yang penting barangnya oke?",
    opts: {
      A: { emoji: "💭", label: "Santai Saja", sub: "Kapan aja oke, yang penting momennya pas buat ngasih.", score: 0 },
      B: { emoji: "📅", label: "Tradition Core", sub: "Harus pas hari-H, tradisi & momen spesial itu penting!", score: 4 }
    }
  },
  {
    id: 8,
    fn: "Se",
    type: "choice",
    vibe: "Surprise Bonus",
    main: "Tiba-tiba dapet saldo e-wallet 500rb. Move pertama kamu: langsung jajanin sekarang atau tabung buat wishlist bulan depan?",
    opts: {
      A: { emoji: "💾", label: "The Strategist", sub: "Tabung dulu buat rencana atau kebutuhan masa depan.", score: 0 },
      B: { emoji: "🍣", label: "Enjoy Now", sub: "Jajanin sekarang! Life is short, nikmatin momennya.", score: 4 }
    }
  },
  {
    id: 9,
    fn: "Ni",
    type: "choice",
    vibe: "Secret Recipe",
    main: "Gimana cara kamu biasanya nemuin ide kado yang paling 'ngena' buat orang lain?",
    opts: {
      A: { emoji: "👀", label: "The Observer", sub: "Diem-diem nyimak kebiasaan & cerita mereka dulu.", score: 0 },
      B: { emoji: "💡", label: "The Visionary", sub: "Tiba-tiba dapet ide ajaib yang ternyata pas banget.", score: 4 }
    }
  },
  {
    id: 10,
    fn: "Ne",
    type: "likert",
    vibe: "Plot Twist!",
    main: "Mana yang lebih seru: dapet kado random yang bener-bener plot twist, atau dapet barang yang emang udah kamu incer lama?",
    sub: "Team kejutan atau team wishlist?",
    poles: ["Sesuai wishlist", "Kejutan seru"]
  },
  {
    id: 11,
    fn: "Ti",
    type: "choice",
    vibe: "Viral Trend",
    main: "Ada kado viral yang lagi fyp terus di media sosial. Gimana respon kamu?",
    opts: {
      A: { emoji: "🥰", label: "Early Adopter", sub: "Kalau banyak yang suka, pasti emang bagus barangnya.", score: 0 },
      B: { emoji: "🔍", label: "The Critic", sub: "Nggak langsung percaya, harus masuk akal dulu buat aku.", score: 4 }
    }
  },
  {
    id: 12,
    fn: "Te",
    type: "likert",
    vibe: "Efficiency Mode",
    main: "Menurutmu, ngasih kado sesuai wishlist itu jalan ninja paling bener biar nggak mubazir & pasti berhasil?",
    sub: "Efisien itu kunci kado anti-gagal.",
    poles: ["Sentuhan personal", "Efisien & pasti"]
  }
];
