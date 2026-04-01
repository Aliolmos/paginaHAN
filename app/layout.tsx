import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  variable: '--font-noto-sans-kr',
  weight: ['300', '400', '500', '700']
});

const notoSerifKR = Noto_Serif_KR({ 
  subsets: ["latin"],
  variable: '--font-noto-serif-kr',
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: 'HAN | Una Argentina con alma y corazón coreano - Silvana A. Monelli',
  description: 'Poesías musicales bilingües en español y coreano. Primer libro de poemas inclusivo con QR para escuchar las canciones. Editorial Gema Azul, Córdoba, Argentina.',
  generator: 'v0.app',
  keywords: ['HAN', 'poetry', 'poesía', '시', '시집', 'korean poetry', 'Silvana Monelli', 'poesías musicales', 'Argentina', 'Korea', 'bilingual', 'Editorial Gema Azul'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8c8d8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${notoSansKR.variable} ${notoSerifKR.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
