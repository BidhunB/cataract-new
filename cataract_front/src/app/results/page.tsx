"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  BarChart3,
  RefreshCw,
  FileText,
  Activity,
  Layers,
  Download,
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface AnalysisData {
  prediction: string;
  confidence: string;
  class_probabilities?: Record<string, number>;
  imageType: string;
  analysisTime: string;
  originalImageUrl?: string;
  visualizations?: {
    original?: string;
    denoised?: string;
    green?: string;
    clahe?: string;
  };
}

export default function ResultsPage() {
  const { isDark } = useTheme();
  const router = useRouter();

  const [resultData, setResultData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem("analysisResult");
    if (savedResult) {
      const data = JSON.parse(savedResult);
      const confNum = parseFloat(data.confidence.replace("%", ""));
      const roundedConf = Math.round(confNum);

      // Handle visualization URLs to be absolute if needed backend mapping
      const cleanVisualizations = { ...data.visualizations };
      Object.keys(cleanVisualizations).forEach((key) => {
        if (
          cleanVisualizations[key] &&
          !cleanVisualizations[key].startsWith("http") &&
          !cleanVisualizations[key].startsWith("blob")
        ) {
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          cleanVisualizations[key] = `${API_URL}${cleanVisualizations[key]}`;
        }
      });

      setResultData({
        prediction: data.prediction,
        confidence: roundedConf.toString(),
        class_probabilities: data.class_probabilities,
        imageType: data.imageType,
        analysisTime: data.analysisTime,
        originalImageUrl: data.originalImageUrl,
        visualizations: cleanVisualizations,
      });
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const generatePDF = () => {
    if (!resultData) return;

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(41, 128, 185);
    doc.text("VisionGuard AI Diagnostics Report", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${date}`, 14, 28);

    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 32, 196, 32);

    // Main Analysis
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Analysis Summary", 14, 45);

    autoTable(doc, {
      startY: 50,
      head: [["Metric", "Value"]],
      body: [
        ["Classification", resultData.prediction],
        ["Overall Confidence", `${resultData.confidence}%`],
        ["Image Modality", resultData.imageType],
        ["Inference Time", resultData.analysisTime],
      ],
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Probabilities Break down
    if (resultData.class_probabilities) {
      doc.text(
        "Severity Probability Distribution",
        14,
        (doc as any).lastAutoTable.finalY + 15,
      );

      const probBody = Object.entries(resultData.class_probabilities).map(
        ([name, val]) => [name, `${val}%`],
      );
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [["Condition Severity", "Model Probability"]],
        body: probBody,
        theme: "striped",
        headStyles: { fillColor: [46, 204, 113] },
      });
    }

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    // Use fixed positions for footer
    doc.text(
      "This report was generated automatically by VisionGuard AI.",
      14,
      280,
    );
    doc.text(
      "For trial purposes only, this diagnosis should be verified by a certified ophthalmologist.",
      14,
      285,
    );

    doc.save(`visionguard-report-${Date.now()}.pdf`);
  };

  if (!resultData) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const {
    prediction: severity,
    confidence,
    class_probabilities,
    imageType,
    analysisTime,
    originalImageUrl,
    visualizations,
  } = resultData;

  const chartData = class_probabilities
    ? Object.entries(class_probabilities).map(([name, value]) => ({
        name,
        value,
      }))
    : [];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50/50 dark:bg-zinc-900/50">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Activity className="text-blue-500" size={32} /> Analysis Results
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Review your automated {imageType.toLowerCase()} screening details.
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={18} /> New Analysis
            </motion.button>
            <motion.button
              onClick={generatePDF}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center gap-2 font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText size={18} /> Download PDF
            </motion.button>
          </div>
        </div>

        {/* Top Grid: Primary Findings & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Cards Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle size={100} className="text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Primary Detection
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                {severity}
              </h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                Auto-Classified
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                AI Confidence
              </p>
              <div className="flex items-end gap-2 text-gray-900 dark:text-white">
                <h2 className="text-4xl font-bold tracking-tight">
                  {confidence}
                </h2>
                <span className="text-xl pb-1">%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 mt-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Chart Column */}
          <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-gray-400" size={20} />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Severity Probabilities
              </h3>
            </div>
            <div className="flex-grow min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.1}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 12,
                      fill: isDark ? "#9ca3af" : "#6b7280",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 12,
                      fill: isDark ? "#9ca3af" : "#6b7280",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: isDark ? "#3f3f46" : "#f3f4f6" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: any) => [`${value}%`, "Confidence"]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Preprocessing Pipeline (Visualizations) */}
        {visualizations && Object.keys(visualizations).length > 0 && (
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-700 pb-4">
              <Layers size={20} className="text-purple-500" />
              <h3 className="font-semibold text-lg">Preprocessing Pipeline</h3>
              <span className="ml-2 text-sm text-gray-500 font-normal">
                How the AI sees your image
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["original", "green", "clahe", "denoised"].map((step, idx) => {
                const url = visualizations[step as keyof typeof visualizations];
                if (!url && step !== "original") return null; // Original uses originalImageUrl fallback if mapping misses

                const displayUrl = url || originalImageUrl;
                const labels: Record<string, string> = {
                  original: "1. Original",
                  green: "2. Green Channel",
                  clahe: "3. CLAHE Enhanced",
                  denoised: "4. Noise Reduced",
                };

                return displayUrl ? (
                  <div key={idx} className="flex flex-col">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-inner group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayUrl}
                        alt={step}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-center text-gray-700 dark:text-gray-300">
                      {labels[step]}
                    </p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
