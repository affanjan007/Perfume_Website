export default function SizeGuide() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Fragrance Size Guide</h1>
          <div className="w-20 h-px bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {/* Size Comparison */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Size Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="w-16 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-amber-400 mb-2">30ml</h3>
                <p className="text-gray-300 mb-2">Discovery Size</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Perfect for trying new scents</li>
                  <li>• Travel-friendly size</li>
                  <li>• 2-3 weeks daily use</li>
                  <li>• Great for gifts</li>
                </ul>
              </div>

              <div className="text-center bg-green-500/10 border border-green-500/30 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
                <div className="w-20 h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">50ml</h3>
                <p className="text-gray-300 mb-2">Signature Size</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Perfect everyday size</li>
                  <li>• Best value for money</li>
                  <li>• 4-6 weeks daily use</li>
                  <li>• Ideal for your signature scent</li>
                </ul>
              </div>

              <div className="text-center bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                <div className="w-24 h-32 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">100ml</h3>
                <p className="text-gray-300 mb-2">Statement Size</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Maximum value</li>
                  <li>• Luxury presentation</li>
                  <li>• 8-12 weeks daily use</li>
                  <li>• Perfect for collectors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage Guide */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">How Long Will It Last?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-4 text-amber-400 font-semibold">Size</th>
                    <th className="pb-4 text-amber-400 font-semibold">Sprays per Bottle</th>
                    <th className="pb-4 text-amber-400 font-semibold">Daily Use (2 sprays)</th>
                    <th className="pb-4 text-amber-400 font-semibold">Occasional Use (4x/week)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-4 font-medium">30ml</td>
                    <td className="py-4">~300 sprays</td>
                    <td className="py-4">5 months</td>
                    <td className="py-4">8-10 months</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 font-medium">50ml</td>
                    <td className="py-4">~500 sprays</td>
                    <td className="py-4">8 months</td>
                    <td className="py-4">12-15 months</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">100ml</td>
                    <td className="py-4">~1000 sprays</td>
                    <td className="py-4">16 months</td>
                    <td className="py-4">2+ years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Application Tips */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Application Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Best Application Points</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • <strong>Pulse Points:</strong> Wrists, neck, behind ears
                  </li>
                  <li>
                    • <strong>Warm Areas:</strong> Chest, inner elbows
                  </li>
                  <li>
                    • <strong>Hair & Clothes:</strong> Light mist from distance
                  </li>
                  <li>
                    • <strong>Layering:</strong> Start light, build up
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-4">Pro Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • <strong>Distance:</strong> Hold 6-8 inches away
                  </li>
                  <li>
                    • <strong>Don't Rub:</strong> Let it dry naturally
                  </li>
                  <li>
                    • <strong>Timing:</strong> Apply to clean, moisturized skin
                  </li>
                  <li>
                    • <strong>Storage:</strong> Cool, dark place
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Choosing Your Size */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Which Size Should You Choose?</h2>
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-blue-400 font-semibold mb-3">🆕 First Time Trying?</h3>
                <p className="text-gray-300 mb-2">
                  Start with <strong>30ml Discovery Size</strong>
                </p>
                <p className="text-gray-400 text-sm">
                  Perfect for testing a new fragrance without commitment. If you love it, you can always upgrade!
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-400 font-semibold mb-3">💼 Daily Signature Scent?</h3>
                <p className="text-gray-300 mb-2">
                  Go with <strong>50ml Signature Size</strong>
                </p>
                <p className="text-gray-400 text-sm">
                  Best value for regular use. Lasts months and perfect for your everyday fragrance.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-purple-400 font-semibold mb-3">🎁 Special Occasions & Gifts?</h3>
                <p className="text-gray-300 mb-2">
                  Choose <strong>100ml Statement Size</strong>
                </p>
                <p className="text-gray-400 text-sm">
                  Luxury presentation, maximum value, and impressive gift packaging. Perfect for collectors.
                </p>
              </div>
            </div>
          </section>

          {/* Size Conversion */}
          <section className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Size Conversions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-amber-400 font-semibold mb-2">30ml</h3>
                <p className="text-gray-300">1.0 fl oz</p>
                <p className="text-gray-500 text-sm">Travel size approved</p>
              </div>
              <div className="text-center">
                <h3 className="text-amber-400 font-semibold mb-2">50ml</h3>
                <p className="text-gray-300">1.7 fl oz</p>
                <p className="text-gray-500 text-sm">Standard size</p>
              </div>
              <div className="text-center">
                <h3 className="text-amber-400 font-semibold mb-2">100ml</h3>
                <p className="text-gray-300">3.4 fl oz</p>
                <p className="text-gray-500 text-sm">Maximum carry-on size</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
