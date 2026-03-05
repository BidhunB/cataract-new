"use client";

import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen pt-32">
      <motion.section 
        className="max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          About VisionGuard AI
        </motion.h1>
        
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Revolutionizing Cataract Detection
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Cataracts cause clouding of the eye's lens, leading to blurry vision and, if untreated, 
            complete blindness. Early detection is crucial for preventing vision loss and improving 
            treatment outcomes.
          </p>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Our AI system analyzes fundus and slit-lamp images with unprecedented accuracy, 
            detecting cataracts and classifying severity levels in seconds. This technology 
            empowers healthcare professionals to make faster, more accurate diagnoses.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Mission
          </h3>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            To democratize access to advanced medical imaging technology, making early 
            cataract detection available to healthcare providers worldwide, ultimately 
            saving vision and improving quality of life for millions of people.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
