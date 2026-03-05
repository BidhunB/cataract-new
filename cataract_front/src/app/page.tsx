"use client";
import { useTheme } from "@/lib/theme-context";
import { ArrowRight, ShieldCheck, Clock, Eye, Sparkles, CheckCircle, Zap, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  const { isDark } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: { 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Problem & Solution */}
      <motion.section 
        className="py-20 px-6 text-center max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Why Early Cataract Detection Matters
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
            Cataracts are one of the leading causes of blindness worldwide, but early
            diagnosis can prevent vision loss. Our AI-powered platform analyzes eye
            scans within seconds, providing doctors with precise, reliable results.
          </p>
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover="hover"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Eye className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Upload Scan</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Upload a fundus or slit-lamp image of the eye through our secure, HIPAA-compliant platform.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover="hover"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShieldCheck className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our advanced AI model detects cataract severity and provides detailed analysis in seconds.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover="hover"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Clock className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Instant Results</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get comprehensive diagnosis reports with actionable insights and treatment recommendations.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="py-20 px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose VisionGuard AI
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div 
            className="group p-8 border-2 border-gray-100 dark:border-zinc-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800"
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-powered diagnosis in under 5 seconds, saving valuable time for both doctors and patients.
            </p>
          </motion.div>
          
          <motion.div 
            className="group p-8 border-2 border-gray-100 dark:border-zinc-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800"
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Highly Accurate</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Trained on thousands of high-quality medical images with 00% accuracy rate.
            </p>
          </motion.div>
          
          <motion.div 
            className="group p-8 border-2 border-gray-100 dark:border-zinc-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800"
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Globally Accessible</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Available to doctors and clinics worldwide with multi-language support.
            </p>
          </motion.div>
          
          {/* <motion.div 
            className="group p-8 border-2 border-gray-100 dark:border-zinc-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800"
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Award className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">FDA Compliant</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Built with medical-grade security and compliance standards for clinical use.
            </p>
          </motion.div> */}
        </motion.div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Detecting Cataracts in Seconds
          </h2>
          <p className="text-xl mb-10 text-blue-100 leading-relaxed">
            Join thousands of healthcare professionals already using VisionGuard AI to improve patient outcomes.
          </p>
          
          <motion.div className="flex flex-wrap gap-6 justify-center">
            <motion.a
              href="/dashboard"
              className="px-10 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now - It's Free
            </motion.a>
            
            <motion.a
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
            </motion.a>
          </motion.div>
          
          <motion.p 
            className="mt-8 text-blue-200 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            No credit card required • Lifetime free access • Contact for compliant
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  );
}