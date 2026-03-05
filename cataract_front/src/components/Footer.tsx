"use client";

import { useTheme } from "@/lib/theme-context";
import { Eye, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const { isDark } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mt-20 ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VisionGuard AI
              </span>
            </div>
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"} mb-6 max-w-md leading-relaxed`}>
              Revolutionizing cataract detection with cutting-edge AI technology. 
              Empowering healthcare professionals worldwide with accurate, real-time diagnosis.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/howitworks", label: "How It Works" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/about", label: "About Us" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Contact
            </h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Mail size={16} className="text-blue-500" />
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  bidhunbibin4@gmail.com
                </span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Phone size={16} className="text-blue-500" />
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  +91 -----------
                </span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <MapPin size={16} className="text-blue-500" />
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Punnapara ,Kerala
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className={`pt-8 border-t ${isDark ? "border-zinc-800" : "border-gray-200"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              © {currentYear} VisionGuard AI — All Rights Reserved
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
