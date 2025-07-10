/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'modelslab.com']
  },
  // Simplifier la configuration pour éviter les problèmes de cache
  experimental: {
    serverComponentsExternalPackages: []
  },
  // Configuration webpack simplifiée
  webpack: (config, { isServer }) => {
    // Résoudre les problèmes de modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;