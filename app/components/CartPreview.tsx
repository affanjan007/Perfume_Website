"use client"

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartPreview() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    // Simple checkout navigation
    if (state.items.length === 0) return

    // Navigate to checkout page
    window.location.href = "/checkout"
    dispatch({ type: "CLOSE_CART" })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Cart Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">Shopping Cart ({totalItems})</h2>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some luxury fragrances to get started</p>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-700">
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
                      <p className="text-amber-400 font-semibold">${item.price}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4 text-gray-300" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-gray-300" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-gray-300">Total:</span>
              <span className="text-amber-400">${total.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={state.items.length === 0}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                {state.items.length === 0 ? "Cart Empty" : `Proceed to Checkout • $${total.toFixed(2)}`}
              </button>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="w-full bg-transparent border-2 border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
