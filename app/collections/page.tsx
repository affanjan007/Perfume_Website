"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Crown } from "lucide-react"

export default function Collections() {
  const collections = [
    {
      id: "executive",
      name: "Executive",
      subtitle: "Power & Precision",
      description: "Sophisticated fragrances crafted for the modern visionary",
      image: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg",
      productCount: 6,
      icon: Crown,
      gradient: "from-slate-900 via-gray-800 to-black",
    },
    {
      id: "evening-noir",
      name: "Evening Noir",
      subtitle: "Mystique & Allure",
      description: "Bold and captivating essences for unforgettable moments",
      image: "https://images.pexels.com/photos/16445070/pexels-photo-16445070.jpeg",
      productCount: 6,
      icon: Sparkles,
      gradient: "from-amber-900 via-yellow-800 to-amber-700",
    },
  ]

  return (
    <>
      <style jsx>{`
        .glow-collection-card {
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.2), inset 0 0 20px rgba(245, 158, 11, 0.05);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glow-collection-card:hover {
          box-shadow: 0 0 60px rgba(245, 158, 11, 0.5), 0 0 100px rgba(245, 158, 11, 0.3), inset 0 0 40px rgba(245, 158, 11, 0.1);
        }
        
        .glow-icon-box {
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 15px rgba(245, 158, 11, 0.1);
          transition: all 0.3s ease;
        }
        
        .glow-icon-box:hover {
          box-shadow: 0 0 35px rgba(245, 158, 11, 0.6), 0 0 50px rgba(245, 158, 11, 0.3), inset 0 0 25px rgba(245, 158, 11, 0.2);
        }
        
        .glow-button {
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glow-button:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.7), 0 0 80px rgba(245, 158, 11, 0.4);
        }
        
        .glow-featured-image {
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.2);
          transition: all 0.5s ease;
        }
        
        .glow-featured-image:hover {
          box-shadow: 0 0 70px rgba(245, 158, 11, 0.4), 0 0 100px rgba(245, 158, 11, 0.2);
        }
        
        .glow-floating-element {
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.2), inset 0 0 20px rgba(245, 158, 11, 0.1);
        }
        
        .glow-border {
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.3);
        }
        
        .collection-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, rgba(245, 158, 11, 0.6), transparent, rgba(245, 158, 11, 0.6));
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .collection-border-glow::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 22px;
          background: linear-gradient(45deg, #1f2937, #000000, #374151);
        }
        
        .glow-collection-card:hover .collection-border-glow {
          opacity: 1;
        }
      `}</style>

      <div className="pt-20 min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-28 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Cpath d='M40 40L0 0h80z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8 glow-border"></div>
            </div>

            <h1 className="text-7xl md:text-8xl font-extralight tracking-tight text-white mb-8">
              <span className="font-thin">Our</span>
              <br />
              <span className="font-light bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Collections
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Two distinctive journeys through the art of masculine fragrance. Each collection tells its own story of
              sophistication and allure.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {collections.map((collection) => {
                const IconComponent = collection.icon
                return (
                  <div
                    key={collection.id}
                    className="group relative overflow-hidden rounded-3xl h-[600px] cursor-pointer glow-collection-card"
                  >
                    {/* Animated Border Glow */}
                    <div className="collection-border-glow"></div>

                    {/* Background Image */}
                    <div className="absolute inset-0 z-10">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 z-20 bg-gradient-to-t ${collection.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-30 flex flex-col justify-end p-10">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 glow-icon-box">
                          <IconComponent className="w-8 h-8 text-amber-400" />
                        </div>
                      </div>

                      {/* Collection Info */}
                      <div className="mb-8">
                        <h2 className="text-4xl font-light text-white mb-2 tracking-wide">{collection.name}</h2>
                        <p className="text-amber-300 text-lg font-medium mb-4 tracking-widest uppercase">
                          {collection.subtitle}
                        </p>
                        <p className="text-gray-200 text-lg leading-relaxed mb-6 font-light">
                          {collection.description}
                        </p>

                        <div className="inline-block">
                          <span className="text-sm bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white border border-white/30 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                            {collection.productCount} Exclusive Fragrances
                          </span>
                        </div>
                      </div>

                      {/* CTA Button - Fixed to prevent auto-scroll */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/shop?collection=${collection.id}`}
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          className="group/btn flex items-center space-x-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 glow-button"
                        >
                          <span className="tracking-wide">Explore Collection</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
