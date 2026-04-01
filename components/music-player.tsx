"use client"

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

export function MusicPlayer() {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element on client side only
    audioRef.current = new Audio('/music/poema-14.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.15 // Low volume
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('[v0] Audio playback was prevented')
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={togglePlay}
      disabled={!isLoaded}
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-white/90 backdrop-blur-sm border-primary/30 shadow-lg hover:bg-primary/10 hover:border-primary transition-all duration-300"
      aria-label={isPlaying 
        ? (language === 'es' ? 'Pausar música' : '음악 일시정지') 
        : (language === 'es' ? 'Reproducir música' : '음악 재생')
      }
    >
      {isPlaying ? (
        <Volume2 className="h-8 w-8 text-primary animate-pulse" />
      ) : (
        <VolumeX className="h-8 w-8 text-muted-foreground" />
      )}
    </Button>
  )
}
