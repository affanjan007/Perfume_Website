"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Star,
  Heart,
  Minus,
  Plus,
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  Gift,
  MessageCircle,
  ThumbsUp,
  User,
} from "lucide-react"
import { useCart } from "../../context/CartContext"

// Product data
const getProduct = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Steel & Sage",
      price: 299,
      image: "https://images.pexels.com/photos/16445070/pexels-photo-16445070.jpeg",
      description:
        "A sophisticated blend of dark woods and masculine spices that captures the essence of modern masculinity. This commanding fragrance opens with top notes of black pepper and bergamot, flowing into a heart of cedar and vetiver, and settling into a base of sandalwood and amber. Perfect for the discerning gentleman who appreciates complexity and depth in his signature scent.",
      notes: {
        top: ["Black Pepper", "Bergamot", "Pink Pepper"],
        heart: ["Cedar", "Vetiver", "Lavender"],
        base: ["Sandalwood", "Amber", "Vanilla"],
      },
      collection: "evening-noir",
      reviews: [
        {
          id: 1,
          name: "Marcus Johnson",
          rating: 5,
          date: "2 weeks ago",
          comment:
            "Absolutely love this fragrance! The longevity is incredible and I get compliments everywhere I go. The woody notes are perfectly balanced.",
          helpful: 12,
        },
        {
          id: 2,
          name: "David Chen",
          rating: 4,
          date: "1 month ago",
          comment:
            "Great scent for professional settings. Sophisticated and not overpowering. Will definitely purchase again.",
          helpful: 8,
        },
        {
          id: 3,
          name: "Michael Torres",
          rating: 5,
          date: "6 weeks ago",
          comment:
            "This has become my signature scent. The amber base notes are divine and the projection is just right.",
          helpful: 15,
        },
      ],
    },
    {
      id: "2",
      name: "Tom Ford",
      price: 349,
      image: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg",
      description:
        "Warm amber and leather with hints of bergamot create this luxurious scent that embodies executive confidence. Experience the perfect balance of power and sophistication that commands respect throughout the day. A masterpiece crafted for leaders and visionaries who demand nothing but the finest.",
      notes: {
        top: ["Bergamot", "Mandarin", "Cardamom"],
        heart: ["Leather", "Rose", "Jasmine"],
        base: ["Amber", "Oud", "Patchouli"],
      },
      collection: "executive",
      reviews: [
        {
          id: 1,
          name: "James Wilson",
          rating: 5,
          date: "1 week ago",
          comment:
            "Pure luxury in a bottle. The leather notes are incredibly realistic and the longevity is outstanding.",
          helpful: 9,
        },
        {
          id: 2,
          name: "Robert Kim",
          rating: 4,
          date: "3 weeks ago",
          comment: "Expensive but worth every penny. This is what confidence smells like.",
          helpful: 6,
        },
      ],
    },
    {
      id: "3",
      name: "Urban Legend",
      price: 279,
      image: "https://images.pexels.com/photos/8789609/pexels-photo-8789609.jpeg",
      description:
        "Fresh citrus notes with a bold woody base that defines urban sophistication. This dynamic fragrance captures the spirit of the city with its energetic blend of bergamot and grapefruit top notes, complemented by a heart of cedar and black pepper, finishing with a foundation of vetiver and musk.",
      notes: {
        top: ["Bergamot", "Grapefruit", "Lemon"],
        heart: ["Cedar", "Black Pepper", "Sage"],
        base: ["Vetiver", "Musk", "Oakmoss"],
      },
      reviews: [
        {
          id: 1,
          name: "Alex Rivera",
          rating: 4,
          date: "1 week ago",
          comment: "Perfect for daily wear. Fresh but masculine, gets compliments at work.",
          helpful: 7,
        },
      ],
    },
    {
      id: "4",
      name: "Royal Bourbon",
      price: 399,
      image: "https://images.pexels.com/photos/15275974/pexels-photo-15275974.jpeg",
      description:
        "Rich tobacco and whiskey with sandalwood undertones create an opulent fragrance fit for royalty. This luxurious scent opens with warm spices and tobacco leaf, develops into a heart of aged whiskey and leather, and settles into a base of precious sandalwood and vanilla.",
      notes: {
        top: ["Tobacco Leaf", "Cinnamon", "Nutmeg"],
        heart: ["Whiskey", "Leather", "Rose"],
        base: ["Sandalwood", "Vanilla", "Tonka Bean"],
      },
      reviews: [
        {
          id: 1,
          name: "William Parker",
          rating: 5,
          date: "3 days ago",
          comment: "Absolutely magnificent! This is luxury in a bottle. Perfect for special occasions.",
          helpful: 11,
        },
      ],
    },
    {
      id: "5",
      name: "Ocean Storm",
      price: 259,
      image: "https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg",
      description:
        "Aquatic freshness with marine minerals and sea salt captures the power of the ocean. This invigorating fragrance brings together crisp marine notes with fresh citrus and aromatic herbs, grounded by a base of driftwood and ambergris.",
      notes: {
        top: ["Sea Salt", "Bergamot", "Mint"],
        heart: ["Marine Notes", "Sage", "Geranium"],
        base: ["Driftwood", "Ambergris", "Cedarwood"],
      },
      reviews: [
        {
          id: 1,
          name: "Chris Martinez",
          rating: 4,
          date: "1 week ago",
          comment: "Refreshing and clean. Perfect for summer days and beach trips.",
          helpful: 5,
        },
      ],
    },
    {
      id: "6",
      name: "Desert King",
      price: 329,
      image: "https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg",
      description:
        "Exotic oud and spices with warm amber transport you to ancient kingdoms. This mystical fragrance combines precious oud with exotic spices, enhanced by rose and saffron, and anchored by warm amber and precious woods.",
      notes: {
        top: ["Oud", "Saffron", "Cardamom"],
        heart: ["Rose", "Jasmine", "Cinnamon"],
        base: ["Amber", "Sandalwood", "Patchouli"],
      },
      reviews: [
        {
          id: 1,
          name: "Omar Hassan",
          rating: 5,
          date: "2 weeks ago",
          comment: "Incredible oud fragrance. Long-lasting and truly exotic. Worth every penny.",
          helpful: 9,
        },
      ],
    },
    // New Products
    {
      id: "7",
      name: "Midnight Velvet",
      price: 379,
      image: "https://images.pexels.com/photos/19272234/pexels-photo-19272234.jpeg",
      description:
        "Luxurious velvet musk with dark chocolate and vanilla creates an intoxicating evening fragrance. This seductive scent opens with rich cocoa and bergamot, flows into a heart of velvet musk and jasmine, and settles into a base of vanilla and dark amber. Perfect for intimate evenings and special occasions.",
      notes: {
        top: ["Dark Chocolate", "Bergamot", "Black Currant"],
        heart: ["Velvet Musk", "Jasmine", "Rose"],
        base: ["Vanilla", "Dark Amber", "Sandalwood"],
      },
      collection: "evening-noir",
      reviews: [
        {
          id: 1,
          name: "Antonio Silva",
          rating: 5,
          date: "1 week ago",
          comment: "Absolutely mesmerizing! The chocolate notes are divine and it lasts all night.",
          helpful: 14,
        },
      ],
    },
    {
      id: "8",
      name: "Golden Summit",
      price: 429,
      image: "https://images.pexels.com/photos/31847820/pexels-photo-31847820.jpeg",
      description:
        "Premium bergamot and cedar with golden amber finish embodies executive excellence. This prestigious fragrance opens with Italian bergamot and pink pepper, develops into a heart of cedar and sage, and concludes with a luxurious base of golden amber and white musk. Crafted for leaders who demand distinction.",
      notes: {
        top: ["Italian Bergamot", "Pink Pepper", "Lemon"],
        heart: ["Cedar", "Sage", "Geranium"],
        base: ["Golden Amber", "White Musk", "Vetiver"],
      },
      collection: "executive",
      reviews: [
        {
          id: 1,
          name: "Richard Sterling",
          rating: 5,
          date: "5 days ago",
          comment: "The most sophisticated fragrance I own. Perfect for boardroom meetings and formal events.",
          helpful: 18,
        },
      ],
    },
    {
      id: "9",
      name: "Crimson Edge",
      price: 359,
      image: "https://images.pexels.com/photos/29801355/pexels-photo-29801355.jpeg",
      description:
        "Bold spices with leather and smoky woods create a daring evening statement. This intense fragrance opens with red pepper and cardamom, flows into a heart of leather and smoky birch, and settles into a base of patchouli and dark woods. For the man who isn't afraid to stand out.",
      notes: {
        top: ["Red Pepper", "Cardamom", "Grapefruit"],
        heart: ["Leather", "Smoky Birch", "Black Tea"],
        base: ["Patchouli", "Dark Woods", "Amber"],
      },
      collection: "evening-noir",
      reviews: [
        {
          id: 1,
          name: "Diego Rodriguez",
          rating: 4,
          date: "2 weeks ago",
          comment: "Bold and distinctive. Gets noticed wherever I go. The leather note is incredible.",
          helpful: 10,
        },
      ],
    },
    {
      id: "10",
      name: "Platinum Reserve",
      price: 499,
      image: "https://images.pexels.com/photos/30970927/pexels-photo-30970927.jpeg",
      description:
        "Exclusive blend of rare iris and white musk represents the pinnacle of luxury. This ultra-premium fragrance opens with rare iris and silver citrus, develops into a heart of white musk and lily of the valley, and concludes with a base of cashmere woods and platinum accord. Limited edition excellence.",
      notes: {
        top: ["Rare Iris", "Silver Citrus", "White Pepper"],
        heart: ["White Musk", "Lily of the Valley", "Magnolia"],
        base: ["Cashmere Woods", "Platinum Accord", "Clean Musk"],
      },
      collection: "executive",
      reviews: [
        {
          id: 1,
          name: "Alexander Crown",
          rating: 5,
          date: "3 days ago",
          comment: "Worth every penny. This is what luxury smells like. Absolutely exquisite.",
          helpful: 22,
        },
      ],
    },
    {
      id: "11",
      name: "Storm Breaker",
      price: 319,
      image: "https://images.pexels.com/photos/15926320/pexels-photo-15926320.jpeg",
      description:
        "Dynamic citrus burst with thunderous base notes captures raw masculine energy. This powerful fragrance opens with electric citrus and ozone, flows into a heart of stormy woods and sea minerals, and settles into a base of thunder musk and wet stones. For the unstoppable force of nature.",
      notes: {
        top: ["Electric Citrus", "Ozone", "Mint"],
        heart: ["Stormy Woods", "Sea Minerals", "Pine"],
        base: ["Thunder Musk", "Wet Stones", "Driftwood"],
      },
      collection: "executive",
      reviews: [
        {
          id: 1,
          name: "Jake Thunder",
          rating: 4,
          date: "1 week ago",
          comment: "Energizing and powerful. Perfect for gym and outdoor activities. Very unique scent.",
          helpful: 8,
        },
      ],
    },
    {
      id: "12",
      name: "Shadow Noir",
      price: 389,
      image: "https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg",
      description:
        "Mysterious black pepper with dark rose and patchouli creates an enigmatic evening presence. This shadowy fragrance opens with black pepper and dark berries, develops into a heart of midnight rose and incense, and concludes with a base of patchouli and black amber. For the man of mystery.",
      notes: {
        top: ["Black Pepper", "Dark Berries", "Cardamom"],
        heart: ["Midnight Rose", "Incense", "Violet"],
        base: ["Patchouli", "Black Amber", "Dark Musk"],
      },
      collection: "evening-noir",
      reviews: [
        {
          id: 1,
          name: "Vincent Noir",
          rating: 5,
          date: "4 days ago",
          comment: "Mysterious and captivating. The rose note is perfectly balanced with the dark elements.",
          helpful: 16,
        },
      ],
    },
  ]

  return products.find((p) => p.id === id) || products[0]
}

