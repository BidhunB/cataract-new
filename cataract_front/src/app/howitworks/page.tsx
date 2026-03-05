"use client";

import { Upload, Search, FileText, Eye, ShieldCheck, Clock } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen pt-32">
      <motion.section
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered cataract detection system works in three simple steps, 
            delivering accurate results in seconds.
          </p>
        </motion.div>

        {/* Main Process Steps */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="relative group"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative p-8 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 text-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Upload Eye Image</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Drag & drop or take a photo using your device. We support fundus and slit-lamp images.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative group"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative p-8 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 text-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. AI Analyzes</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our advanced AI model detects cataracts and grades severity in under 5 seconds.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative group"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative p-8 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-zinc-700/50 text-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Get Report</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Receive comprehensive diagnosis reports with actionable insights and treatment recommendations.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/30">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Advanced Imaging</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Supports multiple image formats and provides detailed analysis of various cataract types.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/30">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Secure & Compliant</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HIPAA-compliant platform with enterprise-grade security for patient data protection.
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}