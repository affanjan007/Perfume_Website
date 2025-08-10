"use client"

import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { CreditCard, Truck, Mail, Shield, ArrowLeft, CheckCircle, Package, Clock } from "lucide-react"

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateZipCode = (zipCode: string, country: string) => {
  const zipPatterns = {
    "United States": /^\d{5}(-\d{4})?$/,
    Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    "United Kingdom": /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    Germany: /^\d{5}$/,
    France: /^\d{5}$/,
    Italy: /^\d{5}$/,
    Spain: /^\d{5}$/,
    Netherlands: /^\d{4} ?[A-Z]{2}$/i,
    Switzerland: /^\d{4}$/,
    Austria: /^\d{4}$/,
    Belgium: /^\d{4}$/,
    Sweden: /^\d{3} ?\d{2}$/,
    Norway: /^\d{4}$/,
    Denmark: /^\d{4}$/,
    Japan: /^\d{3}-?\d{4}$/,
    Australia: /^\d{4}$/,
    "New Zealand": /^\d{4}$/,
  }

  const pattern = zipPatterns[country]
  if (!pattern) return zipCode.length >= 3 && zipCode.length <= 10 // Generic validation
  return pattern.test(zipCode)
}

const validateName = (name: string) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name)
}

const validateAddress = (address: string) => {
  return address.trim().length >= 5
}

const validateCity = (city: string) => {
  return city.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(city)
}

const validateState = (state: string) => {
  return state.trim().length >= 2
}

const validateCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s/g, "")
  return /^\d{13,19}$/.test(cleaned)
}

const validateExpiryDate = (expiryDate: string) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!regex.test(expiryDate)) return false

  const [month, year] = expiryDate.split("/")
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const expYear = Number.parseInt(year)
  const expMonth = Number.parseInt(month)

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false
  }

  return true
}

const validateCVV = (cvv: string) => {
  return /^\d{3,4}$/.test(cvv)
}

const getShippingCost = (country: string, subtotal: number) => {
  const shippingRates = {
    // North America
    "United States": { standard: 25, express: 45, freeThreshold: 999 },
    Canada: { standard: 35, express: 65, freeThreshold: 1299 },
    Mexico: { standard: 40, express: 70, freeThreshold: 1299 },

    // Europe
    "United Kingdom": { standard: 45, express: 85, freeThreshold: 1499 },
    Germany: { standard: 45, express: 85, freeThreshold: 1499 },
    France: { standard: 45, express: 85, freeThreshold: 1499 },
    Italy: { standard: 45, express: 85, freeThreshold: 1499 },
    Spain: { standard: 45, express: 85, freeThreshold: 1499 },
    Netherlands: { standard: 45, express: 85, freeThreshold: 1499 },
    Switzerland: { standard: 50, express: 90, freeThreshold: 1499 },
    Austria: { standard: 45, express: 85, freeThreshold: 1499 },
    Belgium: { standard: 45, express: 85, freeThreshold: 1499 },
    Sweden: { standard: 45, express: 85, freeThreshold: 1499 },
    Norway: { standard: 50, express: 90, freeThreshold: 1499 },
    Denmark: { standard: 45, express: 85, freeThreshold: 1499 },

    // Asia
    Japan: { standard: 55, express: 95, freeThreshold: 1699 },
    "South Korea": { standard: 55, express: 95, freeThreshold: 1699 },
    China: { standard: 55, express: 95, freeThreshold: 1699 },
    Singapore: { standard: 55, express: 95, freeThreshold: 1699 },
    "Hong Kong": { standard: 55, express: 95, freeThreshold: 1699 },
    Taiwan: { standard: 55, express: 95, freeThreshold: 1699 },
    India: { standard: 55, express: 95, freeThreshold: 1699 },
    Pakistan: { standard: 55, express: 95, freeThreshold: 1699 },
    Thailand: { standard: 55, express: 95, freeThreshold: 1699 },
    Malaysia: { standard: 55, express: 95, freeThreshold: 1699 },
    Indonesia: { standard: 55, express: 95, freeThreshold: 1699 },
    Philippines: { standard: 55, express: 95, freeThreshold: 1699 },
    Vietnam: { standard: 55, express: 95, freeThreshold: 1699 },
    "United Arab Emirates": { standard: 55, express: 95, freeThreshold: 1699 },
    "Saudi Arabia": { standard: 55, express: 95, freeThreshold: 1699 },

    // Oceania
    Australia: { standard: 55, express: 95, freeThreshold: 1699 },
    "New Zealand": { standard: 55, express: 95, freeThreshold: 1699 },

    // Other
    Brazil: { standard: 65, express: 115, freeThreshold: 1999 },
    Argentina: { standard: 65, express: 115, freeThreshold: 1999 },
    "South Africa": { standard: 65, express: 115, freeThreshold: 1999 },
    Israel: { standard: 55, express: 95, freeThreshold: 1699 },
    Turkey: { standard: 50, express: 90, freeThreshold: 1499 },
    Russia: { standard: 65, express: 115, freeThreshold: 1999 },
  }

  const rates = shippingRates[country] || { standard: 65, express: 115, freeThreshold: 1999 }
  return subtotal >= rates.freeThreshold ? 0 : rates.standard
}

