import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: "Seberapa akurat kuis kepribadian ini?", a: "Kuis kami dikembangkan berdasarkan kerangka kerja MBTI yang disederhanakan untuk pemberian hadiah. Meskipun tidak 100% mutlak, 92% pengguna kami merasa hasilnya mencerminkan preferensi mereka dengan akurat." },
  { q: "Berapa lama waktu pengirimannya?", a: "Untuk area Jabodetabek, biasanya memakan waktu 1 hingga 2 hari kerja. Di luar kota, memakan waktu 3 hingga 5 hari kerja tergantung pada ekspedisi yang dipilih." },
  { q: "Bisakah saya menyesuaikan isi kotak sendiri?", a: "Tentu saja! Kamu bisa pergi ke halaman 'Buat Kotakmu' untuk memilih item yang ingin kamu sertakan dalam hadiah." },
  { q: "Apakah kartu ucapan sudah termasuk?", a: "Ya, setiap Box of You menyertakan kartu ucapan premium yang bisa kamu isi dengan pesan saat checkout." },
  { q: "Bisakah saya mengirim ke banyak alamat sekaligus?", a: "Tentu saja. Untuk pesanan korporat atau dalam jumlah besar, silakan hubungi tim kami melalui halaman Korporat." },
  { q: "Bagaimana jika barang rusak saat sampai?", a: "Kami menjamin keamanan setiap kotak. Jika ada kerusakan, silakan hubungi CS kami dalam waktu 24 jam setelah barang diterima untuk proses penggantian." },
  { q: "Bisakah saya mengembalikan jika saya tidak suka isinya?", a: "Karena sifatnya yang personal dan kurasi khusus, kami tidak menerima pengembalian kecuali ada cacat produksi pada item di dalamnya." },
  { q: "Bisakah saya mengikuti kuis lagi?", a: "Tentu saja! Kamu bisa mengulang kuis kapan saja untuk mendapatkan hasil yang berbeda atau untuk orang yang berbeda." }
];

export const FAQPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Tanya Jawab";
  }, []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 md:pt-52 pb-20 px-4 max-w-3xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-5xl mb-4">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-muted">Segala hal yang perlu kamu ketahui tentang Box of You.</p>
      </header>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="glass rounded-[24px] overflow-hidden border-white/40">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
            >
              <span className="font-bold text-ink pr-8">{faq.q}</span>
              <div className="shrink-0 text-rose">
                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-sm text-muted leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