export default function ProductDetail({ params = { id: "1" } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("50ml")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { addToCartWithAnimation } = useCart()
  const product = getProduct(params.id)

  // Add scroll and mouse event handlers for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const sizes = [
    { size: "30ml", price: Math.round(product.price * 0.7), label: "Discovery", popular: false },
    { size: "50ml", price: product.price, label: "Signature", popular: true },
    { size: "100ml", price: Math.round(product.price * 1.6), label: "Statement", popular: false },
  ]

  const currentPrice = sizes.find((s) => s.size === selectedSize)?.price || product.price

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const productWithQuantityAndSize = {
      ...product,
      price: currentPrice,
      selectedSize: selectedSize,
      id: `${product.id}-${selectedSize}`, // Unique ID with size
    }

    // Add the product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCartWithAnimation(productWithQuantityAndSize, event.currentTarget)
    }

    setQuantity(1) // Reset quantity after adding
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.3);
          }
        }
        
        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .image-animate {
          animation: fadeInLeft 1s ease-out;
        }
        
        .details-animate {
          animation: fadeInRight 1s ease-out 0.3s both;
        }
        
        .tab-animate {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }
        
        .glow-image {
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.2);
          transition: all 0.5s ease;
        }
        
        .glow-image:hover {
          box-shadow: 0 0 70px rgba(245, 158, 11, 0.4), 0 0 100px rgba(245, 158, 11, 0.2);
          transform: scale(1.02);
        }
        
        .glow-button {
          background: linear-gradient(45deg, #f59e0b, #eab308);
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
          transition: all 0.3s ease;
        }
        
        .glow-button:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.7), 0 0 80px rgba(245, 158, 11, 0.4);
          transform: translateY(-3px) scale(1.05);
        }
        
        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          background: rgba(245, 158, 11, 0.6);
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }
      `}</style>

      <div className="pt-20 min-h-screen bg-black relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${15 + i * 10}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          {/* Back Navigation */}
          <a
            href="/shop"
            className="group inline-flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="tracking-wide">Back to Collection</span>
          </a>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            {/* Product Image */}
            <div
              className="relative image-animate"
              style={{
                transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
              }}
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl glow-image">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://via.placeholder.com/400x400/1f2937/f59e0b?text=${encodeURIComponent(product.name)}`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements with glow */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur rounded-3xl border border-amber-500/30 glow-button"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-gray-800/40 to-gray-900/20 backdrop-blur rounded-3xl border border-gray-600/30"></div>
            </div>

            {/* Product Details */}
            <div className="space-y-8 details-animate">
              {/* Header */}
              <div>
                <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-amber-600 mb-6"></div>
                <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(averageRating) ? "text-amber-400 fill-current" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">({product.reviews.length} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-4 mb-8">
                  <span className="text-5xl font-light text-amber-400">${currentPrice}</span>
                  {selectedSize !== "50ml" && (
                    <span className="text-2xl text-gray-500 line-through">${product.price}</span>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-white font-medium tracking-wide">Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedSize === sizeOption.size
                          ? "border-amber-400 bg-amber-400/10"
                          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                      }`}
                    >
                      {sizeOption.popular && (
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-white font-medium">{sizeOption.size}</div>
                        <div className="text-sm text-gray-400">{sizeOption.label}</div>
                        <div className="text-amber-400 font-medium">${sizeOption.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div>
                    <h3 className="text-white font-medium tracking-wide mb-3">Quantity</h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-medium text-white w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    Add to Cart - ${(currentPrice * quantity).toLocaleString()}
                  </button>

                  <button
                    onClick={toggleWishlist}
                    className={`w-16 h-16 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                      isWishlisted
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content with animation */}
          <div className="min-h-[150px] tab-animate">
            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex space-x-8">
                {["description", "notes", "reviews", "details"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 text-sm font-medium tracking-widest uppercase transition-colors duration-300 border-b-2 ${
                      activeTab === tab
                        ? "text-amber-400 border-amber-400"
                        : "text-gray-400 border-transparent hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[150px]">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed font-light">{product.description}</p>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-amber-400 font-medium mb-3 tracking-wide">Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.top.map((note) => (
                        <span key={note} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-medium mb-3 tracking-wide">Heart Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.heart.map((note) => (
                        <span key={note} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-medium mb-3 tracking-wide">Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.base.map((note) => (
                        <span key={note} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-white">Customer Reviews</h3>
                    <button className="text-amber-400 hover:text-amber-300 transition-colors duration-200">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {product.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-900/50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{review.name}</div>
                            <div className="text-gray-500 text-sm">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-current" : "text-gray-600"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-amber-400" />
                        <span className="text-white">Authentic & Original</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-amber-400" />
                        <span className="text-white">Free Shipping Over $999</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RotateCcw className="w-5 h-5 text-amber-400" />
                        <span className="text-white">30-Day Return Policy</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Gift className="w-5 h-5 text-amber-400" />
                        <span className="text-white">Premium Gift Packaging</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Brand:</span>
                        <span className="text-white">Bold & Bottled</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">Eau de Parfum</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Concentration:</span>
                        <span className="text-white">15-20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Longevity:</span>
                        <span className="text-white">8-12 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sillage:</span>
                        <span className="text-white">Moderate to Heavy</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
