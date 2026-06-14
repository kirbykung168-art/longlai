import type { MetadataRoute } from 'next';

/**
 * /robots.txt — production-ready.
 * Allow all crawlers, surface the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://longlai.vercel.app/sitemap.xml',
    host:    'https://longlai.vercel.app',
  };
}
