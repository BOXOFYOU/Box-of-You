import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft, Package, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BOX_SIZES = [
  { id: 'small', name: 'Small Box', items: 3, price: 199000, desc: 'Perfect for a small, meaningful gesture.' },
  { id: 'medium', name: 'Medium Box', items: 5, price: 349000, desc: 'Our most popular choice.' },
  { id: 'large', name: 'Large Box', items: 7, price: 499000, desc: 'The ultimate personality experience.' }
];

const SAMPLE_ITEMS = [
  { id: 'it1', name: 'Premium Journal', emoji: '📓', price: 0 },
  { id: 'it2', name: 'Aromatherapy Candle', emoji: '🕯️', price: 0 },
  { id: 'it3', name: 'Artisan Coffee', emoji: '☕', price: 0 },
  { id: 'it4', name: 'Silk Sleep Mask', emoji: '😴', price: 0 },
  { id: 'it5', name: 'Succulent Plant', emoji: '🌵', price: 0 },
  { id: 'it6', name: 'Gourmet Chocolate', emoji: '🍫', price: 0 },
  { id: 'it7', name: 'Handmade Mug', emoji: '🍵', price: 0 },
  { id: 'it8', name: 'Essential Oil', emoji: '💧', price: 0 },
  { id: 'it9', name: 'Leather Keychain', emoji: '🔑', price: 0 },
  { id: 'it10', name: 'Organic Tea', emoji: '🍵', price: 0 },
  { id: 'it11', name: 'Bath Bomb', emoji: '🛁', price: 0 },
  { id: 'it12', name: 'Minimalist Pen', emoji: '🖊️', price: 0 }
];

export const BuildYourBoxPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Box of You | Build Your Box";
  }, []);
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<typeof BOX_SIZES[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const { addItem } = useCart();

  const handleItemToggle = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(i => i !== id));
    } else if (selectedSize && selectedItems.length < selectedSize.items) {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  const totalPrice = (selectedSize?.price || 0) + (giftWrapping ? 25000 : 0);

  const handleFinish = () => {
    if (!selectedSize) return;
    addItem({
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedSize.name}`,
      price: totalPrice,
      emoji: '🎁',
      details: {
        size: selectedSize.name,
        items: selectedItems.map(id => SAMPLE_ITEMS.find(i => i.id === id)?.name || id),
        message: message
      }
    });
    alert("Box successfully added to cart!");
  };

  return (
    <div className="pt-32 md:pt-52 pb-20 px-4 max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-rose/20 text-rose text-sm font-medium mb-6">
          ✦ Custom Gift Experience
        </div>
        <h1 className="text-4xl md:text-5xl mb-4 text-ink">Build Your Own Box</h1>
        <p className="text-muted max-w-lg mx-auto mb-8">
          Follow our simple 4-step process to create a personalized gift box that perfectly matches your vision.
        </p>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`w-12 h-1.5 rounded-full transition-all ${step >= s ? 'bg-rose' : 'bg-rose/10'}`} 
            />
          ))}
        </div>
      </header>

      <div className="glass p-8 md:p-12 rounded-[40px] relative overflow-hidden min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl mb-2">Step 1: Choose Box Size</h2>
                <p className="text-sm text-muted">Select the capacity of your gift box.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {BOX_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-8 rounded-[32px] border-2 transition-all text-center group ${
                      selectedSize?.id === size.id 
                        ? 'border-rose bg-rose/5 shadow-lg' 
                        : 'border-white/40 bg-white/30 hover:border-rose/30'
                    }`}
                  >
                    <Package size={32} className={`mx-auto mb-4 ${selectedSize?.id === size.id ? 'text-rose' : 'text-muted'}`} />
                    <h3 className="text-xl mb-1">{size.name}</h3>
                    <p className="text-rose font-bold mb-2">Rp {size.price.toLocaleString('id-ID')}</p>
                    <p className="text-xs text-muted leading-tight">{size.desc}</p>
                    <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                      {size.items} Items
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl mb-2">Step 2: Choose Items</h2>
                <p className="text-sm text-muted">
                  Select {selectedSize?.items} items for your {selectedSize?.name}. 
                  ({selectedItems.length}/{selectedSize?.items})
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {SAMPLE_ITEMS.map((item) => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemToggle(item.id)}
                      className={`p-4 rounded-2xl border transition-all relative group ${
                        isSelected 
                          ? 'border-rose bg-rose/5' 
                          : 'border-white/40 bg-white/30 hover:border-rose/20'
                      }`}
                    >
                      <div className="text-3xl mb-2">{item.emoji}</div>
                      <div className="text-xs font-bold text-ink">{item.name}</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose flex items-center justify-center text-white">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl mb-2">Step 3: Personal Message</h2>
                <p className="text-sm text-muted">Add a heartfelt note to your gift.</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 150))}
                    placeholder="Write your message here..."
                    className="w-full h-40 p-6 rounded-3xl glass border border-white/50 focus:border-rose outline-none resize-none text-ink-soft"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-muted">
                    {message.length} / 150
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${giftWrapping ? 'bg-rose border-rose' : 'border-rose/20 bg-white/50'}`}>
                    {giftWrapping && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={giftWrapping} 
                    onChange={() => setGiftWrapping(!giftWrapping)} 
                  />
                  <span className="text-sm font-medium text-ink-soft group-hover:text-rose transition-colors">
                    Add Gift Wrapping (+Rp 25,000)
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl mb-2">Step 4: Review Your Box</h2>
                <p className="text-sm text-muted">Everything looks perfect!</p>
              </div>
              <div className="glass p-8 rounded-[32px] border-rose/10 bg-white/40 space-y-6">
                <div className="flex justify-between items-start border-b border-white/20 pb-4">
                  <div>
                    <h3 className="font-bold text-lg">{selectedSize?.name}</h3>
                    <p className="text-xs text-muted">{selectedItems.length} Items selected</p>
                  </div>
                  <span className="text-rose font-bold">Rp {selectedSize?.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map(id => {
                      const item = SAMPLE_ITEMS.find(i => i.id === id);
                      return (
                        <span key={id} className="px-3 py-1 rounded-full bg-white/50 border border-white/50 text-xs">
                          {item?.emoji} {item?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {message && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">Message:</p>
                    <p className="text-sm text-ink-soft glass p-4 rounded-2xl border-white/50">"{message}"</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-rose">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleFinish}
                  className="w-full py-4 rounded-2xl bg-rose text-white font-bold shadow-lg glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <ShieldCheck size={14} /> Secure payment via Midtrans
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-8 flex items-center justify-between">
          <button
            onClick={() => setStep(prev => prev - 1)}
            disabled={step === 1}
            className={`flex items-center gap-2 text-sm font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-muted hover:text-rose'}`}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button
            onClick={() => setStep(prev => prev + 1)}
            disabled={step === 4 || (step === 1 && !selectedSize) || (step === 2 && selectedItems.length < (selectedSize?.items || 0))}
            className={`flex items-center gap-2 px-8 py-3 rounded-full bg-ink text-white text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105`}
          >
            Next <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
