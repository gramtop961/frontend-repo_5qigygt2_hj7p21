import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/70 text-sm">© {new Date().getFullYear()} Fate Gaming Store. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
