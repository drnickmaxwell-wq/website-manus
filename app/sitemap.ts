import { MetadataRoute } from 'next';
import { treatments } from '@/content/treatments';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified },
    { url: `${SITE_URL}/treatments`, lastModified },
  ];

  const categories = new Set<string>();

  treatments.forEach((treatment) => {
    categories.add(treatment.category);
    entries.push({
      url: `${SITE_URL}/treatments/${treatment.category}/${treatment.slug}`,
      lastModified,
    });
  });

  categories.forEach((category) => {
    entries.push({ url: `${SITE_URL}/treatments/${category}`, lastModified });
  });

  return entries;
}
