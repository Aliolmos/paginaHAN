"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart, Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const { itemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  
  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#book', label: t('nav.book') },
    { href: '#shop', label: t('nav.shop') },
    { href: '#reviews', label: t('nav.reviews') },
    { href: '#contact', label: t('nav.contact') },
  ]
  
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'kr' : 'es')
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-serif text-xl font-bold text-foreground">
          HAN <span className="text-sm font-normal text-muted-foreground ml-1">{language === 'es' ? '| Poesías' : '| 한'}</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="default"
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-semibold" suppressHydrationWarning>{language === 'es' ? 'ES | 한국어' : 'KR | Español'}</span>
          </Button>
          
          {/* Cart Button */}
          <a href="#shop" className="relative">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </a>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background" aria-describedby={undefined}>
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