const getShippingTime = (country: string) => {
  const shippingTimes = {
    "United States": "3-5 Business Days",
    Canada: "5-7 Business Days",
    Mexico: "7-10 Business Days",
    "United Kingdom": "5-8 Business Days",
    Germany: "5-8 Business Days",
    France: "5-8 Business Days",
    Italy: "6-9 Business Days",
    Spain: "6-9 Business Days",
    Netherlands: "5-8 Business Days",
    Switzerland: "6-9 Business Days",
    Austria: "5-8 Business Days",
    Belgium: "5-8 Business Days",
    Sweden: "6-9 Business Days",
    Norway: "7-10 Business Days",
    Denmark: "5-8 Business Days",
    Japan: "8-12 Business Days",
    "South Korea": "8-12 Business Days",
    China: "10-15 Business Days",
    Singapore: "8-12 Business Days",
    "Hong Kong": "8-12 Business Days",
    Taiwan: "8-12 Business Days",
    India: "10-15 Business Days",
    Pakistan: "10-15 Business Days",
    Thailand: "8-12 Business Days",
    Malaysia: "8-12 Business Days",
    Indonesia: "10-15 Business Days",
    Philippines: "10-15 Business Days",
    Vietnam: "10-15 Business Days",
    "United Arab Emirates": "8-12 Business Days",
    "Saudi Arabia": "8-12 Business Days",
    Australia: "8-12 Business Days",
    "New Zealand": "8-12 Business Days",
    Brazil: "12-18 Business Days",
    Argentina: "12-18 Business Days",
    "South Africa": "12-18 Business Days",
    Israel: "8-12 Business Days",
    Turkey: "7-10 Business Days",
    Russia: "12-18 Business Days",
  }

  return shippingTimes[country] || "10-15 Business Days"
}

