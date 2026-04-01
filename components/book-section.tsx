"use client"

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Heart, Users, TrendingUp, Star, BookHeart, Clock, RotateCcw } from 'lucide-react'
import Image from 'next/image'

export function BookSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const themes = [
    { icon: Users, label: t('book.theme1'), color: 'text-blue-500' },
    { icon: Heart, label: t('book.theme2'), color: 'text-sakura-pink' },
    { icon: TrendingUp, label: t('book.theme3'), color: 'text-green-500' },
    { icon: Star, label: t('book.theme4'), color: 'text-amber-500' },
    { icon: BookHeart, label: t('book.theme5'), color: 'text-purple-500' },
    { icon: Clock, label: t('book.theme6'), color: 'text-celeste' },
  ]

  const descriptionEs = `Porque es el primer libro de poemas inclusivo para personas con discapacidad visual, quienes podrán acceder con a través de un QR y escucharlos en forma de canción. Esta innovación parte por iniciativa de la autora, quien quiere llegar a la mayor cantidad de lectores amantes de la poesía y la música.

En HAN, una argentina con alma y corazón coreano, se encontrarán versos que acarician el alma, con poemas de amor que trascienden el corazón para inundar de ternura el aire. Silvana se ha propuesto ser esa primavera que inunda con sus versos de fragancias exquisita el aire como los cerezos en flor.

Y hacer este homenaje bilingüe habla de la intencionalidad de la autora: rescatar culturas, ser puente entre Argentina y Corea del Sur. Una verdadera joya.

Los invitamos a disfrutar y saborear estos poemas de Silvana A. Monelli con Editorial Gema Azul, Córdoba, Argentina… para el mundo.`

  const descriptionKr = `이 책은 시각 장애를 가진 사람들을 위한 접근성을 고려한 시집으로, QR 코드를 통해 시를 노래 형식으로 감상할 수 있도록 구성되어 있습니다. 이는 더 많은 독자들에게 시와 음악을 함께 전하고자 하는 작가의 특별한 의도에서 비롯된 새로운 시도입니다.

『HAN』에서는 한국의 영혼과 마음을 품은 한 아르헨티나 작가의 시 세계를 만나볼 수 있습니다. 영혼을 어루만지는 시어들은 사랑을 노래하며, 그 감정은 마음을 넘어 공기마저 따뜻한 온기로 채워 줍니다. 실바나는 벚꽃이 만개하듯, 향기로운 시로 세상을 물들이는 '봄'과 같은 존재가 되고자 합니다.

이중 언어로 이루어진 이 작품은 서로 다른 문화를 잇고, 아르헨티나와 한국을 연결하는 다리와도 같습니다. 작가의 이러한 시도는 문화의 가치를 되새기고, 서로를 이해하는 새로운 길을 제시합니다. 그 자체로 하나의 빛나는 작품이라 할 수 있습니다.

실바나 모넬리의 시를 통해, 독자 여러분이 이 작품을 천천히 음미하며 즐기시기를 바랍니다.
아르헨티나 코르도바의 Editorial Gema Azul 과 함께, 이 시집을 세계로 전합니다.`
  
  return (
    <section 
      ref={sectionRef}
      id="book" 
      className="py-24 bg-gradient-to-b from-background to-sakura-light/20 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-celeste/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('book.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-sakura-pink to-accent mx-auto rounded-full" />
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Rotatable Book Preview */}
              <div className="relative flex flex-col items-center">
                <div 
                  className="cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => setIsFlipped(!isFlipped)}
                  role="button"
                  aria-label={language === 'es' ? 'Clic para girar el libro' : '책을 회전하려면 클릭하세요'}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
                >
                  <div 
                    className="w-64 md:w-72 h-80 md:h-96 transition-transform duration-700 ease-in-out relative"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front - Tapa */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
                        <Image
                          src="/books/han-cover.jpg"
                          alt="HAN - Tapa del libro"
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 768px) 256px, 288px"
                        />
                      </div>
                    </div>
                    
                    {/* Back - Contratapa */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden">
                        <Image
                          src="/books/contratapa.jpg"
                          alt="HAN - Contratapa del libro"
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 768px) 256px, 288px"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Book shadow */}
                  <div className="mt-4 w-48 md:w-56 h-4 bg-foreground/15 rounded-full blur-xl mx-auto" />
                </div>
                
                {/* Rotate instruction */}
                <button 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{language === 'es' ? 'Clic para girar' : '클릭하여 회전'}</span>
                </button>
                
                {/* Decorative petals */}
                <div className="absolute -top-6 right-0 w-8 h-8 text-sakura-pink animate-float" style={{ animationDelay: '0s' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                  </svg>
                </div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 text-sakura-pink/70 animate-float" style={{ animationDelay: '2s' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                  </svg>
                </div>
              </div>
              
              {/* Book Content */}
              <div className="space-y-8">
                <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {language === 'es' ? descriptionEs : descriptionKr}
                </div>
                
                {/* Themes */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">{t('book.themes')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {themes.map((theme, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`p-2 rounded-lg bg-muted ${theme.color}`}>
                          <theme.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{theme.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Target Audience */}
                <div className="p-6 bg-gradient-to-r from-sakura-light/50 to-celeste-light/50 rounded-2xl border border-primary/20">
                  <p className="text-foreground/80 italic font-serif">
                    {t('book.audience')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
