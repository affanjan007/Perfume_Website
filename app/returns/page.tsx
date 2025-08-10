export default function Returns() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Returns & Exchanges</h1>
          <div className="w-20 h-px bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {/* Return Policy */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">30-Day Return Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                We want you to love your fragrance. If you're not completely satisfied, we offer a hassle-free 30-day
                return policy.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">What's Covered:</h3>
                <ul className="space-y-1">
                  <li>• Unopened items in original packaging</li>
                  <li>• Opened items with at least 90% remaining</li>
                  <li>• Defective or damaged products</li>
                  <li>• Wrong item shipped</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Return */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">How to Return</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-400">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Contact Us</h3>
                <p className="text-gray-300 text-sm">
                  Email us at returns@boldandbottled.com or call our customer service
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-400">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Get Return Label</h3>
                <p className="text-gray-300 text-sm">We'll email you a prepaid return shipping label within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-400">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Ship & Refund</h3>
                <p className="text-gray-300 text-sm">
                  Pack securely, ship back, and receive your refund in 3-5 business days
                </p>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Exchanges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Size Exchanges</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Free exchanges within 30 days</li>
                  <li>• Same fragrance, different size</li>
                  <li>• Pay only the price difference</li>
                  <li>• Fast processing (1-2 business days)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Fragrance Exchanges</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Exchange for different fragrance</li>
                  <li>• Must be unopened or 90%+ remaining</li>
                  <li>• Pay price difference if applicable</li>
                  <li>• One exchange per order</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Refund Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Processing Time</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Credit Card: 3-5 business days</li>
                    <li>• PayPal: 1-2 business days</li>
                    <li>• Bank Transfer: 5-7 business days</li>
                  </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-purple-400 font-semibold mb-2">Refund Amount</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Full product price refunded</li>
                    <li>• Original shipping costs refunded</li>
                    <li>• Return shipping: FREE</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h3 className="text-amber-400 font-semibold mb-2">💎 VIP Customer Benefits</h3>
                <p className="text-gray-300 text-sm">
                  Customers with orders over $500 enjoy extended 60-day returns and priority processing.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <h3 className="text-amber-400 font-semibold mb-2">Email</h3>
                <p className="text-gray-300">returns@boldandbottled.com</p>
                <p className="text-gray-500 text-sm">Response within 24 hours</p>
              </div>
              <div>
                <h3 className="text-amber-400 font-semibold mb-2">Phone</h3>
                <p className="text-gray-300">+1 (212) 555-LUXE</p>
                <p className="text-gray-500 text-sm">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
