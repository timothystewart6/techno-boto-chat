/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now the default in Next.js 14
  output: 'standalone', // Enable standalone output for Docker
};

module.exports = nextConfig;
