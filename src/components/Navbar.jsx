import React from 'react';
import { ShoppingCart, Home, Store, Cpu, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      active ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:block text-sm font-medium">{label}</span>
  </button>
);

export default function Navbar({ currentPage, onNavigate, onOpenCart, cartCount }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/30"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-extrabold tracking-wider text-sm">FATE</span>
              <span className="text-cyan-300 font-semibold tracking-widest text-xs">GAMING STORE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <NavItem icon={Home} label="Home" active={currentPage === 'home'} onClick={() => onNavigate('home')} />
            <NavItem icon={Store} label="Store" active={currentPage === 'store'} onClick={() => onNavigate('store')} />
            <NavItem icon={Cpu} label="Build Your PC" active={false} onClick={() => onNavigate('store')} />
            <NavItem icon={Phone} label="Contact" active={false} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:block text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-fuchsia-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
