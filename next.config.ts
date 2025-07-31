// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables lint build failures
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ disables TS errors at build time
  },
}

export default nextConfig
