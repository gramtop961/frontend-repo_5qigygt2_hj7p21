import React, { useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero({ onShopNow }) {
  // Pointer-reactive tilt/parallax for the foreground 3D object
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.3 });

  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const rotateX = useTransform(sy, [-1, 1], [8, -8]);
  const translateX = useTransform(sx, [-1, 1], [-10, 10]);
  const translateY = useTransform(sy, [-1, 1], [-6, 6]);

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    mx.set(x * 2 - 1); // -1..1
    my.set(y * 2 - 1); // -1..1
  }, [mx, my]);

  const handlePointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-black">
      {/* Background cinematic Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-10 left-10 w-72 h-72 bg-fuchsia-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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

          {/* Foreground 3D object that reacts to pointer movement */}
          <motion.div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden"
          >
            <Spline scene="https://prod.spline.design/NkcnsJpx2b5y-eA7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            {/* Subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-cyan-500/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
