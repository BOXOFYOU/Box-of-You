export interface Personality {
  id: string;
  name: string;
  persona: string;
  emoji: string;
  mbti: string;
  accent: string;
  tagline: string;
  desc: string;
  traits: string[];
  gifts: { emoji: string; name: string; why: string }[];
  shadow: { name: string; note: string };
  image: string;
}

export const PERSONALITIES: Record<string, Personality> = {
  BUCK: {
    id: "BUCK",
    name: "BUCK",
    persona: "The Masterplan Gifter",
    emoji: "🏰",
    mbti: "ISTJ",
    accent: "#8B9D77",
    tagline: "Presisi dalam setiap pilihan.",
    desc: "Hadiah terbaik untukmu adalah yang berkualitas tinggi, tahan lama, dan memiliki fungsi yang jelas. Kamu menghindari barang gimik dengan segala cara.",
    traits: ["andal", "terorganisir", "detail", "konsisten", "berprinsip", "setia"],
    gifts: [
      { emoji: "📓", name: "Jurnal Premium", why: "Kualitas kertas terbaik untuk rencana-rencanamu yang matang." },
      { emoji: "🗓️", name: "Planner Kulit", why: "Daya tahan dan struktur dalam satu paket." },
      { emoji: "☕", name: "Kit Kopi Berkualitas", why: "Ritual pagi yang presisi dan nikmat." },
      { emoji: "🧥", name: "Pakaian Dasar", why: "Fungsi dan gaya yang tak lekang oleh waktu." }
    ],
    shadow: { name: "ENFP", note: "Saat kelelahan, sisi Ne-mu bisa membanjirimu dengan 'bagaimana jika' yang tak ada habisnya." },
    image: "/images/cards/BUCK.png"
  },
  SLICK: {
    id: "SLICK",
    name: "SLICK",
    persona: "The Gift Dreamer",
    emoji: "🌙",
    mbti: "INFP",
    accent: "#9B8BB4",
    tagline: "Jiwa yang berbicara melalui hal-hal kecil.",
    desc: "Hadiah terbaik untukmu adalah yang menghargai keunikanmu dan memberi ruang untuk ekspresi. Kamu menghargai apa yang autentik.",
    traits: ["idealistik", "autentik", "empatik", "kreatif", "sensitif", "reflektif"],
    gifts: [
      { emoji: "🎨", name: "Alat Lukis Premium", why: "Media untuk menuangkan imajinasi liarmu." },
      { emoji: "🌿", name: "Tanaman + Pot", why: "Kehidupan yang tumbuh perlahan bersamamu." },
      { emoji: "📖", name: "Novel Pilihan", why: "Cerita yang menyentuh kedalaman jiwa." },
      { emoji: "🎵", name: "Vinyl / Musik Fisik", why: "Koneksi nyata dengan seni suara." }
    ],
    shadow: { name: "ESTJ", note: "Saat kewalahan, sisi Te-mu bisa membuatmu tiba-tiba menjadi sangat suka mengontrol." },
    image: "/images/cards/SLICK.png"
  },
  TRIMM: {
    id: "TRIMM",
    name: "TRIMM",
    persona: "The Executive Gifter",
    emoji: "📐",
    mbti: "ESTJ",
    accent: "#C4956A",
    tagline: "Hasil nyata dari pilihan yang tepat.",
    desc: "Hadiah terbaik untukmu adalah yang meningkatkan efisiensi atau mewakili standar tinggi yang kamu pegang.",
    traits: ["tegas", "efisien", "pemimpin", "terorganisir", "konsisten", "dapat diandalkan"],
    gifts: [
      { emoji: "🖊️", name: "Set Pena Mewah", why: "Alat untuk menandai pencapaian besarmu." },
      { emoji: "💼", name: "Tas Kerja Berkualitas", why: "Representasi dari profesionalisme yang tangguh." },
      { emoji: "🥃", name: "Minuman Premium", why: "Apresiasi untuk kerja keras yang terukur." },
      { emoji: "📊", name: "Aplikasi Produktivitas", why: "Sistem untuk menjaga ritme kesuksesan." }
    ],
    shadow: { name: "INFP", note: "Saat terlalu terbebani, sisi Fi-mu bisa membuatmu tiba-tiba menjadi sangat sensitif." },
    image: "/images/cards/TRIMM.png"
  },
  SNIP: {
    id: "SNIP",
    name: "SNIP",
    persona: "The Power Gifter",
    emoji: "⚡",
    mbti: "ENTJ",
    accent: "#7A9BBF",
    tagline: "Satu langkah di depan orang lain.",
    desc: "Hadiah terbaik untukmu adalah yang meningkatkan kapasitas atau efisiensimu. Bukan sekadar keren, tapi sesuatu yang membuatmu bergerak lebih cepat.",
    traits: ["tegas", "ambisius", "efisien", "visioner", "langsung", "pemimpin alami"],
    gifts: [
      { emoji: "⌚", name: "Smartwatch Premium", why: "Data waktu nyata untuk performa maksimal." },
      { emoji: "🗂️", name: "Sistem Planner", why: "Arsitektur strategis untuk hari-harimu." },
      { emoji: "💼", name: "Tas Kulit", why: "Mobilitas tinggi dengan perlindungan elegan." },
      { emoji: "🎙️", name: "Kit Mikrofon", why: "Alat untuk menyuarakan visi besarmu." }
    ],
    shadow: { name: "ISFP", note: "Saat terpojok, kamu bisa kewalahan oleh gelombang emosi yang tidak bisa kamu logikakan." },
    image: "/images/cards/SNIP.png"
  },
  HOPE: {
    id: "HOPE",
    name: "HOPE",
    persona: "The Heartwarming Gifter",
    emoji: "🎉",
    mbti: "ESFJ",
    accent: "#E8A0B4",
    tagline: "Kehangatan yang selalu diingat orang lain.",
    desc: "Hadiah terbaik untukmu adalah yang menciptakan momen bersama orang-orang yang kamu cintai. Kamu lebih menikmati sesuatu saat dibagikan bersama.",
    traits: ["hangat", "perhatian", "sosial", "setia", "harmonis", "pengasuh"],
    gifts: [
      { emoji: "🍳", name: "Kelas Memasak", why: "Momen untuk belajar dan berbagi rasa bersama." },
      { emoji: "🕯️", name: "Set Lilin Makan Malam", why: "Suasana hangat untuk percakapan mendalam." },
      { emoji: "🎀", name: "Kit Pembungkus Hadiah", why: "Seni memberi dengan sentuhan personal." },
      { emoji: "📝", name: "Buku Resep", why: "Warisan rasa untuk orang-orang tersayang." }
    ],
    shadow: { name: "INTP", note: "Di titik batasmu, sisi Ti-mu bisa membuatmu tiba-tiba menjadi dingin and kritis." },
    image: "/images/cards/HOPE.png"
  },
  CENTI: {
    id: "CENTI",
    name: "CENTI",
    persona: "The Concept Gifter",
    emoji: "🔭",
    mbti: "INTP",
    accent: "#88B4B4",
    tagline: "Otak yang tidak pernah benar-benar mati.",
    desc: "Kamu menghargai hadiah yang membuka akses ke pengetahuan baru atau alat untuk eksplorasi.",
    traits: ["analitis", "penasaran", "logis", "objektif", "inovatif", "skeptis"],
    gifts: [
      { emoji: "♟️", name: "Game Strategi", why: "Tantangan intelektual yang memuaskan." },
      { emoji: "🔬", name: "Kit Eksperimen", why: "Eksplorasi langsung terhadap hukum alam." },
      { emoji: "🖊️", name: "Pena Berkualitas", why: "Alat untuk memetakan ide-ide kompleks." },
      { emoji: "📡", name: "Akses Belajar", why: "Pintu menuju lautan informasi baru." }
    ],
    shadow: { name: "ENFJ", note: "Di titik stres terdalammu, kamu bisa menjadi terlalu sensitif terhadap penolakan sosial." },
    image: "/images/cards/CENTI.png"
  },
  BONDY: {
    id: "BONDY",
    name: "BONDY",
    persona: "The Intentional Gifter",
    emoji: "🔮",
    mbti: "INFJ",
    accent: "#B4A0C8",
    tagline: "Merasakan apa yang belum terucapkan.",
    desc: "Hadiah terbaik untukmu adalah yang penuh niat and makna. Ini bukan tentang harga, tapi seberapa dalam si pemberi memahamimu.",
    traits: ["empatik", "visioner", "misterius", "idealistik", "berprinsip", "intuitif"],
    gifts: [
      { emoji: "🧘", name: "Kit Wellness", why: "Ketenangan untuk diri batin yang dalam." },
      { emoji: "🖼️", name: "Art Print", why: "Simbol visual dari nilai-nilai yang kamu pegang." },
      { emoji: "✍️", name: "Jurnal Terpandu", why: "Ruang untuk refleksi and pertumbuhan pribadi." },
      { emoji: "🌸", name: "Hadiah Botani", why: "Keindahan alam yang penuh filosofi." }
    ],
    shadow: { name: "ESTP", note: "Saat berada di bawah tekanan terlalu besar, sisi Se-mu bisa membuatmu menjadi impulsif." },
    image: "/images/cards/BONDY.png"
  },
  JOLLY: {
    id: "JOLLY",
    name: "JOLLY",
    persona: "The Spotlight Gifter",
    emoji: "✨",
    mbti: "ESFP",
    accent: "#F4B860",
    tagline: "Hidup yang selalu memiliki momennya.",
    desc: "Hadiah terbaik untukmu adalah yang membawa kegembiraan and menciptakan cerita. Kamu hidup untuk pengalaman, bukan koleksi.",
    traits: ["antusias", "spontan", "ekspresif", "sosial", "optimis", "magnetis"],
    gifts: [
      { emoji: "✨", name: "Glam Beauty", why: "Kilau untuk kepribadianmu yang ceria." },
      { emoji: "🎉", name: "Kit Perencanaan Pesta", why: "Alat untuk menciptakan kegembiraan bersama." },
      { emoji: "📸", name: "Kamera Instan", why: "Menangkap momen spontan secara waktu nyata." },
      { emoji: "🛍️", name: "Voucher Belanja", why: "Kebebasan untuk memilih petualanganmu berikutnya." }
    ],
    shadow: { name: "INTJ", note: "Saat menghadapi kegagalan besar, sisi Ni-mu bisa membuatmu menjadi sangat gelap and obsesif." },
    image: "/images/cards/JOLLY.png"
  }
};
