"use client"

import { motion } from "framer-motion"
import React from "react"

interface IconAnimationProps {
  children: React.ReactNode
  color: string
}

export function IconAnimation({ children, color }: IconAnimationProps) {
  // Extract color classes to create a matching glow effect
  const colorClass = color.split(" ")[0] // Take first color for the glow

  return (
    <motion.div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gray-900/40 backdrop-blur-sm`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-full ${colorClass.replace("from-", "bg-")} opacity-20 blur-md`}></div>

      {/* Icon container */}
      <motion.div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5"
        animate={{
          boxShadow: ["0 0 0 rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.5)", "0 0 0 rgba(255,255,255,0.2)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="text-white">{React.cloneElement(children as React.ReactElement, { className: "h-8 w-8" })}</div>
      </motion.div>
    </motion.div>
  )
}
