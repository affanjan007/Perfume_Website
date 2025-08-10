"use client"

import { useState, useEffect } from "react"

interface CartAnimationProps {
  isAnimating: boolean
  productImage: string
  productName: string
  startPosition: { x: number; y: number }
  onAnimationComplete: () => void
}

export default function CartAnimation({
  isAnimating,
  productImage,
  productName,
  startPosition,
  onAnimationComplete,
}: CartAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [animationState, setAnimationState] = useState<"idle" | "flying" | "complete">("idle")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isAnimating && mounted) {
      // Start the animation immediately
      setAnimationState("flying")

      // Complete the animation after duration
      const timer = setTimeout(() => {
        setAnimationState("complete")
        onAnimationComplete()
      }, 1200) // Slightly longer for smoother experience

      return () => clearTimeout(timer)
    } else {
      setAnimationState("idle")
    }
  }, [isAnimating, mounted, onAnimationComplete])

  if (!mounted || !isAnimating) return null

  // Calculate cart icon position (top-right area)
  const cartPosition = {
    x: typeof window !== "undefined" ? window.innerWidth - 120 : 0,
    y: 70, // Header height area
  }

  const translateX = cartPosition.x - startPosition.x
  const translateY = cartPosition.y - startPosition.y

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Flying Product Image */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          left: `${startPosition.x - 32}px`, // Center the 64px image
          top: `${startPosition.y - 32}px`,
          transform:
            animationState === "flying"
              ? `translate(${translateX}px, ${translateY}px) scale(0.25) rotate(15deg)`
              : "translate(0, 0) scale(1) rotate(0deg)",
          opacity: animationState === "complete" ? 0 : 1,
        }}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-400 bg-white">
          <img
            src={productImage || "/placeholder.svg"}
            alt={productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/64x64/f59e0b/000000?text=${encodeURIComponent(productName.charAt(0))}`
            }}
          />
        </div>
      </div>

      {/* Success Message */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{
          left: `${startPosition.x - 60}px`, // Center the message
          top: `${startPosition.y - 80}px`,
          transform: animationState === "flying" ? "translateY(-30px) scale(1)" : "translateY(0px) scale(0.8)",
          opacity: animationState === "flying" ? 1 : 0,
        }}
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-medium whitespace-nowrap">Added to cart! ✓</div>
        </div>
      </div>

      {/* Optional: Cart pulse effect */}
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          left: `${cartPosition.x - 20}px`,
          top: `${cartPosition.y - 20}px`,
          transform: animationState === "flying" ? "scale(1.3)" : "scale(1)",
          opacity: animationState === "flying" ? 0.6 : 0,
        }}
      >
        <div className="w-10 h-10 bg-amber-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
