"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
  selectedSize?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCartWithAnimation: (product: Product, buttonElement: HTMLElement) => void
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState

  switch (action.type) {
    case "LOAD_CART":
      newState = {
        ...state,
        items: action.payload,
      }
      break

    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item,
          ),
        }
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
        }
      }
      break

    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
      break

    case "UPDATE_QUANTITY":
      newState = {
        ...state,
        items: state.items
          .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
          .filter((item) => item.quantity > 0),
      }
      break

    case "TOGGLE_CART":
      newState = {
        ...state,
        isOpen: !state.isOpen,
      }
      break

    case "CLOSE_CART":
      newState = {
        ...state,
        isOpen: false,
      }
      break

    default:
      return state
  }

  // Save to localStorage whenever cart items change
  if (
    typeof window !== "undefined" &&
    (action.type === "ADD_TO_CART" || action.type === "REMOVE_FROM_CART" || action.type === "UPDATE_QUANTITY")
  ) {
    localStorage.setItem("cart-items", JSON.stringify(newState.items))
  }

  return newState
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cart-items")
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: "LOAD_CART", payload: parsedCart })
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  const addToCartWithAnimation = (product: Product, buttonElement: HTMLElement) => {
    // Add to cart immediately
    dispatch({ type: "ADD_TO_CART", payload: product })

    // Trigger animation
    const rect = buttonElement.getBoundingClientRect()
    const event = new CustomEvent("cartAnimation", {
      detail: {
        product,
        startPosition: {
          x: rect.left + rect.width / 2 - 32, // Center the animation on button
          y: rect.top + rect.height / 2 - 32,
        },
      },
    })
    window.dispatchEvent(event)
  }

  return <CartContext.Provider value={{ state, dispatch, addToCartWithAnimation }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
