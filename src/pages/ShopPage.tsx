import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { PERSONALITIES } from '../data/personalities';
import { useCart } from '../context/CartContext';
import { Filter, ShoppingBag, Info } from 'lucide-react';

export const ShopPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Shop Collection";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'All';
  const activePersonality = searchParams.get('personality') || null;
  const activeOccasion = searchParams.get('occasion') || null;
  const { addItem } = useCart();

  const filters = ['All', 'By Personality', 'By Occasion', 'Best Sellers', 'Bundles'];
  const occasions = ['Birthday', 'Anniversary', 'Work', 'Self-Care', 'Wedding', 'Graduation'];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    
    if (activeFilter === 'Best Sellers') {
      result = result.filter(p => p.isBestSeller);
    } else if (activeFilter === 'Bundles') {
      result = result.filter(p => p.isBundle);
    } else if (activeFilter === 'By Personality' && activePersonality) {
      result = result.filter(p => p.personality === activePersonality);
    } else if (activeFilter === 'By Occasion' && activeOccasion) {
      result = result.filter(p => p.occasion?.includes(activeOccasion));
    }
    
    return result;
  }, [activeFilter, activePersonality, activeOccasion]);

  return (
    <div className="pt-32 md:pt-52 pb-20 px-4 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-5xl mb-4">Gift Shop</h1>
        <p className="text-muted">Curated boxes for every unique soul.</p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setSearchParams({ filter: f });
              if (f === 'All') setSearchParams({});
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === f 
                ? 'bg-rose text-white shadow-md' 
                : 'glass border border-white/50 text-ink-soft hover:bg-white/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Personality Filter (if "By Personality" is selected) */}
      {activeFilter === 'By Personality' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {Object.values(PERSONALITIES).map((p) => (
            <button
              key={p.id}
              onClick={() => setSearchParams({ filter: 'By Personality', personality: p.id })}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${
                activePersonality === p.id 
                  ? 'bg-ink text-white border-ink' 
                  : 'glass border-white/50 text-muted hover:border-rose/30'
              }`}
            >
              <span>{p.emoji}</span> {p.name}
            </button>
          ))}
          {activePersonality && (
            <button 
              onClick={() => setSearchParams({ filter: 'By Personality' })}
              className="text-xs text-rose font-bold ml-2 underline"
            >
              Clear
            </button>
          )}
        </motion.div>
      )}

      {/* Occasion Filter (if "By Occasion" is selected) */}
      {activeFilter === 'By Occasion' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {occasions.map((o) => (
            <button
              key={o}
              onClick={() => setSearchParams({ filter: 'By Occasion', occasion: o })}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                activeOccasion === o 
                  ? 'bg-ink text-white border-ink' 
                  : 'glass border-white/50 text-muted hover:border-rose/30'
              }`}
            >
              {o}
            </button>
          ))}
          {activeOccasion && (
            <button 
              onClick={() => setSearchParams({ filter: 'By Occasion' })}
              className="text-xs text-rose font-bold ml-2 underline"
            >
              Clear
            </button>
          )}
        </motion.div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-[32px] overflow-hidden flex flex-col group"
            >
              <div 
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.accent}20 0%, ${product.accent}40 100%)` }}
              >
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                  {product.emoji}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass border border-white/40 text-[10px] font-bold text-ink-soft">
                  {product.personality}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl mb-2">{product.name}</h3>
                <p className="text-rose font-bold text-lg mb-4">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-sm text-muted leading-relaxed mb-8 flex-1">
                  {product.desc}
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 py-3 rounded-2xl bg-rose text-white font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                  <button className="p-3 rounded-2xl glass border border-white/50 text-muted hover:text-rose transition-colors">
                    <Info size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