export default function Checkout() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if cart is empty (only after mounting)
  useEffect(() => {
    if (mounted && state.items.length === 0 && !orderPlaced) {
      router.push("/shop")
    }
  }, [mounted, state.items.length, router, orderPlaced])

  // Don't render until mounted
  if (!mounted) {
    return (
      <div className="pt-20 min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4">Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Calculate totals
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = getShippingCost(shippingInfo.country, subtotal)
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [field]: value }))

      // Real-time validation for shipping fields
      let error = ""
      switch (field) {
        case "firstName":
        case "lastName":
          if (value && !validateName(value)) {
            error = "Name must be at least 2 characters and contain only letters"
          }
          break
        case "email":
          if (value && !validateEmail(value)) {
            error = "Please enter a valid email address"
          }
          break
        case "phone":
          // No validation for phone number - accept any input
          break
        case "address":
          if (value && !validateAddress(value)) {
            error = "Address must be at least 5 characters"
          }
          break
        case "city":
          if (value && !validateCity(value)) {
            error = "City must be at least 2 characters and contain only letters"
          }
          break
        case "state":
          if (value && !validateState(value)) {
            error = "State must be at least 2 characters"
          }
          break
        case "zipCode":
          if (value && !validateZipCode(value, shippingInfo.country)) {
            error = "Please enter a valid ZIP/postal code"
          }
          break
      }
      setFormErrors((prev) => ({ ...prev, [field]: error }))
    } else if (section === "card") {
      setCardInfo((prev) => ({ ...prev, [field]: value }))

      // Real-time validation for card fields
      let error = ""
      switch (field) {
        case "cardholderName":
          if (value && !validateName(value)) {
            error = "Name must be at least 2 characters and contain only letters"
          }
          break
        case "cardNumber":
          const formatted = formatCardNumber(value)
          if (value && !validateCardNumber(formatted)) {
            error = "Please enter a valid card number"
          }
          break
        case "expiryDate":
          if (value && value.length === 5 && !validateExpiryDate(value)) {
            error = "Please enter a valid expiry date (MM/YY)"
          }
          break
        case "cvv":
          if (value && !validateCVV(value)) {
            error = "CVV must be 3 or 4 digits"
          }
          break
      }
      setFormErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const isFormValid = () => {
    const shippingErrors = {
      firstName: !shippingInfo.firstName.trim()
        ? "First name is required"
        : !validateName(shippingInfo.firstName)
          ? "Invalid first name"
          : "",
      lastName: !shippingInfo.lastName.trim()
        ? "Last name is required"
        : !validateName(shippingInfo.lastName)
          ? "Invalid last name"
          : "",
      email: !shippingInfo.email.trim()
        ? "Email is required"
        : !validateEmail(shippingInfo.email)
          ? "Invalid email address"
          : "",
      phone: "", // No validation for phone number
      address: !shippingInfo.address.trim()
        ? "Address is required"
        : !validateAddress(shippingInfo.address)
          ? "Invalid address"
          : "",
      city: !shippingInfo.city.trim() ? "City is required" : !validateCity(shippingInfo.city) ? "Invalid city" : "",
      state: !shippingInfo.state.trim()
        ? "State is required"
        : !validateState(shippingInfo.state)
          ? "Invalid state"
          : "",
      zipCode: !shippingInfo.zipCode.trim()
        ? "ZIP code is required"
        : !validateZipCode(shippingInfo.zipCode, shippingInfo.country)
          ? "Invalid ZIP code"
          : "",
    }

    let cardErrors = {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }

    if (paymentMethod === "card") {
      cardErrors = {
        cardholderName: !cardInfo.cardholderName.trim()
          ? "Cardholder name is required"
          : !validateName(cardInfo.cardholderName)
            ? "Invalid cardholder name"
            : "",
        cardNumber: !cardInfo.cardNumber.trim()
          ? "Card number is required"
          : !validateCardNumber(cardInfo.cardNumber)
            ? "Invalid card number"
            : "",
        expiryDate: !cardInfo.expiryDate.trim()
          ? "Expiry date is required"
          : !validateExpiryDate(cardInfo.expiryDate)
            ? "Invalid or expired date"
            : "",
        cvv: !cardInfo.cvv.trim() ? "CVV is required" : !validateCVV(cardInfo.cvv) ? "Invalid CVV" : "",
      }
    }

    const allErrors = { ...shippingErrors, ...cardErrors }
    return !Object.values(allErrors).some((error) => error !== "")
  }

  const validateForm = () => {
    const shippingErrors = {
      firstName: !shippingInfo.firstName.trim()
        ? "First name is required"
        : !validateName(shippingInfo.firstName)
          ? "Invalid first name"
          : "",
      lastName: !shippingInfo.lastName.trim()
        ? "Last name is required"
        : !validateName(shippingInfo.lastName)
          ? "Invalid last name"
          : "",
      email: !shippingInfo.email.trim()
        ? "Email is required"
        : !validateEmail(shippingInfo.email)
          ? "Invalid email address"
          : "",
      phone: "", // No validation for phone number
      address: !shippingInfo.address.trim()
        ? "Address is required"
        : !validateAddress(shippingInfo.address)
          ? "Invalid address"
          : "",
      city: !shippingInfo.city.trim() ? "City is required" : !validateCity(shippingInfo.city) ? "Invalid city" : "",
      state: !shippingInfo.state.trim()
        ? "State is required"
        : !validateState(shippingInfo.state)
          ? "Invalid state"
          : "",
      zipCode: !shippingInfo.zipCode.trim()
        ? "ZIP code is required"
        : !validateZipCode(shippingInfo.zipCode, shippingInfo.country)
          ? "Invalid ZIP code"
          : "",
    }

    let cardErrors = {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }

    if (paymentMethod === "card") {
      cardErrors = {
        cardholderName: !cardInfo.cardholderName.trim()
          ? "Cardholder name is required"
          : !validateName(cardInfo.cardholderName)
            ? "Invalid cardholder name"
            : "",
        cardNumber: !cardInfo.cardNumber.trim()
          ? "Card number is required"
          : !validateCardNumber(cardInfo.cardNumber)
            ? "Invalid card number"
            : "",
        expiryDate: !cardInfo.expiryDate.trim()
          ? "Expiry date is required"
          : !validateExpiryDate(cardInfo.expiryDate)
            ? "Invalid or expired date"
            : "",
        cvv: !cardInfo.cvv.trim() ? "CVV is required" : !validateCVV(cardInfo.cvv) ? "Invalid CVV" : "",
      }
    }

    const allErrors = { ...shippingErrors, ...cardErrors }
    setFormErrors(allErrors)

    return !Object.values(allErrors).some((error) => error !== "")
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      if (!validateEmail(shippingInfo.email) && shippingInfo.email.trim() !== "") {
        alert("Please enter a valid email address.")
        return
      }
      alert("Please fill in all required fields.")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate order number
      const orderNum = `BB${Date.now().toString().slice(-6)}`
      setOrderNumber(orderNum)
      setOrderPlaced(true)

      // Clear cart
      state.items.forEach((item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
      })

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart-items")
      }
    } catch (error) {
      console.error("Order processing error:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Order confirmation page
  if (orderPlaced) {
    return (
      <div className="pt-20 min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-gray-300 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Package className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Order Number</h3>
                <p className="text-amber-400 font-mono text-lg">{orderNumber}</p>
              </div>
              <div>
                <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Estimated Delivery</h3>
                <p className="text-gray-300">{getShippingTime(shippingInfo.country)}</p>
              </div>
              <div>
                <Mail className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Confirmation Email</h3>
                <p className="text-gray-300">Sent to {shippingInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => router.push("/shop")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium px-8 py-3 rounded-lg transition-all duration-300 mr-4"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main checkout page
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
        
        .header-animate {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .form-animate {
          animation: fadeInLeft 1s ease-out 0.3s both;
        }
        
        .summary-animate {
          animation: fadeInRight 1s ease-out 0.5s both;
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
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${20 + i * 12}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 header-animate">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-bold text-white">Checkout</h1>
            </div>
            <div className="text-amber-400 font-semibold">Total: ${total.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8 form-animate">
              {/* Shipping Information */}
              <div className="glow-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-6 h-6 text-amber-400" />
                  <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.firstName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="John"
                    />
                    {formErrors.firstName && <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.lastName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && <p className="text-red-400 text-sm mt-1">{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.address
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="123 Main Street"
                    />
                    {formErrors.address && <p className="text-red-400 text-sm mt-1">{formErrors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.city ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="New York"
                    />
                    {formErrors.city && <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.state ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="NY"
                    />
                    {formErrors.state && <p className="text-red-400 text-sm mt-1">{formErrors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
                      className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                        formErrors.zipCode
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-amber-500"
                      }`}
                      placeholder="10001"
                    />
                    {formErrors.zipCode && <p className="text-red-400 text-sm mt-1">{formErrors.zipCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {/* North America */}
                      <optgroup label="North America" className="bg-gray-900">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </optgroup>

                      {/* Europe */}
                      <optgroup label="Europe" className="bg-gray-900">
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Austria">Austria</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Norway">Norway</option>
                        <option value="Denmark">Denmark</option>
                      </optgroup>

                      {/* Asia */}
                      <optgroup label="Asia" className="bg-gray-900">
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option>
                        <option value="China">China</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="India">India</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                      </optgroup>

                      {/* Oceania */}
                      <optgroup label="Oceania" className="bg-gray-900">
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                      </optgroup>

                      {/* Other Popular Countries */}
                      <optgroup label="Other" className="bg-gray-900">
                        <option value="Brazil">Brazil</option>
                        <option value="Argentina">Argentina</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Israel">Israel</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Russia">Russia</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glow-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-amber-400" />
                  <h2 className="text-xl font-semibold text-white">Payment Method</h2>
                </div>

                {/* Payment Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                      paymentMethod === "card"
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-amber-400" />
                      <div className="text-left">
                        <div className="text-white font-medium">Credit/Debit Card</div>
                        <div className="text-gray-400 text-sm">Visa, Mastercard, American Express</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                      paymentMethod === "cod"
                        ? "border-amber-400 bg-amber-400/10"
                        : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6 text-amber-400" />
                      <div className="text-left">
                        <div className="text-white font-medium">Cash on Delivery</div>
                        <div className="text-gray-400 text-sm">Pay when you receive</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        value={cardInfo.cardholderName}
                        onChange={(e) => handleInputChange("card", "cardholderName", e.target.value)}
                        className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                          formErrors.cardholderName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-amber-500"
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.cardholderName && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.cardholderName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card Number *</label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) => handleInputChange("card", "cardNumber", formatCardNumber(e.target.value))}
                        className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                          formErrors.cardNumber
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-amber-500"
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {formErrors.cardNumber && <p className="text-red-400 text-sm mt-1">{formErrors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          value={cardInfo.expiryDate}
                          onChange={(e) => handleInputChange("card", "expiryDate", formatExpiryDate(e.target.value))}
                          className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            formErrors.expiryDate
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-amber-500"
                          }`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {formErrors.expiryDate && <p className="text-red-400 text-sm mt-1">{formErrors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CVV *</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => handleInputChange("card", "cvv", e.target.value.replace(/\D/g, ""))}
                          className={`w-full bg-gray-800 border text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                            formErrors.cvv
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:ring-amber-500"
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {formErrors.cvv && <p className="text-red-400 text-sm mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <div className="text-amber-300 font-medium mb-1">Cash on Delivery</div>
                        <div className="text-gray-300 text-sm">
                          You can pay in cash when your order is delivered to your doorstep. Please have the exact
                          amount ready.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 summary-animate">
              <div className="glow-card rounded-2xl p-8 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `https://via.placeholder.com/64x64/374151/f59e0b?text=${encodeURIComponent(item.name.charAt(0))}`
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.name}</h3>
                        {item.selectedSize && <p className="text-gray-400 text-sm">Size: {item.selectedSize}</p>}
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-amber-400 font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-700 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping ({shippingInfo.country})</span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <div className="text-green-400 text-sm">
                      🎉 You saved ${getShippingCost(shippingInfo.country, 0)} on shipping!
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-amber-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !isFormValid()}
                  className="w-full mt-8 glow-button disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Place Order • $${total.toFixed(2)}`
                  )}
                </button>

                {/* Security Notice */}
                <div className="mt-6 flex items-center space-x-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
