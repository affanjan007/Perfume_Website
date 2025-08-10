"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [scrollY, setScrollY] = useState(0)

  // Add scroll event handler for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Shipping times vary by location: United States (3-5 business days), International (8-10 business days). Express shipping options are available for faster delivery.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes! We offer free standard shipping on orders over $999 within the US. International free shipping thresholds vary by region.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to over 40 countries worldwide including Europe, Asia, Australia, and more. International shipping rates and times vary by destination.",
        },
      ],
    },
    {
      category: "Products & Fragrances",
      questions: [
        {
          question: "How do I choose the right fragrance?",
          answer:
            "Consider the occasion, season, and your personal style. Our fragrance notes descriptions and customer reviews can help. We also offer 30ml discovery sizes to try new scents.",
        },
        {
          question: "How long do your fragrances last?",
          answer:
            "Our Eau de Parfum concentration (15-20%) typically lasts 8-12 hours on the skin. Longevity can vary based on skin type, application, and environmental factors.",
        },
        {
          question: "Are your fragrances authentic?",
          answer:
            "Yes, all our fragrances are 100% authentic and sourced directly from authorized distributors. We guarantee the authenticity of every product we sell.",
        },
        {
          question: "What's the difference between your collections?",
          answer:
            "Our Executive Collection features sophisticated, professional scents perfect for business settings. Evening Noir offers bold, mysterious fragrances ideal for special occasions and nighttime wear.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for unopened items or opened items with 90%+ remaining. VIP customers (orders $500+) enjoy extended 60-day returns.",
        },
        {
          question: "Can I exchange for a different fragrance?",
          answer:
            "Yes! You can exchange for a different fragrance within 30 days. The item must be unopened or have 90%+ remaining. You'll pay any price difference.",
        },
        {
          question: "How do I return an item?",
          answer:
            "Contact our customer service at returns@boldandbottled.com. We'll provide a prepaid return label within 24 hours. Refunds are processed within 3-5 business days after we receive your return.",
        },
        {
          question: "Do you cover return shipping costs?",
          answer:
            "Yes! We provide prepaid return labels for all returns within our policy. You won't pay anything to return your order.",
        },
      ],
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer:
            "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and receive exclusive offers.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Cash on Delivery (select regions).",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details on our servers.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "You can modify or cancel your order within 2 hours of placing it. After that, orders enter our fulfillment process. Contact customer service immediately for assistance.",
        },
      ],
    },
    {
      category: "Fragrance Care",
      questions: [
        {
          question: "How should I store my fragrances?",
          answer:
            "Store fragrances in a cool, dark place away from direct sunlight and heat. Avoid bathrooms due to humidity. Proper storage can extend fragrance life for years.",
        },
        {
          question: "How many sprays should I use?",
          answer:
            "Start with 2-3 sprays on pulse points (wrists, neck). You can always add more, but it's harder to remove excess. Less is often more with quality fragrances.",
        },
        {
          question: "Can fragrances expire?",
          answer:
            "Fragrances can last 3-5 years when stored properly. Signs of expiration include color changes, off-smells, or reduced performance. Our products are always fresh when shipped.",
        },
        {
          question: "Why does fragrance smell different on me?",
          answer:
            "Fragrances interact with your skin's natural oils, pH, and chemistry. Factors like diet, hormones, and skin type can affect how a fragrance develops on you.",
        },
      ],
    },
  ]

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
        
        .section-animate {
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
        
        .section-animate:nth-child(1) { animation-delay: 0.1s; }
        .section-animate:nth-child(2) { animation-delay: 0.2s; }
        .section-animate:nth-child(3) { animation-delay: 0.3s; }
        .section-animate:nth-child(4) { animation-delay: 0.4s; }
        .section-animate:nth-child(5) { animation-delay: 0.5s; }
      `}</style>

      <div className="pt-20 min-h-screen bg-black relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 11}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 hero-animate">
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <div className="w-20 h-px bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about our luxury fragrances and services.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <section
                key={categoryIndex}
                className="glow-card rounded-2xl p-8 section-animate"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <h2 className="text-2xl font-semibold text-amber-400 mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const itemIndex = categoryIndex * 100 + questionIndex
                    const isOpen = openItems.includes(itemIndex)

                    return (
                      <div key={questionIndex} className="border border-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full px-6 py-4 text-left bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="text-white font-medium">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 py-4 bg-gray-900/30">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <section
            className="mt-12 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-2xl p-8 text-center glow-card section-animate"
            style={{ animationDelay: "1s" }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-6">
              Our customer service team is here to help you find the perfect fragrance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-amber-400 font-semibold mb-2">Email Support</h3>
                <p className="text-gray-300 text-sm">support@boldandbottled.com</p>
                <p className="text-gray-500 text-xs">Response within 24 hours</p>
              </div>
              <div>
                <h3 className="text-amber-400 font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-300 text-sm">+1 (212) 555-LUXE</p>
                <p className="text-gray-500 text-xs">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
