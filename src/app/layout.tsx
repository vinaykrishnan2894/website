import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'Vinay Krishnan — Senior Product Manager',
  description:
    'Senior Product Manager building product systems people trust — from real-time multiplayer engines to club ops platforms. 6+ years in gaming, streaming, and complex product domains.',
  openGraph: {
    title: 'Vinay Krishnan — Senior Product Manager',
    description:
      'Senior PM who builds product systems that people trust. PokerBoss, Loco Studio, Cricket.com.',
    url: 'https://vinaykrishnan.in',
    siteName: 'Vinay Krishnan',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQW6YJVK67"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQW6YJVK67');
          `}
        </Script>
      </head>
      <body className="bg-bg-primary text-text-primary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
