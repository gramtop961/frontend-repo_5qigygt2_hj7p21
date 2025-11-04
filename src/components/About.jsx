import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, Star } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px] hover:shadow-fuchsia-500/20 transition-all"
  >
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-fuchsia-600/30">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-white/70">{description}</p>
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black via-[#0b0b12] to-black">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-fuchsia-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl sm:text-4xl font-extrabold text-white"
        >
          About Fate Gaming Store
        </motion.h2>
        <p className="mt-4 text-center text-white/70 max-w-3xl mx-auto">
          We craft and curate elite hardware for creators, competitors, and enthusiasts. From custom rigs to pro-grade components, we deliver the speed, stability, and style you demand.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature icon={Zap} title="Blazing Performance" description="Hand-picked GPUs, CPUs, and NVMe drives tuned for maximum FPS and throughput." />
          <Feature icon={Shield} title="Reliability" description="Stress-tested builds, solid warranties, and support that ships with every order." />
          <Feature icon={Rocket} title="Pro-Level Builds" description="Thermals, acoustics, and cable mastery—built like a flagship, every time." />
          <Feature icon={Star} title="Top Rated" description="Loved by gamers and creators worldwide. Thousands of 5-star experiences." />
        </div>
      </div>
    </section>
  );
}
