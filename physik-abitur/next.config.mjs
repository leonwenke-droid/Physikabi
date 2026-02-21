/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Reduziert Chunk-Lade-Probleme (MODULE_NOT_FOUND für numerische Chunks)
    webpackBuildWorker: false,
  },
  webpack: (config, { isServer }) => {
    // Chunk-Namen stabilisieren (Client + Server), um MODULE_NOT_FOUND für numerische Chunks zu vermeiden
    config.optimization = {
      ...config.optimization,
      chunkIds: 'named',
    };
    return config;
  },
};

export default nextConfig;
