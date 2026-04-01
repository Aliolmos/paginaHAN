"use client"

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

interface Review {
  id: number
  name: string
  nameKr: string
  rating: number
  comment: string
  commentKr: string
  date: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'María García',
    nameKr: '마리아 가르시아',
    rating: 5,
    comment: 'Los poemas me llegaron al corazón. Cada página es como un abrazo para el alma. Definitivamente mi nueva lectura favorita.',
    commentKr: '시가 제 마음에 깊이 와닿았습니다. 모든 페이지가 영혼을 위한 포옹 같아요. 확실히 제 새로운 최애 책입니다.',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    nameKr: '카를로스 멘도사',
    rating: 5,
    comment: 'Una colección extraordinaria. La forma en que las palabras fluyen es simplemente mágica. Regalo perfecto para amantes de la poesía.',
    commentKr: '놀라운 컬렉션입니다. 단어가 흐르는 방식이 그저 마법 같아요. 시를 사랑하는 이들에게 완벽한 선물입니다.',
    date: '2024-02-20',
  },
  {
    id: 3,
    name: 'Ana Sofía Lee',
    nameKr: '아나 소피아 리',
    rating: 4,
    comment: 'Hermosos versos que capturan emociones universales. El diseño del libro es tan elegante como su contenido.',
    commentKr: '보편적인 감정을 담아낸 아름다운 시. 책의 디자인도 내용만큼 우아합니다.',
    date: '2024-03-10',
  },
  {
    id: 4,
    name: 'Roberto Kim',
    nameKr: '로베르토 김',
    rating: 5,
    comment: 'Cada poema es una pequeña joya. Me encontré releyendo mis favoritos una y otra vez. Altamente recomendado.',
    commentKr: '모든 시가 작은 보석입니다. 제가 좋아하는 것들을 몇 번이고 다시 읽게 되었어요. 강력 추천합니다.',
    date: '2024-03-25',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating 
              ? 'fill-amber-400 text-amber-400' 
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  )
}

function formatDate(dateString: string, lang: string): string {
  const [year, month, day] = dateString.split('-')
  const monthNames = {
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    kr: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  }
  const monthIndex = parseInt(month, 10) - 1
  if (lang === 'es') {
    return `${parseInt(day, 10)} de ${monthNames.es[monthIndex]} de ${year}`
  }
  return `${year}년 ${monthNames.kr[monthIndex]} ${parseInt(day, 10)}일`
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => observer.disconnect()
  }, [index])
  
  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Card className="h-full border-border hover:border-primary/50 transition-colors bg-card">
        <CardContent className="p-6 space-y-4">
          {/* Quote Icon */}
          <div className="text-sakura-pink/40">
            <Quote className="h-8 w-8" />
          </div>
          
          {/* Review Text */}
          <p className="text-foreground/80 leading-relaxed">
            {language === 'es' ? review.comment : review.commentKr}
          </p>
          
          {/* Rating and Author */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'es' ? review.name : review.nameKr}
                </p>
<p className="text-sm text-muted-foreground">
                  {formatDate(review.date, language)}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ReviewsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  
  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="py-24 bg-gradient-to-b from-celeste-light/30 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-sakura-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-celeste/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('reviews.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">{t('reviews.subtitle')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-sakura-pink to-accent mx-auto rounded-full mb-8" />
            
            {/* Average Rating */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.round(averageRating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviews.length} {t('reviews.title').toLowerCase()})</span>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
