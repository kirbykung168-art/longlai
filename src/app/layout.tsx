import type { Metadata, Viewport } from 'next';
import { Bowlby_One, IBM_Plex_Mono, Inter, Cormorant_Garamond, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import LanguageProvider from '@/components/LanguageProvider';
import HtmlLangSync from '@/components/HtmlLangSync';

/**
 * FONT LOADING — Bowlby One carries the record-sleeve display weight,
 * IBM Plex Mono runs the tracklist numerals, Inter handles body prose,
 * Cormorant Garamond italic does the "© LONGLAI · SIDE A" liner-notes
 * accents, and Noto Sans Thai catches the Thai gloss.
 */
const display = Bowlby_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});
const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});
const thai = Noto_Sans_Thai({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-thai',
});

export const viewport: Viewport = {
  themeColor:    '#0e0a07',
  colorScheme:   'dark',
  width:         'device-width',
  initialScale:  1,
};

export const metadata: Metadata = {
  title: 'Longlai · Vinyl bar with rotating guest chefs · 13/9 Anuwong, Bangkok',
  description:
    'A vinyl bar at the edge of Chinatown where young guest chefs take turns in the kitchen and the records spin. Reserve a seat — chef nights sell out.',
  metadataBase: new URL('https://longlai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Longlai',
    'ล่องลอย',
    'vinyl bar Bangkok',
    'Anuwong Road',
    'Chinatown Bangkok',
    'Song Wat',
    'guest chef Bangkok',
    'listening bar',
  ],
  openGraph: {
    title: 'Longlai · Vinyl bar with rotating guest chefs · Bangkok',
    description:
      'Records play, not playlists. Young guest chefs take turns in the kitchen each month. 13/9 Anuwong Rd, Chakkrawat.',
    url: 'https://longlai.vercel.app',
    siteName: 'Longlai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url:    '/images/storefront-day.jpg',
        width:  1200,
        height: 630,
        alt:    'Yellow shopfront of Longlai on Anuwong Road, Bangkok',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longlai · Vinyl bar with rotating guest chefs · Bangkok',
    description:
      'Records play, not playlists. Young guest chefs take turns in the kitchen each month.',
    images: ['/images/storefront-day.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${inter.variable} ${cormorant.variable} ${thai.variable}`}
      translate="no"
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="bg-vinyl text-cream">
        <LanguageProvider>
          <HtmlLangSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
