"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Book {
  id: string
  title: string
  titleKr: string
  price: number
  stock: number
  image: string
  description: string
  descriptionKr: string
  comingSoon?: boolean
}

export interface CartItem extends Book {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (book: Book, quantity: number) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  
  const addToCart = (book: Book, quantity: number) => {
    if (book.comingSoon) return
    setItems(prev => {
      const existing = prev.find(item => item.id === book.id)
      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, book.stock)
        return prev.map(item => 
          item.id === book.id 
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      return [...prev, { ...book, quantity: Math.min(quantity, book.stock) }]
    })
  }
  
  const removeFromCart = (bookId: string) => {
    setItems(prev => prev.filter(item => item.id !== bookId))
  }
  
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setItems(prev => 
      prev.map(item => 
        item.id === bookId 
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      )
    )
  }
  
  const clearCart = () => setItems([])
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total,
      itemCount 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const books: Book[] = [
  {
    id: '1',
    title: 'HAN - Una Argentina con alma y corazón coreano',
    titleKr: '한 - 한국의 마음을 품은 아르헨티나인',
    price: 40000,
    stock: 50,
    image: '/books/han-cover.jpg',
    description: 'Poesías musicales bilingües. 40 poemas en español y 40 en coreano con QR para escuchar las canciones.',
    descriptionKr: '이중 언어 음악 시집. 스페인어 40편, 한국어 40편의 시와 노래를 들을 수 있는 QR 코드 포함.',
    comingSoon: false,
  },
  {
    id: '2',
    title: 'HAN 2',
    titleKr: '한 2',
    price: 40000,
    stock: 0,
    image: '/books/ecos.jpg',
    description: 'Próximamente - El segundo volumen de la colección de poesías musicales.',
    descriptionKr: '출시 예정 - 음악 시집 컬렉션의 두 번째 권.',
    comingSoon: true,
  },
  {
    id: '3',
    title: 'HAN 3',
    titleKr: '한 3',
    price: 40000,
    stock: 0,
    image: '/books/jardin.jpg',
    description: 'Próximamente - El tercer volumen de la colección de poesías musicales.',
    descriptionKr: '출시 예정 - 음악 시집 컬렉션의 세 번째 권.',
    comingSoon: true,
  },
  {
    id: '4',
    title: 'HAN 4',
    titleKr: '한 4',
    price: 40000,
    stock: 0,
    image: '/books/olas.jpg',
    description: 'Próximamente - El cuarto volumen de la colección de poesías musicales.',
    descriptionKr: '출시 예정 - 음악 시집 컬렉션의 네 번째 권.',
    comingSoon: true,
  },
]
