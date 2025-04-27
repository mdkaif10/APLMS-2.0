/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
    serverComponentsExternalPackages: [],
  },
  output: undefined,
};

export default nextConfig;
