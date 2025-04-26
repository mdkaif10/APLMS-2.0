/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  }
};

export default nextConfig;
