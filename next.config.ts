import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    productionBrowserSourceMaps: false,
    devIndicators: {
        appIsrStatus: false
    }
}

export default nextConfig
