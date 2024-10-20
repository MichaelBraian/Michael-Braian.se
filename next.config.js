/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/client/edge'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client', '@prisma/client/edge')
    }
    return config
  },
  // Add this section
  transpilePackages: ['autoprefixer', 'postcss', 'tailwindcss'],
}

require('dotenv').config();

module.exports = nextConfig
