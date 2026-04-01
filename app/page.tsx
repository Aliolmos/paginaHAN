"use client"

import { LanguageProvider } from '@/lib/language-context'
import { CartProvider } from '@/lib/cart-context'
import { Navigation } from '@/components/navigation'
import { SakuraPetals } from '@/components/sakura-petals'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { BookSection } from '@/components/book-section'
import { ShopSection } from '@/components/shop-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { MusicPlayer } from '@/components/music-player'

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Falling Sakura Petals Animation */}
          <SakuraPetals />
          
          {/* Background Music Player */}
          <MusicPlayer />
          
          {/* Navigation with Language Selector */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            {/* Hero Section with Book Animation */}
            <HeroSection />
            
            {/* About the Author */}
            <AboutSection />
            
            {/* About the Book */}
            <BookSection />
            
            {/* Shop / E-commerce */}
            <ShopSection />
            
            {/* Reviews */}
            <ReviewsSection />
            
            {/* Contact Form */}
            <ContactSection />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  )
}
