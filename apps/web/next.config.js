const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@a11ypros/a11y-ui-components', '@a11ypros/a11y-ui-elements'],
  // Enable static export for Netlify
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Increase static page generation timeout (default is 60s)
  staticPageGenerationTimeout: 120,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@a11ypros/a11y-ui-elements': path.resolve(__dirname, '../../packages/elements/dist'),
    };
    return config;
  },
};

module.exports = nextConfig;
