import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import PressStrip from '@/components/PressStrip';
import NowPlaying from '@/components/NowPlaying';
import NowPlayingTicker from '@/components/NowPlayingTicker';
import Tracklist from '@/components/Tracklist';
import Room from '@/components/Room';
import Sleeves from '@/components/Sleeves';
import Reserve from '@/components/Reserve';
import Visit from '@/components/Visit';
import Footer from '@/components/Footer';
import VuMeterBar from '@/components/VuMeterBar';
import { BRAND, TRACKLIST, CURRENT_CHEF } from '@/lib/content';

/**
 * Page composition — strict order:
 *   Nav (sticky) → Hero (record + tonearm) → PressStrip → NowPlaying
 *   (this month's chef) → NowPlayingTicker → Tracklist (A/B) → Room
 *   (manifesto + Adam Birkan photo) → Sleeves (record-sleeve wall) →
 *   Reserve → Visit → Footer
 *
 * VuMeterBar is fixed bottom-of-viewport across the whole page.
 *
 * JSON-LD: Restaurant + Menu + WebSite, so a search engine can
 * understand the rotating chef + tracklist as a real menu.
 */
export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id':   'https://longlai.vercel.app/#restaurant',
        name:    BRAND.name,
        alternateName: BRAND.nameThai,
        url:     'https://longlai.vercel.app',
        image:   ['https://longlai.vercel.app/images/storefront-day.jpg'],
        address: {
          '@type': 'PostalAddress',
          streetAddress:   BRAND.addressLine1,
          addressLocality: 'Chakkrawat',
          addressRegion:   'Bangkok',
          postalCode:      '10100',
          addressCountry:  'TH',
        },
        geo: {
          '@type':   'GeoCoordinates',
          latitude:  BRAND.lat,
          longitude: BRAND.lng,
        },
        servesCuisine:  ['Thai', 'Vinyl bar', 'Modern Thai · rotating guest chefs'],
        openingHours:  ['Tu-Th 17:30-24:00', 'Fr-Su 17:30-26:00'],
        priceRange:    '฿฿',
        sameAs: [BRAND.instagramUrl],
        description:   'Vinyl bar at the edge of Chinatown where young guest chefs take turns in the kitchen each month and records play, not playlists.',
      },
      {
        '@type': 'Menu',
        '@id':   'https://longlai.vercel.app/#menu',
        name:    'Side A · Side B · Bonus tracks',
        hasMenuSection: [
          {
            '@type': 'MenuSection',
            name:    `Side A · ${CURRENT_CHEF.monthLabel}`,
            hasMenuItem: TRACKLIST.sideA.items.map((it) => ({
              '@type': 'MenuItem',
              name:    it.name.en,
            })),
          },
          {
            '@type': 'MenuSection',
            name:    'Side B · House standards',
            hasMenuItem: TRACKLIST.sideB.items.map((it) => ({
              '@type': 'MenuItem',
              name:    it.name.en,
            })),
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id':   'https://longlai.vercel.app/#site',
        url:     'https://longlai.vercel.app',
        name:    'Longlai · Vinyl bar with rotating guest chefs',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <PressStrip />
        <NowPlaying />
        <NowPlayingTicker />
        <Tracklist />
        <Room />
        <Sleeves />
        <Reserve />
        <Visit />
      </main>
      <Footer />
      <VuMeterBar />
    </>
  );
}
