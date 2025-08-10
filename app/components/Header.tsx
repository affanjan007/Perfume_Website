"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react"
import { useCart } from "../context/CartContext"
import CartPreview from "./CartPreview"
import CartAnimation from "./CartAnimation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartAnimation, setCartAnimation] = useState({
    isAnimating: false,
    productImage: "",
    productName: "",
    startPosition: { x: 0, y: 0 },
  })
  const { state, dispatch } = useCart()

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle cart animation
  useEffect(() => {
    const handleCartAnimation = (event: CustomEvent) => {
      const { product, startPosition } = event.detail
      setCartAnimation({
        isAnimating: true,
        productImage: product.image,
        productName: product.name,
        startPosition,
      })
    }

    window.addEventListener("cartAnimation", handleCartAnimation as EventListener)
    return () => window.removeEventListener("cartAnimation", handleCartAnimation as EventListener)
  }, [])

  const handleAnimationComplete = () => {
    setCartAnimation((prev) => ({ ...prev, isAnimating: false }))
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Close mobile menu when clicking outside or on scroll
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/90 border-b border-amber-500/20 shadow-2xl shadow-black/20"
            : "backdrop-blur-xl bg-black/80 border-b border-white/10"
        }`}
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" onClick={scrollToTop} className="flex items-center space-x-3 group">
              <div className="relative">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-amber-500/40 group-hover:scale-105 ${
                    scrolled ? "shadow-amber-500/25" : "shadow-amber-500/20"
                  }`}
                >
                  <span className="text-black font-bold text-lg font-serif">BB</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-yellow-200 group-hover:to-amber-300 transition-all duration-300">
                  Bold & Bottled
                </span>
                <div className="text-amber-400 text-xs font-medium tracking-wider opacity-80">LUXURY FRAGRANCES</div>
              </div>
              {/* Mobile logo text */}
              <span className="sm:hidden text-lg font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                B&B
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={scrollToTop}
                  className="relative text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium py-2 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Shopping Cart */}
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="relative p-2 sm:p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {totalItems > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full w-6 h-6 animate-ping opacity-75"></div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-yellow-600/0 group-hover:from-amber-500/10 group-hover:to-yellow-600/10 rounded-xl transition-all duration-300"></div>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(!isMenuOpen)
                }}
                className="lg:hidden relative p-2 sm:p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative w-5 h-5">
                  <Menu
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
                  />
                  <X
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-yellow-600/0 group-hover:from-amber-500/10 group-hover:to-yellow-600/10 rounded-xl transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-20 transition-all duration-500 ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Menu Panel */}
          <div
            className={`relative backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 border-b border-amber-500/20 shadow-2xl transform transition-all duration-500 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="px-4 sm:px-6 py-8">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block group p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300 font-medium transform ${
                      isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setIsMenuOpen(false)
                      scrollToTop()
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{item.name}</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-amber-300 text-sm font-semibold">Luxury Fragrances</div>
                    <div className="text-gray-400 text-xs">For the Modern Gentleman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Preview */}
      <CartPreview />

      {/* Cart Animation */}
      <CartAnimation
        isAnimating={cartAnimation.isAnimating}
        productImage={cartAnimation.productImage}
        productName={cartAnimation.productName}
        startPosition={cartAnimation.startPosition}
        onAnimationComplete={handleAnimationComplete}
      />
    </>
  )
}
