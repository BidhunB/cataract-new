"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import {
  Upload,
  Eye,
  FileImage,
  ArrowLeft,
  Play,
  CheckCircle,
  Camera,
  History,
  X,
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export default function DashboardPage() {
  const [imageType, setImageType] = useState<"fundus" | "slitlamp" | null>(
    null,
  );
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { isDark } = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  // Helper function to convert base64 to File object
  const urltoFile = (url: string, filename: string, mimeType: string) => {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("analysisHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 Data URL to a real File object
      const convertedFile = await urltoFile(
        imageSrc,
        "webcam-capture.jpg",
        "image/jpeg",
      );
      setFile(convertedFile);
      setIsCameraOpen(false);
    }
  }, [webcamRef]);

  const router = useRouter();

  const handleAnalysis = async () => {
    if (!file || !imageType) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const endpoint =
        imageType === "fundus"
          ? "http://localhost:5000/predict_multiclass"
          : "http://localhost:5000/predict_slit_lamp";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = "Analysis failed";
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Fallback if parsing fails
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Ensure we have an absolute URL for the image
      let imgUrl = URL.createObjectURL(file);
      if (data.visualizations?.original) {
        imgUrl = data.visualizations.original.startsWith("http")
          ? data.visualizations.original
          : `http://localhost:5000${data.visualizations.original}`;
      }

      const analysisData = {
        prediction: data.prediction,
        confidence: data.confidence,
        class_probabilities: data.class_probabilities,
        metrics: data.metrics,
        imageType: imageType === "fundus" ? "Fundus Image" : "Slit-Lamp Image",
        analysisTime: "3.2 seconds",
        visualizations: data.visualizations,
        originalImageUrl: imgUrl,
        date: new Date().toISOString(),
      };

      // Store results in sessionStorage to pass to ResultsPage
      sessionStorage.setItem("analysisResult", JSON.stringify(analysisData));

      // Append to local history array
      let historyArray = [...history];
      historyArray = [analysisData, ...historyArray].slice(0, 5); // Keep last 5 items
      localStorage.setItem("analysisHistory", JSON.stringify(historyArray));
      setHistory(historyArray);

      router.push("/results");
    } catch (error) {
      console.error("Error during analysis:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred during analysis. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-32">
      <motion.section
        className="max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
            AI Cataract Detection Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select the type of image you are going to upload and let our AI
            analyze it for cataract detection.
          </p>
        </motion.div>

        {/* Step 1: Select Image Type */}
        {!imageType && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setImageType("fundus")}
              className="group p-8 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl dark:hover:bg-gray-800/50 hover:bg-gray-50/50 transition-all duration-300 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Fundus Image
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Retinal photograph from fundus camera showing the back of the
                eye.
              </p>
            </motion.button>

            <motion.button
              onClick={() => setImageType("slitlamp")}
              className="group p-8 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl dark:hover:bg-gray-800/50 hover:bg-gray-50/50 transition-all duration-300 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FileImage className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Slit-Lamp Image
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Image from slit-lamp examination showing the front structures of
                the eye.
              </p>
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Upload Image */}
        {imageType && !file && (
          <motion.div
            className="mt-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 rounded-2xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 shadow-xl">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Upload {imageType === "fundus" ? "Fundus" : "Slit-Lamp"} Image
              </h3>

              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag & drop your image here or click to browse
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />

                {!isCameraOpen ? (
                  <>
                    <motion.button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-700 transition font-medium text-gray-700 dark:text-gray-200"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload size={20} /> Browse Files
                    </motion.button>

                    <motion.button
                      onClick={() => setIsCameraOpen(true)}
                      className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition font-medium"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Camera size={20} /> Turn On Camera
                    </motion.button>
                  </>
                ) : (
                  <div className="w-full max-w-md mx-auto relative rounded-2xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "environment" }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 p-4 flex justify-center gap-4">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 font-bold flex items-center gap-2"
                      >
                        <Camera size={20} /> Capture
                      </button>
                      <button
                        onClick={() => setIsCameraOpen(false)}
                        className="p-3 bg-red-600/80 text-white rounded-full shadow-lg hover:bg-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                onClick={() => setImageType(null)}
                className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft size={16} />
                Back to image type selection
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: File Selected */}
        {file && (
          <motion.div
            className="mt-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 rounded-2xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 shadow-xl">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                File Uploaded Successfully!
              </h3>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{file.name}</span> has been
                uploaded as{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {imageType === "fundus" ? "Fundus Image" : "Slit-Lamp Image"}
                </span>
              </p>

              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  File size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Type: {file.type || "Unknown"}
                </p>
              </div>

              <motion.button
                onClick={handleAnalysis}
                disabled={isProcessing}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Recent History Section */}
        {!imageType && history.length > 0 && (
          <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
              <History size={24} />
              <h3 className="text-2xl font-bold">Recent Analysis History</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm"
                >
                  <div className="h-40 w-full mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-900">
                    {/* Use an eslint-ignore for img to keep it simple, or Next/Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.originalImageUrl}
                      alt="History thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5Ij5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md">
                      {item.imageType}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {item.prediction}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Confidence: {item.confidence}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}
