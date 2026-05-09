import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Cerita Kami";
  }, []);
  return (
    <div className="pt-32 md:pt-52 pb-20 px-4">
      <section className="max-w-4xl mx-auto text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl mb-8 leading-tight"
        >
          Kami percaya setiap hadiah harus terasa seolah dibuat khusus untuk orang tersebut.
        </motion.h1>
        <div className="space-y-6 text-lg text-muted max-w-2xl mx-auto">
          <p>
            Box of You lahir dari rasa frustrasi sederhana: mengapa mencari hadiah seringkali terasa seperti tugas administratif daripada momen emosional?
          </p>
          <p>
            Kami menggabungkan psikologi kepribadian dengan kurasi produk estetis untuk membantumu menemukan hadiah yang benar-benar beresonansi dengan jiwa penerimanya.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Target, title: "Kepribadian Utama", desc: "Kami tidak memulai dengan item, kami memulai dengan orangnya." },
          { icon: Heart, title: "Cerdas Secara Emosional", desc: "Setiap kotak dirancang untuk menciptakan koneksi yang mendalam." },
          { icon: Sparkles, title: "Dikurasi dengan Indah", desc: "Hanya produk berkualitas tinggi yang masuk ke dalam kurasi kami." }
        ].map((v, i) => (
          <div key={i} className="glass p-10 rounded-[40px] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose/10 flex items-center justify-center text-rose mb-6">
              <v.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">{v.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-16">Pikiran di Balik Kotak Ini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Aria Putri", role: "Pendiri & Kurator", emoji: "👩🏻‍🎨" },
            { name: "Bimo Satria", role: "Kepala Psikologi", emoji: "👨🏻‍🔬" },
            { name: "Clara Tan", role: "Desainer Pengalaman", emoji: "👩🏻‍💻" }
          ].map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[32px] text-center"
            >
              <div className="text-6xl mb-6">{member.emoji}</div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-rose text-sm font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
