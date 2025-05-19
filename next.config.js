/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Using Turbopack
  experimental: {
    turbo: true,
  },
};

module.exports = nextConfig; 