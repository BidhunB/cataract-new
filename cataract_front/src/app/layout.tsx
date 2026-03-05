"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/lib/theme-context";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Theme Provider wraps all pages */}
        <ThemeProvider>
          {/* Navbar on top */}
          <Navbar />

          {/* Main Layout managed by ClientLayout to conditionally render Footer */}
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
