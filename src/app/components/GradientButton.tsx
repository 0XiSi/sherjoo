"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/app/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

export default function GradientButton({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: GradientButtonProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Size variants
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "default",
          "px-8 py-4 text-lg": size === "lg",
        },
        // Style variants
        {
          "text-white": variant === "default",
          "bg-transparent border border-gray-300 hover:border-transparent": variant === "outline",
        },
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Gradient background with animation */}
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 transition-all duration-300",
          {
            "opacity-100": variant === "default",
            "opacity-0 hover:opacity-100": variant === "outline",
          },
        )}
        style={{
          backgroundSize: isHovering ? "200% 200%" : "100% 100%",
          animation: isHovering ? "moveGradient 3s ease infinite" : "none",
        }}
      />

      {/* Content container to ensure text is above the gradient */}
      <span className="relative z-10">{children}</span>

      {/* CSS for the animation */}
      <style jsx>{`
        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </button>
  )
}

