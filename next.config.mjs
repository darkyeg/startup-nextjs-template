'use strict';

import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We intentionally disable Next.js's built-in i18n support
  // as we dom have our own i18n and internationalisation engine
  i18n: null,
  // We want to always enforce that SWC minifies the sources even during Development mode
  // so that bundles are minified on-the-go. SWF minifying is fast, and has almost no penalties
  swcMinify: true,
  // We don't use trailing slashes on URLs from the Node.js Website
  trailingSlash: false,
  // We don't want to redirect with trailing slashes
  skipTrailingSlashRedirect: true,
  // // We allow the BASE_PATH to be overridden in case that the Website
  // // is being built on a subdirectory (e.g. /nodejs-website)
  // basePath: BASE_PATH,
  images: {
    // We allow SVGs to be used as images
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_CDN_URL.slice(8),
      },
    ],
  },
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  // We don't want to run ESLint Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  // we also configure ESLint to run its lint checking on all files (next lint)
  eslint: { dirs: ['.'], ignoreDuringBuilds: true },
  experimental: {
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: ['tailwindcss'],
    // Removes the warning regarding the WebPack Build Worker
    webpackBuildWorker: false,
  },
};

// Next.js Configuration with `next.intl` enabled
const nextWithIntl = withNextIntl('./i18n.ts')(nextConfig);

export default nextWithIntl;
