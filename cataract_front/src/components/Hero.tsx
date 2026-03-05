"use client";

import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";
import { Sparkles, Eye, Zap } from "lucide-react";

export function Hero() {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
      {/* Background Image - Positioned to the right with theme-based selection */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: isDark 
            ? "url('/image.png')" 
            : "url('/image2.png')",
        }}
      />
      
      {/* Gradient Overlay for seamless blending */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-white dark:to-zinc-900 transition-all duration-700" />
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-zinc-900/80 via-white dark:via-[#1a191c] to-transparent transition-all duration-700" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 opacity-20 floating-element"
      >
        <Sparkles size={40} className="text-blue-400" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-32 right-16 opacity-20 floating-element"
      >
        <Eye size={32} className="text-green-400" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 left-20 opacity-20 floating-element"
      >
        <Zap size={28} className="text-purple-400" />
      </motion.div>
      
      {/* Content Container - Left aligned */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6"
          >
            <Sparkles size={16} className="text-yellow-300" />
            AI-Powered Medical Technology
          </motion.div>

          <motion.h2 
            className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className={isDark ? "text-gray-100" : "text-gray-900"}>
              Clear{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              Vision Ahead
            </span>
          </motion.h2>
          
          <motion.p
            className={`text-xl max-w-xl mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            AI-powered cataract detection in seconds for early diagnosis. 
            Get instant results with our advanced medical imaging technology.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.a
              href="/howitworks"
              className="px-8 py-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="/dashboard"
              className="px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-semibold text-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">00% - 99%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">&lt;2s</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Detection Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">images used for training</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
