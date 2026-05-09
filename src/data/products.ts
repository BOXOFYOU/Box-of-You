export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  personality: string;
  desc: string;
  accent: string;
  occasion?: string[];
  isBestSeller?: boolean;
  isBundle?: boolean;
}

export const PRODUCTS: Product[] = [
  { id: "box-buck", name: "The Masterplan Gifter", price: 499000, emoji: "🏰", personality: "BUCK", desc: "Jurnal premium, perencana kulit, dan set kopi berkualitas.", accent: "#8B9D77", occasion: ["Ulang Tahun", "Pekerjaan"], isBestSeller: true },
  { id: "box-slick", name: "The Gift Dreamer", price: 399000, emoji: "🌙", personality: "SLICK", desc: "Perlengkapan seni, novel pilihan, dan tanaman hias kecil.", accent: "#9B8BB4", occasion: ["Self-care", "Anniversary"] },
  { id: "box-trimm", name: "The Executive Gifter", price: 599000, emoji: "📐", personality: "TRIMM", desc: "Set pena mewah, alat produktivitas, dan minuman premium.", accent: "#C4956A", occasion: ["Kelulusan", "Pekerjaan"], isBestSeller: true },
  { id: "box-snip", name: "The Power Gifter", price: 549000, emoji: "⚡", personality: "SNIP", desc: "Smartwatch, perencana strategis, dan perlengkapan profesional.", accent: "#7A9BBF", occasion: ["Pekerjaan", "Pencapaian"] },
  { id: "box-hope", name: "The Heartwarming Gifter", price: 349000, emoji: "🎉", personality: "HOPE", desc: "Voucher kelas memasak, set lilin, dan buku resep.", accent: "#E8A0B4", occasion: ["Pernikahan", "Pindah Rumah"] },
  { id: "box-centi", name: "The Concept Gifter", price: 449000, emoji: "🔭", personality: "CENTI", desc: "Game strategi, kit eksperimen, dan akses belajar.", accent: "#88B4B4", occasion: ["Ulang Tahun", "Self-care"] },
  { id: "box-bondy", name: "The Intentional Gifter", price: 399000, emoji: "🔮", personality: "BONDY", desc: "Kit wellness, jurnal terpandu, dan seni botani.", accent: "#B4A0C8", occasion: ["Self-care", "Anniversary"], isBestSeller: true },
  { id: "box-jolly", name: "The Spotlight Gifter", price: 299000, emoji: "✨", personality: "JOLLY", desc: "Kamera instan, kit pesta, dan kebutuhan kecantikan.", accent: "#F4B860", occasion: ["Ulang Tahun", "Pesta"] },
  { id: "bundle-duo", name: "Paket Duo", price: 799000, emoji: "👯", personality: "JOLLY", desc: "Dua kali lipat kegembiraan dengan dua kotak pilihan untukmu dan teman.", accent: "#FF6B6B", occasion: ["Anniversary", "Ulang Tahun"], isBundle: true }
];
