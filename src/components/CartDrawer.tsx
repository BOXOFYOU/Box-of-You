import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeItem } = useCart();

  const handleCheckout = () => {
    const message = encodeURIComponent(
      `Hello Box of You! I would like to order:\n\n` +
      items.map(i => {
        let text = `- ${i.name} (${i.quantity}x) - Rp ${(i.price * i.quantity).toLocaleString('id-ID')}`;
        if (i.details) {
          if (i.details.items) text += `\n  Contents: ${i.details.items.join(', ')}`;
          if (i.details.message) text += `\n  Message: "${i.details.message}"`;
        }
        return text;
      }).join('\n\n') +
      `\n\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nKindly provide further payment information. Thank you!`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full glass z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
                <ShoppingBag className="text-rose" /> Your Box
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-rose/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-6xl">🎁</span>
                  <div>
                    <p className="text-xl font-bold text-ink">Your box is empty</p>
                    <p className="text-sm text-muted">Find the perfect gift by taking our quiz!</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-8 py-3 rounded-full border border-rose text-rose font-medium hover:bg-rose hover:text-white transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl bg-white/50 flex items-center justify-center text-3xl shadow-sm">
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-ink">{item.name}</h3>
                        <p className="text-rose font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
                        
                        {item.details && (
                          <div className="mt-2 space-y-1">
                            {item.details.items && (
                              <p className="text-[10px] text-muted leading-tight">
                                <span className="font-bold uppercase">Item:</span> {item.details.items.join(', ')}
                              </p>
                            )}
                            {item.details.message && (
                              <p className="text-[10px] text-rose italic leading-tight">
                                "{item.details.message}"
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-white/30 rounded-full px-2 py-1 bg-white/30">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-rose"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-rose"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted hover:text-rose transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/20 bg-white/30 space-y-4">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Subtotal</span>
                  <span className="text-rose">Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle size={20} /> Complete Order via WhatsApp
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 text-sm text-muted font-medium hover:text-rose transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
