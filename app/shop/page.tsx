"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, Search, X, ShoppingCart, Crown, Sparkles } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useSearchParams } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  collection: "executive" | "evening-noir"
  rating: number
}

export default function Shop() {
  const { addToCartWithAnimation } = useCart()
  const [sortBy, setSortBy] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const searchParams = useSearchParams()

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

  // Check for collection filter from URL params and handle navigation
  useEffect(() => {
    const collectionParam = searchParams.get("collection")
    if (collectionParam && collectionParam !== selectedCollection) {
      setSelectedCollection(collectionParam)
    }
  }, [searchParams, selectedCollection])

  // Add a function to handle collection changes with URL updates
  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId)

    // Update URL without causing page reload
    const newUrl = collectionId === "all" ? "/shop" : `/shop?collection=${collectionId}`

    window.history.pushState({}, "", newUrl)
  }

  const products: Product[] = [
    {
      id: "1",
      name: "Steel & Sage",
      price: 299,
      image: "https://images.pexels.com/photos/16445070/pexels-photo-16445070.jpeg",
      description: "A sophisticated blend of dark woods and masculine spices",
      collection: "evening-noir",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Tom Ford",
      price: 349,
      image: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg",
      description: "Warm amber and leather with hints of bergamot",
      collection: "executive",
      rating: 5,
    },
    {
      id: "3",
      name: "Urban Legend",
      price: 279,
      image: "https://images.pexels.com/photos/8789609/pexels-photo-8789609.jpeg",
      description: "Fresh citrus notes with a bold woody base",
      collection: "executive",
      rating: 4,
    },
    {
      id: "4",
      name: "Royal Bourbon",
      price: 399,
      image: "https://images.pexels.com/photos/15275974/pexels-photo-15275974.jpeg",
      description: "Rich tobacco and whiskey with sandalwood undertones",
      collection: "evening-noir",
      rating: 4.5,
    },
    {
      id: "5",
      name: "Ocean Storm",
      price: 259,
      image: "https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg",
      description: "Aquatic freshness with marine minerals and sea salt",
      collection: "executive",
      rating: 4,
    },
    {
      id: "6",
      name: "Desert King",
      price: 329,
      image: "https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg",
      description: "Exotic oud and spices with warm amber",
      collection: "evening-noir",
      rating: 5,
    },
    // New Products with varied ratings
    {
      id: "7",
      name: "Midnight Velvet",
      price: 379,
      image: "https://images.pexels.com/photos/19272234/pexels-photo-19272234.jpeg",
      description: "Luxurious velvet musk with dark chocolate and vanilla",
      collection: "evening-noir",
      rating: 4.5,
    },
    {
      id: "8",
      name: "Golden Summit",
      price: 429,
      image: "https://images.pexels.com/photos/31847820/pexels-photo-31847820.jpeg",
      description: "Premium bergamot and cedar with golden amber finish",
      collection: "executive",
      rating: 5,
    },
    {
      id: "9",
      name: "Crimson Edge",
      price: 359,
      image: "https://images.pexels.com/photos/29801355/pexels-photo-29801355.jpeg",
      description: "Bold spices with leather and smoky woods",
      collection: "evening-noir",
      rating: 4,
    },
    {
      id: "10",
      name: "Platinum Reserve",
      price: 499,
      image: "https://images.pexels.com/photos/30970927/pexels-photo-30970927.jpeg",
      description: "Exclusive blend of rare iris and white musk",
      collection: "executive",
      rating: 5,
    },
    {
      id: "11",
      name: "Storm Breaker",
      price: 319,
      image: "https://images.pexels.com/photos/15926320/pexels-photo-15926320.jpeg",
      description: "Dynamic citrus burst with thunderous base notes",
      collection: "executive",
      rating: 4.5,
    },
    {
      id: "12",
      name: "Shadow Noir",
      price: 389,
      image: "https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg",
      description: "Mysterious black pepper with dark rose and patchouli",
      collection: "evening-noir",
      rating: 4,
    },
  ]

  // Filter and sort products based on search query, collection, and selected option
  const filteredAndSortedProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCollection = selectedCollection === "all" || product.collection === selectedCollection
      return matchesSearch && matchesCollection
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    // Add default size for products from shop page
    const productWithSize = {
      ...product,
      selectedSize: "50ml", // Default size
      id: `${product.id}-50ml`, // Unique ID with size
    }

    addToCartWithAnimation(productWithSize, event.currentTarget)
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const productName = target.alt
    target.src = `https://via.placeholder.com/300x400/f3f4f6/374151?text=${encodeURIComponent(productName)}`
  }

  const getCollectionIcon = (collection: string) => {
    switch (collection) {
      case "executive":
        return Crown
      case "evening-noir":
        return Sparkles
      default:
        return Star
    }
  }

  const getCollectionName = (collection: string) => {
    switch (collection) {
      case "executive":
        return "Executive"
      case "evening-noir":
        return "Evening Noir"
      default:
        return "All Collections"
    }
  }

  const getCollectionColor = (collection: string) => {
    switch (collection) {
      case "executive":
        return "from-slate-600 to-gray-700"
      case "evening-noir":
        return "from-amber-600 to-yellow-700"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  const collections = [
    { id: "all", name: "All Collections", count: products.length },
    { id: "executive", name: "Executive", count: products.filter((p) => p.collection === "executive").length },
    { id: "evening-noir", name: "Evening Noir", count: products.filter((p) => p.collection === "evening-noir").length },
  ]

  // Add CSS styles at the beginning of the return statement
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
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        .hero-animate {
          animation: fadeInUp 1s ease-out;
        }
        
        .collection-animate {
          animation: fadeInScale 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        .product-animate {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        .glow-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glow-card:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.4), 0 0 80px rgba(245, 158, 11, 0.2);
          transform: translateY(-5px) scale(1.02);
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
        
        .collection-animate:nth-child(1) { animation-delay: 0.1s; }
        .collection-animate:nth-child(2) { animation-delay: 0.2s; }
        .collection-animate:nth-child(3) { animation-delay: 0.3s; }
        
        .product-animate:nth-child(1) { animation-delay: 0.1s; }
        .product-animate:nth-child(2) { animation-delay: 0.2s; }
        .product-animate:nth-child(3) { animation-delay: 0.3s; }
        .product-animate:nth-child(4) { animation-delay: 0.4s; }
        .product-animate:nth-child(5) { animation-delay: 0.5s; }
        .product-animate:nth-child(6) { animation-delay: 0.6s; }
        .product-animate:nth-child(7) { animation-delay: 0.7s; }
        .product-animate:nth-child(8) { animation-delay: 0.8s; }
      `}</style>

      <div className="pt-20 min-h-screen bg-black relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 12}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          {/* Header with animation */}
          <div
            className="text-center mb-12 hero-animate"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            <h1 className="text-4xl font-bold mb-4 text-white">Men's Collection</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover your perfect masculine fragrance from our curated selection of luxury men's perfumes
            </p>
          </div>

          {/* Collection Filter Tabs with animation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {collections.map((collection, index) => {
                const IconComponent = getCollectionIcon(collection.id)
                const isActive = selectedCollection === collection.id

                return (
                  <button
                    key={collection.id}
                    onClick={() => handleCollectionChange(collection.id)}
                    className={`collection-animate flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-r ${getCollectionColor(collection.id)} text-white shadow-lg glow-card`
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{collection.name}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {collection.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search and Filter Section with glow effect */}
          <div className="glow-card p-6 rounded-lg shadow-sm mb-8 hero-animate">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search perfumes by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCollection !== "all" && (
                <div className="flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm border border-amber-500/30">
                  <span>Collection: {getCollectionName(selectedCollection)}</span>
                  <button
                    onClick={() => handleCollectionChange("all")}
                    className="hover:bg-amber-500/30 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} className="hover:bg-blue-500/30 rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Search Results Info */}
            <div className="mt-4 text-sm text-gray-400">
              {filteredAndSortedProducts.length > 0 ? (
                <span>
                  Showing {filteredAndSortedProducts.length} perfume{filteredAndSortedProducts.length !== 1 ? "s" : ""}
                  {selectedCollection !== "all" && ` in ${getCollectionName(selectedCollection)}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
              ) : (
                <span className="text-red-400">
                  No perfumes found
                  {selectedCollection !== "all" && ` in ${getCollectionName(selectedCollection)}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
              )}
            </div>
          </div>

          {/* Products Grid with staggered animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product, index) => {
                const CollectionIcon = getCollectionIcon(product.collection)

                return (
                  <div
                    key={product.id}
                    className="product-animate glow-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:border-gray-600 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Collection Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`flex items-center space-x-2 bg-gradient-to-r ${getCollectionColor(product.collection)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}
                      >
                        <CollectionIcon className="w-3 h-3" />
                        <span>{getCollectionName(product.collection)}</span>
                      </div>
                    </div>

                    {/* Clickable Product Image */}
                    <a href={`/product/${product.id}`} onClick={scrollToTop} className="block relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 text-black px-6 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Details
                        </div>
                      </div>
                    </a>

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

                      {/* Clickable Product Name */}
                      <a
                        href={`/product/${product.id}`}
                        onClick={scrollToTop}
                        className="hover:text-amber-400 transition-colors duration-200"
                      >
                        <h3 className="text-xl font-semibold mb-2 cursor-pointer text-white">{product.name}</h3>
                      </a>

                      <p className="text-gray-400 mb-3 text-sm">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-400">${product.price}</span>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-amber-600 hover:bg-amber-700 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-20 hero-animate">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No perfumes found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or collection filter</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="bg-amber-600 hover:bg-amber-700 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => handleCollectionChange("all")}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                  >
                    Show All Collections
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
