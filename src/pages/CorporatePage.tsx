import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, PartyPopper, CheckCircle2, Send } from 'lucide-react';

export const CorporatePage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Hadiah Korporat";
  }, []);
  return (
    <div className="pt-32 md:pt-52 pb-20 px-4">
      <section className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl mb-6"
        >
          Beri Hadiah Lebih Cerdas. Perkuat Budaya.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted max-w-2xl mx-auto"
        >
          Kotak hadiah berbasis kepribadian dalam jumlah besar untuk tim, klien, dan pencapaian Anda.
        </motion.p>
      </section>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Building2, title: "Hadiah Tim", desc: "Kit orientasi, penghargaan pencapaian, kotak apresiasi." },
          { icon: Users, title: "Hadiah Klien", desc: "Kesan pertama yang abadi. Dikurasi berdasarkan kepribadian." },
          { icon: PartyPopper, title: "Hadiah Acara", desc: "Konferensi, acara luar kantor, peluncuran. Bermerek & personal." }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-10 rounded-[40px] text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-rose/10 flex items-center justify-center text-rose mb-6">
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl mb-4">{item.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl">Mengapa Memilih Box of You untuk Bisnis?</h2>
          <div className="space-y-4">
            {[
              "Personalisasi dalam skala besar menggunakan kuis eksklusif kami.",
              "Kurasi premium dari merek lokal dan internasional.",
              "Opsi branding kustom dan label putih tersedia.",
              "Logistik yang lancar dan pengiriman ke banyak alamat."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-rose shrink-0 mt-1" size={20} />
                <p className="text-lg text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[40px] border-rose/10"
        >
          <h3 className="text-2xl mb-8">Ajukan Proposal</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nama" className="w-full p-4 rounded-2xl glass border-white/50 outline-none focus:border-rose" />
              <input type="text" placeholder="Perusahaan" className="w-full p-4 rounded-2xl glass border-white/50 outline-none focus:border-rose" />
            </div>
            <input type="email" placeholder="Email Kerja" className="w-full p-4 rounded-2xl glass border-white/50 outline-none focus:border-rose" />
            <select className="w-full p-4 rounded-2xl glass border-white/50 outline-none focus:border-rose text-muted">
              <option>Jumlah Penerima</option>
              <option>10 sampai 50</option>
              <option>50 sampai 200</option>
              <option>200+</option>
            </select>
            <textarea placeholder="Pesan" className="w-full h-32 p-4 rounded-2xl glass border-white/50 outline-none focus:border-rose resize-none" />
            <button className="w-full py-4 rounded-2xl bg-rose text-white font-bold shadow-lg glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Send size={18} /> Ajukan Proposal
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
