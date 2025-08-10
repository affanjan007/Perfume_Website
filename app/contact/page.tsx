"use client"

import type React from "react"

import { Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export default function Contact() {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const validateField = (field: string, value: string) => {
    let error = ""

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = `${field === "firstName" ? "First" : "Last"} name is required`
        } else if (value.trim().length < 2) {
          error = `${field === "firstName" ? "First" : "Last"} name must be at least 2 characters`
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          error = "Only letters, spaces, hyphens and apostrophes are allowed"
        }
        break
      case "email":
        if (!value.trim()) {
          error = "Email address is required"
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "phone":
        // No validation for phone number - accept any input
        break
      case "subject":
        if (!value.trim()) {
          error = "Please select a subject"
        }
        break
      case "message":
        if (!value.trim()) {
          error = "Message is required"
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters long"
        }
        break
    }

    return error
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    const error = validateField(field, value)
    setFormErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const errors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    }

    setFormErrors(errors)

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "")
    if (hasErrors) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setShowSuccess(true)
    setIsSubmitting(false)

    // Reset form and errors
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  // Scroll and mouse event handlers for animations
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
        
        .form-animate {
          animation: fadeInLeft 1s ease-out 0.3s both;
        }
        
        .contact-info-animate {
          animation: fadeInRight 1s ease-out 0.5s both;
        }
        
        .glow-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(245, 158, 11, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glow-card:hover {
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.6), 0 0 80px rgba(245, 158, 11, 0.3), inset 0 0 30px rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.8);
        }
        
        .glow-icon {
          animation: glowPulse 3s ease-in-out infinite;
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

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="floating-particles">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 9}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

          {/* Subtle Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div
            className="relative max-w-6xl mx-auto px-6 text-center hero-animate"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>
            </div>

            <h1 className="text-6xl md:text-7xl font-light tracking-tight text-white mb-6">
              <span className="font-thin">Get in</span>
              <br />
              <span className="font-normal bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Experience personalized luxury. Connect with our fragrance artisans for bespoke consultations and
              exceptional service.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-16">
              {/* Contact Form */}
              <div className="xl:col-span-3 form-animate">
                <div className="glow-card p-10 rounded-3xl shadow-2xl">
                  <div className="mb-8">
                    <h2 className="text-4xl font-light text-white mb-3">Send a Message</h2>
                    <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Success Message */}
                    {showSuccess && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <div>
                            <div className="text-green-400 font-medium">Message Sent Successfully!</div>
                            <div className="text-gray-300 text-sm">
                              Thank you for contacting us. We'll get back to you within 24 hours.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-300 mb-3 tracking-wide"
                        >
                          FIRST NAME *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 text-lg ${
                            formErrors.firstName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-600 focus:border-amber-400"
                          }`}
                          placeholder="Enter your first name"
                          required
                        />
                        {formErrors.firstName && <p className="text-red-400 text-sm mt-2">{formErrors.firstName}</p>}
                      </div>
                      <div className="group">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-300 mb-3 tracking-wide"
                        >
                          LAST NAME *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 text-lg ${
                            formErrors.lastName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-600 focus:border-amber-400"
                          }`}
                          placeholder="Enter your last name"
                          required
                        />
                        {formErrors.lastName && <p className="text-red-400 text-sm mt-2">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 text-lg ${
                          formErrors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-600 focus:border-amber-400"
                        }`}
                        placeholder="your.email@example.com"
                        required
                      />
                      {formErrors.email && <p className="text-red-400 text-sm mt-2">{formErrors.email}</p>}
                    </div>

                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">
                        PHONE NUMBER (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 text-lg ${
                          formErrors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-600 focus:border-amber-400"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formErrors.phone && <p className="text-red-400 text-sm mt-2">{formErrors.phone}</p>}
                    </div>

                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">
                        SUBJECT *
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white focus:outline-none transition-colors duration-300 text-lg appearance-none cursor-pointer ${
                          formErrors.subject
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-600 focus:border-amber-400"
                        }`}
                        required
                      >
                        <option value="" className="bg-gray-900">
                          Select a subject
                        </option>
                        <option value="consultation" className="bg-gray-900">
                          Fragrance Consultation
                        </option>
                        <option value="bespoke" className="bg-gray-900">
                          Bespoke Fragrance
                        </option>
                        <option value="product" className="bg-gray-900">
                          Product Inquiry
                        </option>
                        <option value="partnership" className="bg-gray-900">
                          Partnership
                        </option>
                      </select>
                      {formErrors.subject && <p className="text-red-400 text-sm mt-2">{formErrors.subject}</p>}
                    </div>

                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 tracking-wide">
                        MESSAGE *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 text-lg resize-none ${
                          formErrors.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-600 focus:border-amber-400"
                        }`}
                        placeholder="Tell us about your fragrance preferences or how we can assist you..."
                        required
                      ></textarea>
                      {formErrors.message && <p className="text-red-400 text-sm mt-2">{formErrors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-medium py-5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl text-lg tracking-wide overflow-hidden"
                    >
                      <span className="relative z-10">{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                      {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="xl:col-span-2 space-y-8 contact-info-animate">
                <div className="text-center xl:text-left">
                  <h2 className="text-4xl font-light text-white mb-4">Connect</h2>
                  <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-amber-600 mx-auto xl:mx-0 mb-6"></div>
                  <p className="text-gray-300 text-lg leading-relaxed font-light">
                    Discover the art of luxury fragrance through personalized consultations with our master perfumers.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="group flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300 glow-icon">
                      <MapPin className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2 text-white">Atelier Location</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Madison Avenue Boutique
                        <br />
                        New York, NY 10021
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300 glow-icon">
                      <Phone className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2 text-white">Direct Line</h3>
                      <p className="text-gray-300 leading-relaxed">
                        +1 (212) 555-LUXE
                        <br />
                        International: +1.212.555.5893
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300 glow-icon">
                      <Mail className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-2 text-white">Email Support</h3>
                      <p className="text-gray-300 leading-relaxed">
                        support@boldandbottled.com
                        <br />
                        orders@boldandbottled.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
