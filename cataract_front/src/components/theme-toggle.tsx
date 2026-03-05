"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div
      className={cn(
        "flex w-18 h-9 p-1 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl theme-transition",
        isDark 
          ? "bg-zinc-950 border border-zinc-800/50 shadow-zinc-950/50" 
          : "bg-white border border-gray-200/50 shadow-gray-200/50",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-7 h-7 rounded-full transition-all duration-300 shadow-sm",
            isDark 
              ? "transform translate-x-0 bg-zinc-800 shadow-zinc-900/50" 
              : "transform translate-x-9 bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-200/50"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-7 h-7 rounded-full transition-all duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-9"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-4 h-4 text-amber-400" 
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className="w-4 h-4 text-gray-600" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}