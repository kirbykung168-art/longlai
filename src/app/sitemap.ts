import type { MetadataRoute } from 'next';

/**
 * /sitemap.xml — production-ready.
 * Two routes ship: the home (single-page tribute) and /sources.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://longlai.vercel.app';
  const lastModified = new Date();
  return [
    {
      url:        `${base}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority:        1,
    },
    {
      url:        `${base}/sources`,
      lastModified,
      changeFrequency: 'monthly',
      priority:        0.4,
    },
  ];
}
