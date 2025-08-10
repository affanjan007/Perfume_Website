"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Award, Truck, Shield } from "lucide-react"
import { useCart } from "./context/CartContext"

export default function Home() {
  const { addToCartWithAnimation } = useCart()
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const featuredProducts = [
    {
      id: "1",
      name: "Steel & Sage",
      price: 299,
      image: "https://images.pexels.com/photos/16445070/pexels-photo-16445070.jpeg",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Tom Ford",
      price: 349,
      image: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg",
      rating: 5,
    },
    {
      id: "3",
      name: "Urban Legend",
      price: 279,
      image: "https://images.pexels.com/photos/8789609/pexels-photo-8789609.jpeg",
      rating: 4,
    },
  ]

  // Scroll and mouse event handlers
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleAddToCart = (product: any, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const productWithSize = {
      ...product,
      selectedSize: "50ml",
      id: `${product.id}-50ml`,
    }

    addToCartWithAnimation(productWithSize, event.currentTarget)
  }

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('.featured-products')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, #ffffff 0%, #f7e98e 50%, #f4d03f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleReveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: translateY(50px);
          letter-spacing: -0.02em;
        }
        
        .hero-subtitle {
          animation: subtitleReveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
          opacity: 0;
          transform: translateY(30px);
          letter-spacing: 0.5px;
        }
        
        .scroll-indicator {
          animation: scrollAppear 2s ease-out 1.5s forwards;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .scroll-indicator:hover {
          transform: translateX(-50%) scale(1.1);
        }
        
        .scroll-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .scroll-button {
          border: 2px solid rgba(247, 233, 142, 0.8);
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(15px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(247, 233, 142, 0.2), inset 0 0 20px rgba(247, 233, 142, 0.1);
        }
        
        .scroll-button:hover {
          border-color: #f7e98e;
          background: rgba(247, 233, 142, 0.2);
          box-shadow: 0 0 50px rgba(247, 233, 142, 0.6), 0 0 80px rgba(247, 233, 142, 0.3), inset 0 0 30px rgba(247, 233, 142, 0.2);
        }
        
        .scroll-button::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #f7e98e;
          border-radius: 50%;
          transform: translateX(-50%);
          animation: scrollDot 2s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(247, 233, 142, 0.9), 0 0 30px rgba(247, 233, 142, 0.5);
        }
        
        .scroll-button::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 50%;
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f7e98e, transparent);
          transform: translateX(-50%);
          animation: scrollLine 2s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          background: rgba(247, 233, 142, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes subtitleReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes scrollAppear {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes scrollDot {
          0%, 100% {
            top: 10px;
            opacity: 1;
          }
          50% {
            top: 50px;
            opacity: 0.3;
          }
        }
        
        @keyframes scrollLine {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-50%) scaleX(0.5);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-10vh) translateX(20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        @media (max-width: 768px) {
          .scroll-text {
            writing-mode: horizontal-tb;
            text-orientation: mixed;
          }
        }
      `}</style>
      
      <div className="pt-20 min-h-screen bg-black">
        {/* Enhanced Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background with Enhanced Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.pexels.com/photos/17022826/pexels-photo-17022826.jpeg"
              alt="Luxury Men's Perfumes"
              fill
              className="object-cover transition-transform duration-1000 ease-out"
              style={{
                transform: `translateY(${scrollY * 0.8}px) scale(1.15)`,
              }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${10 + i * 10}%`,
                  width: `${3 + (i % 3) + 1}px`,
                  height: `${3 + (i % 3) + 1}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Hero Content with Mouse Parallax */}
          <div 
            className="relative z-10 text-center text-white max-w-4xl mx-auto px-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
              Bold & Bottled
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8 font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover our exclusive collection of premium men's fragrances crafted for the discerning gentleman
            </p>
          </div>

          {/* Advanced Scroll Indicator - Moved Higher */}
          <div 
            className="scroll-indicator absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
            onClick={scrollToNextSection}
            style={{
              opacity: Math.max(0, 1 - (scrollY / window.innerHeight)),
            }}
          >
            
            <div className="scroll-button relative w-12 h-20 md:w-12 md:h-20 rounded-full cursor-pointer overflow-hidden">
            </div>
          </div>

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 pointer-events-none z-8 bg-radial-gradient from-transparent via-transparent to-black/40" />
        </section>

        {/* Featured Products */}
        <section className="featured-products py-20 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-white">Featured Men's Collection</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Handpicked masculine fragrances that embody sophistication and confidence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card group bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300">
                  <Link href={`/product/${product.id}`} onClick={scrollToTop} className="block relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1
                        const isFullStar = starValue <= Math.floor(product.rating)
                        const isHalfStar = starValue === Math.ceil(product.rating) && product.rating % 1 !== 0

                        return (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              isFullStar
                                ? "text-yellow-400 fill-current"
                                : isHalfStar
                                  ? "text-yellow-400 fill-current opacity-50"
                                  : "text-gray-600"
                            }`}
                          />
                        )
                      })}
                    </div>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={scrollToTop}
                      className="hover:text-yellow-600 transition-colors duration-200"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                    </Link>
                    <p className="text-2xl font-bold text-yellow-600 mb-4">${product.price}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/product/${product.id}`}
                        onClick={scrollToTop}
                        className="flex-1 mr-3 py-2 px-4 text-center border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded whitespace-nowrap transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Premium Quality</h3>
                <p className="text-gray-400">Crafted with the finest ingredients</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <Truck className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Free Shipping</h3>
                <p className="text-gray-400">On orders over $999 For USA</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Authentic</h3>
                <p className="text-gray-400">100% genuine products</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <Star className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Exclusive</h3>
                <p className="text-gray-400">Limited edition collections</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl font-playfair font-bold mb-6 text-white">
              Experience Masculine Luxury Like Never Before
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of confident men who have discovered their signature scent
            </p>
            <Link 
              href="/shop" 
              onClick={scrollToTop} 
              className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 text-lg transform hover:scale-105"
            >
              Explore Collection
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
