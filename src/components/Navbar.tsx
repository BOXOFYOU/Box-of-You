import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Take the Quiz', path: '/quiz' },
    { name: 'Shop', path: '/shop' },
    { name: 'Build Your Box', path: '/build' },
    { name: 'Corporate', path: '/corporate' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav 
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 glass-nav rounded-full border border-white/20 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl px-4 md:px-6 py-3 w-[calc(100%-32px)] md:w-[915px] max-w-full"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center group">
        <img 
          src="/logo.png" 
          alt="Box of You" 
          className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-500 object-contain"
          referrerPolicy="no-referrer"
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all relative px-4 py-1.5 rounded-full ${
              location.pathname === link.path 
                ? 'bg-ink text-white shadow-lg' 
                : 'text-ink/40 hover:text-rose'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 pr-1.5">
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 text-ink/40 hover:text-rose transition-all relative hover:scale-110"
        >
          <ShoppingCart size={16} strokeWidth={2.5} />
          {itemCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-rose text-white text-[6px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white shadow-sm">
              {itemCount}
            </span>
          )}
        </button>

        <button
          className="lg:hidden p-2 text-ink/40 hover:text-rose transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-ink text-white hover:bg-rose transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95">
          <span className="text-lg font-light leading-none">+</span>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full glass-nav rounded-3xl border border-white/20 py-6 px-4 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl ${
                  location.pathname === link.path ? 'bg-ink text-white' : 'text-ink-soft'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
