import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental features for Next.js 15
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Image optimization
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'pub-4a398d8b77104a9e883ddfbb3db801ea.r2.dev', // Cloudflare R2 public URL
      },
    ],
  },
  // Disable webpack caching for better compatibility with Turbopack + Payload
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
}

// Wrap with Payload plugin for Next.js compatibility
export default withPayload(nextConfig)
