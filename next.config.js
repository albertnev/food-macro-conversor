/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  i18n,
  images: {
    domains: ['images.openfoodfacts.org'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
