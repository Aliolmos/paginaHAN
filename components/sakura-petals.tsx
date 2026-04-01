"use client"

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  
  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = []
      for (let i = 0; i < 20; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 15,
          size: 10 + Math.random() * 15,
          opacity: 0.4 + Math.random() * 0.4,
        })
      }
      setPetals(newPetals)
    }
    
    generatePetals()
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-sakura-pink"
          >
            <path
              d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 6C12 6 6 8 6 12C6 16 12 18 12 18C12 18 18 16 18 12C18 8 12 6 12 6Z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
