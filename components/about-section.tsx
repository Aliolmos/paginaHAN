"use client"

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

export function AboutSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
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
  
  const bioEs = `Silvana A. Monelli nació en Córdoba, Argentina. Está felizmente casada y es madre de cuatro hijos. Su familia es su refugio de amor. La autora comparte el amor a la medicina y a la poesía, disfrutando del arte de escribir poemas.

Silvana nos presenta el primer libro de esta colección de POESIAS MUSICALES llamado "HAN", que tienen la peculiaridad que están escrito en español y coreano, cada poema tiene un QR a dónde se puede escuchar la versión cantada, buscando eliminar barreras, ofreciendo una experiencia sensorial completa tanto para lectores como para las personas con discapacidad visual que deseen sumergirse en sus melodías.

La autora se encuentra trabajando para lanzar los próximos libros de esta colección de una argentina con alma y corazón coreano de la mano de Editorial Gema Azul.`

  const bioKr = `실바나 모넬리는 아르헨티나 코르도바에서 태어났습니다.
그녀는 행복한 결혼 생활을 이어가며 네 명의 자녀를 둔 어머니입니다. 그녀의 가족은 사랑이 머무는 가장 큰 안식처입니다.
저자는 의학과 시에 대한 깊은 애정을 지니고 있으며, 시를 쓰는 예술을 즐기고 있습니다.

실바나는 『HAN』이라는 제목의 음악 시집 시리즈 첫 번째 작품을 선보입니다. 이 작품은 스페인어와 한국어, 두 언어로 쓰였다는 점에서 특별하며, 각 시에는 QR 코드가 포함되어 있어 노래로 감상할 수 있습니다. 이는 장벽을 허물고, 독자뿐만 아니라 시각 장애를 가진 사람들 또한 그 멜로디에 몰입할 수 있도록 하는, 더욱 풍부한 감각적 경험을 제공합니다.

현재 저자는 "Una argentina con alma y corazón coreano"라는 정체성을 바탕으로, 이 시리즈의 다음 작품들을 준비 중이며, Editorial Gema Azul 과 함께 출간을 이어갈 예정입니다.`
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 bg-gradient-to-b from-celeste-light/30 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sakura-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-celeste/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div 
            className={`grid md:grid-cols-5 gap-12 items-start transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Author Image */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/author.jpg"
                    alt="Silvana A. Monelli"
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
                {/* Decorative frame */}
                <div className="absolute -inset-3 border-2 border-primary/30 rounded-2xl -z-10" />
                <div className="absolute -inset-6 border border-primary/10 rounded-3xl -z-20" />
                
                {/* Floating sakura decoration */}
                <div className="absolute -top-4 -right-4 w-12 h-12 text-sakura-pink animate-float">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* About Content */}
            <div className="md:col-span-3 space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                {t('about.title')}
              </h2>
              
              <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {language === 'es' ? bioEs : bioKr}
              </div>
              
              <blockquote className="relative pl-6 py-4">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-sakura-pink to-accent rounded-full" />
                <p className="italic text-foreground/80 font-serif text-xl">
                  {t('about.quote')}
                </p>
              </blockquote>
              
              {/* Stats or highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-card rounded-xl shadow-sm">
                  <div className="font-serif text-3xl font-bold text-primary">1</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Libro' : '책'}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl shadow-sm">
                  <div className="font-serif text-3xl font-bold text-primary">80</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Poemas' : '시'}
                  </div>
                  <div className="text-xs text-muted-foreground/70">
                    {language === 'es' ? '40 ES / 40 KR' : '40 스페인어 / 40 한국어'}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl shadow-sm">
                  <div className="font-serif text-3xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Idiomas' : '언어'}
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <span className="inline-block px-4 py-2 bg-sakura-light/50 text-primary rounded-full text-sm font-medium">
                  {language === 'es' ? 'Colección Próximamente' : '컬렉션 출시 예정'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
