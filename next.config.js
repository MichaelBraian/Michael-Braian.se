/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
