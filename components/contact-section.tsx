"use client"

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageCircle, Instagram, Send, CheckCircle, Facebook, Youtube } from 'lucide-react'

export function ContactSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }
  
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 4l11.733 8L4 20V4z" />
        <path d="M20 4v16" />
      </svg>
    ), label: 'X', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@han-poesias.com' },
  ]
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 bg-gradient-to-b from-background to-sakura-light/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-celeste/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sakura-light/40 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">{t('contact.subtitle')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-sakura-pink to-accent mx-auto rounded-full" />
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-lg font-medium text-foreground">{t('contact.success')}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-foreground">
                            {t('contact.name')}
                          </label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={language === 'es' ? 'Tu nombre' : '이름'}
                            className="bg-background border-border focus:border-primary"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">
                            {t('contact.email')}
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={language === 'es' ? 'tu@email.com' : '이메일@example.com'}
                            className="bg-background border-border focus:border-primary"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-foreground">
                            {t('contact.message')}
                          </label>
                          <Textarea
                            id="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder={language === 'es' ? 'Escribe tu mensaje aquí...' : '메시지를 입력하세요...'}
                            className="bg-background border-border focus:border-primary resize-none"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                        >
                          <Send className="h-4 w-4" />
                          {t('contact.send')}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Contact */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-lg">{t('contact.social')}</h3>
                  <div className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <social.icon className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-medium text-foreground">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Quick Contact Button */}
                <div className="p-6 bg-gradient-to-br from-primary/10 via-sakura-light/30 to-celeste-light/30 rounded-2xl border border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {language === 'es' ? 'Respuesta Rápida' : '빠른 응답'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'es' ? 'En menos de 24 horas' : '24시간 이내'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    {language === 'es' 
                      ? 'Respondo personalmente a cada mensaje. No dudes en escribirme.' 
                      : '모든 메시지에 직접 답변드립니다. 언제든지 연락해 주세요.'}
                  </p>
                </div>
                
                {/* Decorative Sakura */}
                <div className="hidden lg:block relative h-32">
                  <div className="absolute top-0 left-1/4 w-6 h-6 text-sakura-pink animate-float" style={{ animationDelay: '0s' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                    </svg>
                  </div>
                  <div className="absolute top-8 right-1/4 w-4 h-4 text-sakura-pink/70 animate-float" style={{ animationDelay: '1s' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-5 h-5 text-sakura-pink/50 animate-float" style={{ animationDelay: '2s' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
