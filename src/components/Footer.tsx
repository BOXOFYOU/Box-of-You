import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-ink/5 pt-24 pb-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        {/* Brand */}
        <div className="space-y-8">
          <Link to="/" className="inline-block group">
            <img 
              src="/logo.png" 
              alt="Box of You" 
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-base text-ink-soft/60 leading-relaxed max-w-xs font-medium">
            Find the Gift That Feels Just Right. Personality-based gifts for the ones you love.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:bg-rose hover:text-white transition-all duration-300"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:bg-rose hover:text-white transition-all duration-300"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:bg-rose hover:text-white transition-all duration-300"><MessageCircle size={18} /></a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-black text-ink uppercase tracking-[0.2em] mb-8">Explore</h4>
          <ul className="space-y-4 text-sm font-bold text-ink-soft/40">
            <li><Link to="/" className="hover:text-rose transition-colors">Home</Link></li>
            <li><Link to="/quiz" className="hover:text-rose transition-colors">Take the Quiz</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">All Products</Link></li>
            <li><Link to="/build" className="hover:text-rose transition-colors">Build Your Box</Link></li>
            <li><Link to="/corporate" className="hover:text-rose transition-colors">Corporate Gifting</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-black text-ink uppercase tracking-[0.2em] mb-8">Support</h4>
          <ul className="space-y-4 text-sm font-bold text-ink-soft/40">
            <li><Link to="/about" className="hover:text-rose transition-colors">Our Story</Link></li>
            <li><Link to="/faq" className="hover:text-rose transition-colors">FAQ</Link></li>
            <li><Link to="/faq" className="hover:text-rose transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/faq" className="hover:text-rose transition-colors">Privacy Policy</Link></li>
            <li><Link to="/faq" className="hover:text-rose transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-black text-ink uppercase tracking-[0.2em] mb-8">Newsletter</h4>
          <p className="text-sm font-medium text-ink-soft/40 mb-8 leading-relaxed">Get gifting tips and early access to new collections.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-5 py-3 rounded-full bg-ink/5 border-transparent outline-none focus:bg-white focus:border-rose/30 border transition-all text-sm font-medium" 
            />
            <button className="w-11 h-11 rounded-full bg-ink text-white shadow-xl hover:bg-rose transition-all hover:scale-110 flex items-center justify-center">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-ink/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] font-bold text-ink/20 uppercase tracking-[0.2em]">
          © 2025 Box of You · Made with 💝 in Indonesia
        </p>
        <div className="flex items-center gap-8 text-[10px] font-bold text-ink/20 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-rose transition-colors">Terms</a>
          <a href="#" className="hover:text-rose transition-colors">Privacy</a>
          <a href="#" className="hover:text-rose transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};
