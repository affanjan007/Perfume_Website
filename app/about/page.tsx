"use client"

import Image from "next/image"
import { Award, Users, Globe, Heart, Sparkles, Crown, Shield, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function About() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Scroll and mouse event handlers for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      })
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleExploreCollection = () => {
    router.push("/collections")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

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
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 15px rgba(245, 158, 11, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.6), inset 0 0 25px rgba(245, 158, 11, 0.2);
          }
        }
        
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .hero-animate {
          animation: fadeInUp 1s ease-out;
        }
        
        .hero-image-animate {
          animation: fadeInRight 1.2s ease-out 0.3s both;
        }
        
        .mission-animate {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .card-animate {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        .heritage-text-animate {
          animation: fadeInLeft 1s ease-out 0.2s both;
        }
        
        .heritage-image-animate {
          animation: fadeInRight 1s ease-out 0.4s both;
        }
        
        .glow-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.3), 
                      inset 0 0 20px rgba(245, 158, 11, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glow-card:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.6), 
                      0 0 80px rgba(245, 158, 11, 0.3), 
                      inset 0 0 30px rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.8);
          transform: translateY(-5px) scale(1.02);
        }
        
        .glow-icon {
          animation: glowPulse 3s ease-in-out infinite, iconFloat 4s ease-in-out infinite;
        }
        
        .glow-icon:hover {
          animation-play-state: paused;
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.8), 
                      0 0 60px rgba(245, 158, 11, 0.5);
        }
        
        .glow-image {
          box-shadow: 0 0 40px rgba(245, 158, 11, 0.2);
          transition: all 0.5s ease;
        }
        
        .glow-image:hover {
          box-shadow: 0 0 70px rgba(245, 158, 11, 0.4), 
                      0 0 100px rgba(245, 158, 11, 0.2);
          transform: scale(1.02) rotateY(5deg);
        }
        
        .glow-button {
          background: linear-gradient(45deg, #f59e0b, #eab308);
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .glow-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -200%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .glow-button:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.7), 
                      0 0 80px rgba(245, 158, 11, 0.4);
          transform: translateY(-3px) scale(1.05);
        }
        
        .sparkle-icon {
          animation: iconFloat 3s ease-in-out infinite;
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
        
        .card-animate:nth-child(1) { animation-delay: 0.1s; }
        .card-animate:nth-child(2) { animation-delay: 0.2s; }
        .card-animate:nth-child(3) { animation-delay: 0.3s; }
        .card-animate:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 8}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div 
                className="space-y-8 hero-animate"
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-8 h-8 text-amber-400 sparkle-icon" />
                  <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                    Our Legacy
                  </h1>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Founded in 1985, Bold & Bottled has been crafting exceptional men's fragrances that capture the essence
                  of modern masculinity and sophistication. Our journey began with a simple vision: to create perfumes
                  that embody confidence and tell the story of the contemporary gentleman.
                </p>
                <div className="flex items-center space-x-8 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      40+
                    </div>
                    <div className="text-gray-400 text-sm">Years Excellence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      50+
                    </div>
                    <div className="text-gray-400 text-sm">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      1M+
                    </div>
                    <div className="text-gray-400 text-sm">Satisfied Clients</div>
                  </div>
                </div>
              </div>
              <div className="relative hero-image-animate">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-2 shadow-2xl glow-image">
                  <Image
                    src="https://images.pexels.com/photos/15275974/pexels-photo-15275974.jpeg"
                    alt="Luxury perfume crafting process"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 mission-animate">
              <div className="flex items-center justify-center mb-6">
                <Crown className="w-8 h-8 text-amber-400 mr-3 glow-icon" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <Crown className="w-8 h-8 text-amber-400 ml-3 glow-icon" />
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To create extraordinary men's fragrances that inspire confidence, command respect, and celebrate the
                unique essence of every gentleman who wears them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Excellence",
                  description: "Uncompromising quality in every bottle",
                  gradient: "from-amber-500 to-yellow-600",
                },
                {
                  icon: Users,
                  title: "Craftsmanship",
                  description: "Master perfumers with decades of experience",
                  gradient: "from-yellow-500 to-amber-600",
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  description: "Serving customers in over 50 countries",
                  gradient: "from-amber-600 to-yellow-500",
                },
                {
                  icon: Heart,
                  title: "Passion",
                  description: "Love for the art of fragrance creation",
                  gradient: "from-yellow-600 to-amber-500",
                },
              ].map((item, index) => (
                <div key={index} className="group text-center card-animate">
                  <div className="relative rounded-2xl p-8 transition-all duration-500 glow-card">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 glow-icon`}
                    >
                      <item.icon className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1 heritage-image-animate">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-2 shadow-2xl glow-image">
                  <Image
                    src="https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg"
                    alt="Heritage luxury fragrance collection"
                    width={500}
                    height={600}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-8 heritage-text-animate">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-8 h-8 text-amber-400 glow-icon" />
                  <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                    A Legacy of Excellence
                  </h2>
                </div>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    For nearly four decades, we have been at the forefront of luxury men's fragrance creation. Our master
                    perfumers source the finest masculine ingredients from around the world, from Italian bergamot to
                    Indian sandalwood, ensuring each fragrance is a masterpiece of masculine sophistication.
                  </p>
                  <p>
                    Our commitment to crafting scents for the modern gentleman has made us a leader in men's luxury
                    fragrances. We work directly with suppliers to ensure the highest quality ingredients while
                    maintaining traditional masculine perfumery techniques.
                  </p>
                  <p>
                    Today, Bold & Bottled continues to innovate while honoring classic masculine scent profiles, creating
                    fragrances that are both timeless and contemporary for today's confident man.
                  </p>
                </div>

                {/* Quality Indicators */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  <div className="flex items-center space-x-3 rounded-xl p-4 glow-card">
                    <Star className="w-6 h-6 text-amber-400 glow-icon" />
                    <div>
                      <div className="text-white font-semibold">Premium Ingredients</div>
                      <div className="text-gray-400 text-sm">Sourced globally</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rounded-xl p-4 glow-card">
                    <Award className="w-6 h-6 text-amber-400 glow-icon" />
                    <div>
                      <div className="text-white font-semibold">Master Crafted</div>
                      <div className="text-gray-400 text-sm">Expert perfumers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="rounded-3xl p-12 max-w-4xl mx-auto glow-card">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-6">
                Experience Our Craftsmanship
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Discover the art of luxury fragrance with our expertly curated collection of premium men's scents.
              </p>
              <button
                onClick={handleExploreCollection}
                className="text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform glow-button relative z-10"
              >
                Explore Our Collection
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
