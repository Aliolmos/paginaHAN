"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { ChevronRight, BookOpen } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const { t, language } = useLanguage()
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-sakura-light/50 via-background to-celeste-light/30" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-foreground/80 text-lg">
              {t('hero.quote')}
            </blockquote>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                asChild
              >
                <a href="#shop">
                  {t('hero.cta')}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 border-primary/30 hover:bg-primary/10"
                onClick={() => setIsBookOpen(!isBookOpen)}
              >
                <BookOpen className="h-4 w-4" />
                {t('hero.preview')}
              </Button>
            </div>
          </div>
          
          {/* Interactive Book */}
          <div 
            className={`relative flex justify-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div 
              className="relative w-72 md:w-80 lg:w-96 cursor-pointer perspective-1000"
              onClick={() => setIsBookOpen(!isBookOpen)}
              role="button"
              aria-label="Click to open book preview"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setIsBookOpen(!isBookOpen)}
            >
              {/* Book Container */}
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                {/* Book Cover that flips */}
                <div 
                  className="relative w-72 md:w-80 lg:w-96 aspect-[3/4] shadow-2xl transition-transform duration-700 ease-in-out z-10"
                  style={{ 
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transform: isBookOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front Cover - Book Image */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-r-lg overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src="/books/han-cover.jpg"
                      alt="HAN - Una Argentina con alma y corazón coreano"
                      fill
                      className="object-cover rounded-r-lg"
                      priority
                    />
                  </div>
                  
                  {/* Back of Cover - Interior with Solapa strip on LEFT (visible when flipped) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-l-lg overflow-hidden bg-white"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    
                    {/* Solapa strip on the LEFT edge */}
                    <div className="absolute left-0 top-0 w-40 md:w-44 lg:w-48 h-full overflow-hidden shadow-lg border-r border-primary/10">
                      <Image
                        src="/books/solapa.jpg"
                        alt="Solapa del libro HAN"
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Book Pages with Poem (behind the cover, visible when open) */}
                <div 
                  className={`absolute top-0 left-0 w-72 md:w-80 lg:w-96 aspect-[3/4] bg-card rounded-r-lg shadow-inner p-6 md:p-8 transition-opacity duration-500 overflow-y-auto z-0 ${
                    isBookOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="h-full flex flex-col justify-start space-y-4 text-foreground">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-center text-primary">
                      {t('hero.poem.title')}
                    </h3>
                    <div className="w-16 h-0.5 bg-primary/30 mx-auto" />
                    <p className="font-serif text-xs md:text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                      {language === 'es' ? `Donde verdades y secretos se entrelazaron,
sus corazones danzaron antes del fin de cada canción,
y sus almas se unieron hasta que el día se despidió.

Voraces contra las corrientes del mar,
audaces frente al destino,
sus vivencias y memorias esperan ser contadas,
una galaxia de sentimientos los inunda.

Esa historia solo está escrita con tinta,
la clave de sol marca el inicio del pentagrama,
notas blancas y negras se deslizan,
como las más bellas melodías que emergen de su unión,
cuando susurran "te amo" y el tiempo parece detenerse.` : `진실과 비밀이 서로 얽혀 들던 곳에서,
그들의 마음은 노래 한 ��의 끝이 오기 전까지 춤추었고,
그들의 영혼은 하루가 작별을 고할 때까지 하나로 이어졌어요.

거센 바다의 물결을 거슬러,
운명 앞에서도 대담했고,
그들의 삶의 기억과 이야기들은 들려지기를 기다리며,
감정의 은하가 그들을 가득 채워요.

그 이야기는 오직 잉크로만 쓰여 있어요.
높은음자리표가 오선지의 시작을 알리고,
흰 음표와 검은 음표가 미끄러지듯 흐르며,
그들의 하나 됨에서 피어나는 가장 아름다운 멜로디가 되어,
"사랑해"라고 속삭일 때
시간은 멈춘 듯해요.`}
                    </p>
                    
                    {/* QR Code Section */}
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <p className="text-xs text-center text-muted-foreground mb-3">
                        {language === 'es' 
                          ? 'Escanea el QR para escuchar un adelanto de los poemas convertidos en canciones' 
                          : 'QR 코드를 스캔하여 시를 노래로 들어보세요'}
                      </p>
                      <div className="flex justify-center">
                        <div className="bg-white rounded-lg p-2 shadow-md">
                          <Image
                            src="/qr-preview.png"
                            alt="QR Code - Preview de canciones"
                            width={100}
                            height={100}
                            className="object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Page lines decoration */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 space-y-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-1 h-8 bg-border/50 rounded" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Book shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-foreground/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
