"use client";

import { useState, useCallback } from "react";
import { useTheme } from "@/lib/theme-context";
import { Upload, FileImage, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { isDark } = useTheme();

  const handleFileChange = useCallback((selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => setIsUploading(false), 2000);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, [handleFileChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  }, [handleFileChange]);

  return (
    <section id="upload" className="py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
          Try the Demo
        </h3>
        <p className={`text-xl ${isDark ? "text-gray-300 mb-8" : "text-gray-600 mb-8"} max-w-2xl mx-auto`}>
          Upload your fundus image to see AI detection in action. Our platform supports JPG, PNG, and TIFF formats.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
            isDragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-500"
          } ${isDark ? "bg-zinc-800/50" : "bg-gray-50"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <div className="text-center">
            {!file ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Upload className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {isDragOver ? "Drop your image here" : "Click to upload or drag and drop"}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Supports JPG, PNG, TIFF up to 10MB
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  <FileImage size={16} />
                  Fundus or Slit-lamp Images
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {isUploading ? (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Upload className="text-white" size={32} />
                      </motion.div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Processing your image...
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      AI analysis in progress
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Upload Successful!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {file.name}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                      <CheckCircle size={16} />
                      Ready for Analysis
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {file && !isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-8"
          >
            <button
              onClick={() => setFile(null)}
              className="px-6 py-3 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors duration-200"
            >
              Upload Different Image
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
        >
          <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            What happens next?
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI analyzes your image</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Generates detailed report</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Provides treatment insights</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
