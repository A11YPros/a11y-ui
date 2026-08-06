import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function createComponentJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const url = `https://ui.a11ypros.com/components/${slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ui.a11ypros.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Components',
          item: 'https://ui.a11ypros.com/components',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: name,
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${name} Component Documentation | A11Y UI`,
      description: description,
      url: url,
      inLanguage: 'en',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      publisher: {
        '@type': 'Organization',
        name: 'A11Y Pros',
        url: 'https://a11ypros.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ui.a11ypros.com/logo.png',
        },
      },
    },
  ];
}
