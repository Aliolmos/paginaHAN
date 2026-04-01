"use client"

import { useLanguage } from '@/lib/language-context'
import { Heart } from 'lucide-react'

export function Footer() {
  const { t, language } = useLanguage()
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-12 bg-gradient-to-b from-sakura-light/30 to-celeste-light/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Tagline */}
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              HAN
            </h3>
            <p className="text-muted-foreground">
              {language === 'es' 
                ? 'Una Argentina con alma y corazón coreano'
                : '한국의 마음을 품은 아르헨티나인'}
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.about')}
            </a>
            <a href="#book" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.book')}
            </a>
            <a href="#shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.shop')}
            </a>
            <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.reviews')}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
          </div>
          
          {/* Publisher */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-primary">Editorial Gema Azul</p>
            <p className="text-xs text-muted-foreground">
              Córdoba, Argentina
            </p>
          </div>
          
          {/* Decorative Line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          
          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              {t('footer.made')}
              <Heart className="h-4 w-4 text-sakura-pink fill-sakura-pink" />
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Silvana A. Monelli | HAN. {t('footer.rights')}.
            </p>
          </div>
          
          {/* Sakura Decoration */}
          <div className="flex justify-center gap-4 mt-8 opacity-40">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 text-sakura-pink animate-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
