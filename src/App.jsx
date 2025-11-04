import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Store from './components/Store';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);

  const handleAddToCart = (product, delta = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1 && delta > 0) return [...prev, { ...product, qty: 1 }];
      if (idx === -1) return prev;
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + delta };
      if (copy[idx].qty <= 0) return copy.filter((_, i) => i !== idx);
      return copy;
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <main>
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onShopNow={() => setPage('store')} />
              <About />
            </motion.div>
          )}
          {page === 'store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Store
                onAddToCart={handleAddToCart}
                cart={cart}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
