import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ChevronDown, X, SortAsc, SortDesc, Plus, Minus } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Fate Nova X Gaming PC', category: 'Gaming PCs', brand: 'Fate', price: 1999, rating: 4.8, stock: 7, tags: ['RTX 4070', 'Ryzen 7'], color: 'from-fuchsia-600 to-cyan-500' },
  { id: 2, name: 'Arc RTX 4080 GPU', category: 'Components', brand: 'NVIDIA', price: 1199, rating: 4.9, stock: 12, tags: ['GPU', 'RTX 4080'], color: 'from-emerald-500 to-cyan-500' },
  { id: 3, name: 'Ryzen 9 7900X CPU', category: 'Components', brand: 'AMD', price: 499, rating: 4.7, stock: 20, tags: ['CPU'], color: 'from-orange-500 to-pink-500' },
  { id: 4, name: 'Vortex 32" 4K Monitor', category: 'Peripherals', brand: 'Vortex', price: 599, rating: 4.6, stock: 9, tags: ['Monitor', '4K'], color: 'from-indigo-500 to-fuchsia-500' },
  { id: 5, name: 'HyperSpeed Mechanical Keyboard', category: 'Peripherals', brand: 'Hyper', price: 159, rating: 4.5, stock: 30, tags: ['Keyboard'], color: 'from-cyan-500 to-blue-500' },
  { id: 6, name: 'Quantum 2TB NVMe SSD', category: 'Components', brand: 'Quantum', price: 189, rating: 4.4, stock: 25, tags: ['SSD'], color: 'from-teal-500 to-lime-500' },
  { id: 7, name: 'Glide Pro Gaming Mouse', category: 'Peripherals', brand: 'Glide', price: 89, rating: 4.3, stock: 40, tags: ['Mouse'], color: 'from-purple-500 to-cyan-500' },
  { id: 8, name: 'Fate Nova Z Mini PC', category: 'Gaming PCs', brand: 'Fate', price: 1499, rating: 4.6, stock: 6, tags: ['SFF', 'ITX'], color: 'from-rose-500 to-amber-500' },
  { id: 9, name: 'Trident 32GB DDR5 RAM', category: 'Components', brand: 'Trident', price: 169, rating: 4.5, stock: 28, tags: ['RAM'], color: 'from-fuchsia-500 to-purple-600' },
  { id: 10, name: 'Omni 850W PSU (Gold)', category: 'Components', brand: 'Omni', price: 139, rating: 4.2, stock: 22, tags: ['PSU'], color: 'from-yellow-500 to-orange-500' },
  { id: 11, name: 'Neon RGB Fan Kit (3-pack)', category: 'Accessories', brand: 'Neon', price: 59, rating: 4.1, stock: 60, tags: ['Fans'], color: 'from-pink-500 to-cyan-500' },
  { id: 12, name: 'Pro Stream Mic', category: 'Accessories', brand: 'Vibe', price: 129, rating: 4.4, stock: 18, tags: ['Mic'], color: 'from-sky-500 to-indigo-500' },
];

const CATEGORIES = ['All', 'Gaming PCs', 'Components', 'Peripherals', 'Accessories'];
const BRANDS = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];

function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="group relative rounded-xl border border-white/10 bg-white/5 p-4 overflow-hidden"
    >
      <div className={`h-36 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center text-white font-bold text-lg`}> 
        {product.tags[0]}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold leading-tight">{product.name}</h3>
          <div className="mt-1 text-sm text-white/60">{product.brand} • {product.category}</div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
            ))}
            <span className="text-xs text-white/60 ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <div className="mt-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{product.stock > 10 ? 'In Stock' : 'Low Stock'}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">${product.price}</div>
          <button onClick={() => onAdd(product)} className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-10 h-24 bg-gradient-to-t from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function CartDrawer({ open, items, onClose, onInc, onDec }) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[60] bg-[#0a0a0f] border-l border-white/10 shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-white text-lg font-semibold">Your Cart</h3>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-white/10 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
            {items.length === 0 ? (
              <p className="text-white/70">Your cart is empty.</p>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className={`w-16 h-12 rounded bg-gradient-to-br ${it.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{it.name}</div>
                    <div className="text-white/60 text-sm">${it.price} • {it.brand}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onDec(it)} className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"><Minus className="w-4 h-4" /></button>
                    <span className="w-6 text-center text-white">{it.qty}</span>
                    <button onClick={() => onInc(it)} className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between text-white mb-3">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-extrabold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white font-bold">
              Checkout (Demo)
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default function Store({ onAddToCart, cart, setCartOpen, cartOpen }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [sort, setSort] = useState('relevance');

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (category === 'All' || p.category === category) &&
      (brand === 'All' || p.brand === brand) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    );
    if (sort === 'price-asc') list = list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, brand, sort]);

  const suggestions = useMemo(() => {
    if (!query) return [];
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  const handleAdd = (product) => {
    onAddToCart(product);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#0b0b12] to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold"><Filter className="w-4 h-4" /> Filters</div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs text-white/60">Category</label>
                    <div className="mt-1 relative">
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none bg-white/10 text-white rounded-md px-3 py-2 pr-8">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Brand</label>
                    <div className="mt-1 relative">
                      <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full appearance-none bg-white/10 text-white rounded-md px-3 py-2 pr-8">
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/60">Sort</label>
                    <div className="mt-1 relative">
                      <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full appearance-none bg-white/10 text-white rounded-md px-3 py-2 pr-8">
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-600/20 to-cyan-500/20 border border-white/10 text-white">
                <div className="font-semibold">Promo</div>
                <p className="text-sm text-white/80 mt-1">Save up to 15% on Fate Nova PCs this week only.</p>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/10 text-white placeholder:text-white/60 rounded-md pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute z-10 mt-2 w-full rounded-md bg-[#0a0a0f] border border-white/10 shadow-xl overflow-hidden"
                    >
                      {suggestions.map(s => (
                        <li key={s.id}>
                          <button
                            onClick={() => setQuery(s.name)}
                            className="w-full text-left px-3 py-2 hover:bg-white/10 text-white/90"
                          >
                            {s.name}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setSort('price-asc')} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-sm"><SortAsc className="w-4 h-4" />Low</button>
                <button onClick={() => setSort('price-desc')} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-sm"><SortDesc className="w-4 h-4" />High</button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={handleAdd} />
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={(it) => onAddToCart(it)}
        onDec={(it) => onAddToCart(it, -1)}
      />
    </section>
  );
}
