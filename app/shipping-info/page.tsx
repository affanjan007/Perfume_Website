export default function ShippingInfo() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Shipping Information</h1>
          <div className="w-20 h-px bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {/* Shipping Times */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Delivery Times</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-amber-400 mb-4">🇺🇸 United States</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <strong>Standard Shipping:</strong> 3-5 business days
                  </li>
                  <li>
                    <strong>Express Shipping:</strong> 1-2 business days
                  </li>
                  <li>
                    <strong>Same Day (Select Cities):</strong> Within 24 hours
                  </li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">🌍 International</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <strong>Standard International:</strong> 8-10 business days
                  </li>
                  <li>
                    <strong>Express International:</strong> 3-5 business days
                  </li>
                  <li>
                    <strong>Premium International:</strong> 1-3 business days
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Shipping Costs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-4 text-amber-400 font-semibold">Region</th>
                    <th className="pb-4 text-amber-400 font-semibold">Standard</th>
                    <th className="pb-4 text-amber-400 font-semibold">Express</th>
                    <th className="pb-4 text-amber-400 font-semibold">Free Shipping</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-4">United States</td>
                    <td className="py-4">$25</td>
                    <td className="py-4">$45</td>
                    <td className="py-4">Orders $999+</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Canada</td>
                    <td className="py-4">$35</td>
                    <td className="py-4">$65</td>
                    <td className="py-4">Orders $1,299+</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Europe</td>
                    <td className="py-4">$45</td>
                    <td className="py-4">$85</td>
                    <td className="py-4">Orders $1,499+</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Asia</td>
                    <td className="py-4">$55</td>
                    <td className="py-4">$95</td>
                    <td className="py-4">Orders $1,699+</td>
                  </tr>
                  <tr>
                    <td className="py-4">Other International</td>
                    <td className="py-4">$65</td>
                    <td className="py-4">$115</td>
                    <td className="py-4">Orders $1,999+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Packaging */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Premium Packaging</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Luxury Presentation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Elegant black gift boxes with gold foil logo</li>
                  <li>• Protective foam inserts for fragile items</li>
                  <li>• Tissue paper and ribbon presentation</li>
                  <li>• Complimentary fragrance samples</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Secure Shipping</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Temperature-controlled packaging</li>
                  <li>• Fragile item protection</li>
                  <li>• Signature required delivery</li>
                  <li>• Full insurance coverage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tracking */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Order Tracking</h2>
            <div className="space-y-4 text-gray-300">
              <p>Once your order ships, you'll receive:</p>
              <ul className="space-y-2 ml-6">
                <li>• Email confirmation with tracking number</li>
                <li>• Real-time tracking updates</li>
                <li>• SMS notifications (optional)</li>
                <li>• Delivery confirmation</li>
              </ul>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
                <p className="text-amber-300 font-medium">
                  💡 Pro Tip: Create an account to track all your orders in one place and receive exclusive shipping
                  offers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
