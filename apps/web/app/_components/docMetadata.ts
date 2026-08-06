import type { Metadata } from 'next';

interface DocMetadataOptions {
  title: string;
  description: string;
  slug: string;
}

export function createDocMetadata({ title, description, slug }: DocMetadataOptions): Metadata {
  const url = `https://ui.a11ypros.com/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'A11Y UI',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
