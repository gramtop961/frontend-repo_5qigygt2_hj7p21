import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onShopNow }) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Fate Gaming Store
          </h1>
          <div className="mt-4 text-xl sm:text-2xl font-semibold">
            <motion.span
              className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Build. Customize. Dominate.
            </motion.span>
          </div>
          <p className="mt-4 text-white/80 max-w-2xl">
            High-performance PCs and components for builders and gamers. Futuristic design, elite performance, and seamless shopping.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <motion.button
              onClick={onShopNow}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white font-bold shadow-xl shadow-fuchsia-600/30"
            >
              Shop Now
            </motion.button>
            <motion.a
              href="#about"
              whileHover={{ x: 4 }}
              className="pointer-events-auto text-white/80 hover:text-white"
            >
              Learn more →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
