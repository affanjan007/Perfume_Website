"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg font-playfair">BB</span>
              </div>
              <span className="text-2xl font-playfair font-bold">Bold & Bottled</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover the art of masculine fragrance. Each scent tells a story, crafted with the finest ingredients for
              the modern gentleman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping-info"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Bold & Bottled. All rights reserved.</p>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/accounts/login/?next=%2Flogin%2F&source=desktop_nav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
