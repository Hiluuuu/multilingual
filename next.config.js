/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     // Handle root path
  //     {
  //       source: '/',
  //       destination: '/en',
  //     },
  //     // Handle paths without locale prefix
  //     {
  //       source: '/:path((?!en|fr|de|ja).*)*',
  //       destination: '/en/:path*',
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     // Remove 'en' prefix for English URLs
  //     {
  //       source: '/en/:path*',
  //       destination: '/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig
