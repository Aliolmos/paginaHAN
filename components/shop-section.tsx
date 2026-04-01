"use client"

// Shop section component with product modal and cart functionality
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useCart, books, Book } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ShoppingCart, Plus, Minus, CreditCard, Trash2, Clock, X, Check, Truck, Shield, Music, Star, Send } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'

function formatPrice(price: number): string {
  return price.toLocaleString('es-AR')
}

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
}

function ProductDetailModal({ book, isOpen, onClose }: { book: Book; isOpen: boolean; onClose: () => void }) {
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, name: 'Maria G.', rating: 5, comment: 'Un libro hermoso que conecta dos culturas de manera unica. Las canciones son increibles.', date: '2026-03-15' },
    { id: 2, name: '김지훈', rating: 5, comment: '정말 감동적인 시집입니다. QR 코드로 노래를 들을 수 있어서 더욱 특별해요.', date: '2026-03-10' },
    { id: 3, name: 'Carlos R.', rating: 4, comment: 'Excelente calidad y muy emotivo. Lo recomiendo para amantes de la poesia.', date: '2026-03-05' },
  ])
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0
  
  const isComingSoon = book.comingSoon
  const isOutOfStock = !isComingSoon && book.stock === 0
  
  const handleSubmitReview = () => {
    if (userRating > 0 && newComment.trim()) {
      const newReview: Review = {
        id: Date.now(),
        name: language === 'es' ? 'Usuario' : '사용자',
        rating: userRating,
        comment: newComment,
        date: new Date().toISOString().split('T')[0]
      }
      setReviews([newReview, ...reviews])
      setUserRating(0)
      setNewComment('')
    }
  }
  
  const handleAddToCart = () => {
    if (!isOutOfStock && !isComingSoon) {
      addToCart(book, quantity)
      setIsAdded(true)
      setTimeout(() => {
        setIsAdded(false)
        onClose()
      }, 1500)
      setQuantity(1)
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 bg-white border-0 shadow-2xl rounded-2xl" aria-describedby={undefined}>
        <DialogHeader className="sr-only">
          <DialogTitle>{language === 'es' ? book.title : book.titleKr}</DialogTitle>
        </DialogHeader>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all border border-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
          {/* Left Column - Image, Description, Rating & Reviews */}
          <div className="md:w-1/2 bg-gradient-to-br from-pink-50 via-white to-sky-50 p-4 md:p-6 flex flex-col">
            {/* Image */}
            <div className="flex justify-center mb-4">
              {book.id === '1' ? (
                <div className="relative w-[160px] md:w-[180px] aspect-[3/4] rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)] overflow-hidden">
                  <Image
                    src={book.image}
                    alt={language === 'es' ? book.title : book.titleKr}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
              ) : (
                <div className="w-[160px] md:w-[180px] aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center p-4">
                  <Clock className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-center font-medium text-xs">
                    {language === 'es' ? 'Imagen no disponible' : '이미지 준비 중'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Description below image */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {language === 'es' ? 'Descripcion' : '설명'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === 'es' ? book.description : book.descriptionKr}
              </p>
            </div>
            
            {/* Rating Section */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {language === 'es' ? 'Calificacion' : '평점'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{averageRating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({reviews.length})</span>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex-1 overflow-hidden flex flex-col">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">
                {language === 'es' ? 'Comentarios' : '리뷰'}
              </h3>
              
              {/* Existing Reviews */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[150px]">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-xs">{review.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              {/* Add Review */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-600">{language === 'es' ? 'Tu calificacion:' : '평점:'}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setUserRating(star)}
                      >
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            star <= (hoverRating || userRating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder={language === 'es' ? 'Escribe tu comentario...' : '댓글을 작성하세요...'}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="text-xs min-h-[60px] resize-none"
                  />
                  <Button
                    size="icon"
                    className="h-[60px] w-10 bg-primary hover:bg-primary/90"
                    onClick={handleSubmitReview}
                    disabled={!userRating || !newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Title, Price, Add to Cart */}
          <div className="md:w-1/2 p-5 md:p-6 flex flex-col bg-white">
            {/* Badge */}
            <div className="mb-2">
              {isComingSoon ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {language === 'es' ? 'Proximamente' : '출시 예정'}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                  {language === 'es' ? 'Disponible' : '구매 가능'}
                </span>
              )}
            </div>
            
            {/* Title */}
            <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-1 leading-tight">
              {language === 'es' ? book.title : book.titleKr}
            </h2>
            
            {/* Author */}
            <p className="text-gray-500 text-sm mb-4">
              {language === 'es' ? 'por Silvana A. Monelli' : 'Silvana A. Monelli 저'}
            </p>
            
            {/* Price */}
            {!isComingSoon && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">${formatPrice(book.price)}</span>
                  <span className="text-sm text-gray-500">ARS</span>
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-amber-600">
                    <Truck className="h-4 w-4" />
                    <span className="text-xs">{language === 'es' ? 'Envio segun ubicacion' : '배송비 별도'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-medium">{language === 'es' ? 'Compra segura' : '안전 결제'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Features for HAN book */}
            {book.id === '1' && (
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 p-2 bg-pink-50 rounded-lg">
                  <Music className="h-4 w-4 text-pink-500" />
                  <p className="text-xs text-gray-700">
                    {language === 'es' ? '80 Poemas con QR (40 ES + 40 KR)' : 'QR 코드가 있는 80편의 시'}
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2 bg-sky-50 rounded-lg">
                  <Shield className="h-4 w-4 text-sky-500" />
                  <p className="text-xs text-gray-700">
                    {language === 'es' ? 'Accesible para discapacidad visual' : '시각 장애인 접근 가능'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Add to Cart Section */}
            {!isComingSoon && (
              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{t('shop.quantity')}</span>
                  <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button
                      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
                    <button
                      className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40"
                      onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                      disabled={quantity >= book.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  className={`w-full h-12 text-sm font-semibold rounded-xl gap-2 transition-all shadow-lg hover:shadow-xl ${
                    isAdded 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'
                  }`}
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      {language === 'es' ? 'Agregado' : '추가됨'}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      {t('shop.addToCart')}
                    </>
                  )}
                </Button>
                
                {/* Payment info */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                    <span className="text-[10px] font-medium text-blue-600">Mercado Pago</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
                    <CreditCard className="h-3 w-3 text-gray-500" />
                    <span className="text-[10px] font-medium text-gray-600">{language === 'es' ? 'Tarjetas' : '카드'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {isComingSoon && (
              <div className="mt-auto pt-4">
                <Button className="w-full h-12 bg-gray-100 text-gray-500 cursor-not-allowed rounded-xl" disabled>
                  <Clock className="h-4 w-4 mr-2" />
                  {language === 'es' ? 'Proximamente' : '곧 출시 예정'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProductCard({ book, onViewDetails }: { book: Book; onViewDetails: () => void }) {
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  
  const isComingSoon = book.comingSoon
  const isLowStock = !isComingSoon && book.stock <= 10 && book.stock > 0
  const isOutOfStock = !isComingSoon && book.stock === 0
  
  const handleAddToCart = () => {
    if (!isOutOfStock && !isComingSoon) {
      addToCart(book, quantity)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
      setQuantity(1)
    }
  }
  
  return (
    <Card 
      className={`group overflow-hidden border-border transition-all duration-300 hover:shadow-lg cursor-pointer ${isComingSoon ? 'opacity-75' : 'hover:border-primary/50'}`}
      onClick={onViewDetails}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-sakura-light via-celeste-light to-muted overflow-hidden">
        {/* Book Cover */}
        {book.id === '1' ? (
          <div className="absolute inset-4 rounded-lg shadow-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full">
              <Image
                src={book.image}
                alt={language === 'es' ? book.title : book.titleKr}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        ) : (
          <div className={`absolute inset-4 bg-gradient-to-br from-muted via-muted/80 to-border rounded-lg shadow-md flex flex-col justify-center items-center p-4 transform group-hover:scale-105 transition-transform duration-300 ${isComingSoon ? 'grayscale' : ''}`}>
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-serif text-sm text-muted-foreground font-bold leading-tight text-center">
              {language === 'es' ? 'Próximamente' : '출시 예정'}
            </h3>
          </div>
        )}
        
        {/* Badges */}
        {isComingSoon && (
          <Badge className="absolute top-2 right-2 bg-muted-foreground text-white">
            {language === 'es' ? 'Próximamente' : '출시 예정'}
          </Badge>
        )}
        {isLowStock && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
            {t('shop.lowStock')}
          </Badge>
        )}
        {isOutOfStock && !isComingSoon && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
            {t('shop.outOfStock')}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-foreground">
            {language === 'es' ? book.title : book.titleKr}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {language === 'es' ? book.description : book.descriptionKr}
          </p>
        </div>
        
        {!isComingSoon && (
          <>
            <div>
              <span className="text-2xl font-bold text-primary">${formatPrice(book.price)}</span>
            </div>
            
            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <span className="text-sm text-muted-foreground">{t('shop.quantity')}:</span>
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); setQuantity(Math.min(book.stock, quantity + 1)); }}
                    disabled={quantity >= book.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <Button
              className={`w-full gap-2 transition-all ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
              disabled={isOutOfStock}
              onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdded ? (language === 'es' ? 'Agregado' : '추가됨') : t('shop.addToCart')}
            </Button>
          </>
        )}
        
        {isComingSoon && (
          <Button
            className="w-full gap-2 bg-muted text-muted-foreground cursor-not-allowed"
            disabled
          >
            <Clock className="h-4 w-4" />
            {language === 'es' ? 'Próximamente' : '출시 예정'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function CartSheet() {
  const { t, language } = useLanguage()
  const { items, total, removeFromCart, updateQuantity } = useCart()
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          {t('shop.cart')} ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-background" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">{t('shop.cart')}</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
            <p>{t('shop.empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gradient-to-r from-sakura-light/50 to-celeste-light/30 rounded-2xl border border-primary/10 shadow-sm">
                  <div className="w-20 h-28 rounded-xl flex-shrink-0 overflow-hidden shadow-md relative">
                    <Image
                      src={item.image}
                      alt={language === 'es' ? item.title : item.titleKr}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-2">
                      {language === 'es' ? item.title : item.titleKr}
                    </h4>
                    <p className="text-lg font-bold text-primary mt-1">${formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-primary/30 hover:bg-primary/10"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{t('shop.total')}:</span>
                <span className="text-primary">${formatPrice(total)}</span>
              </div>
              
              {/* Payment Methods */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('shop.payment')}:</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">Mercado Pago</span>
                  </div>
                  <div className="flex-1 p-2 bg-muted rounded-lg border border-border flex items-center justify-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    <span className="text-xs">Card</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('shop.checkout')}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export function ShopSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  
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
  
  return (
    <section 
      ref={sectionRef}
      id="shop" 
      className="py-24 bg-gradient-to-b from-sakura-light/20 to-celeste-light/30 relative"
    >
      <div className="container mx-auto px-4">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
                {t('shop.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-sakura-pink to-accent rounded-full" />
            </div>
            <CartSheet />
          </div>
          
          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <div
                key={book.id}
                className="transition-all duration-500"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <ProductCard book={book} onViewDetails={() => setSelectedBook(book)} />
              </div>
            ))}
          </div>
          
          {/* Product Detail Modal */}
          {selectedBook && (
            <ProductDetailModal 
              book={selectedBook} 
              isOpen={!!selectedBook} 
              onClose={() => setSelectedBook(null)} 
            />
          )}
          
          {/* Payment Methods Banner */}
          <div className="mt-16 p-6 bg-card rounded-2xl border border-border">
            <p className="text-center text-muted-foreground mb-4">{t('shop.payment')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium text-blue-600">Mercado Pago</span>
              </div>
              <div className="px-6 py-3 bg-muted rounded-lg border border-border flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">{language === 'es' ? 'Tarjeta de Crédito' : '신용카드'}</span>
              </div>
              <div className="px-6 py-3 bg-muted rounded-lg border border-border flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">{language === 'es' ? 'Tarjeta de Débito' : '직불카드'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
