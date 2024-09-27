const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    },
    experimental: {
      webpackBuildWorker: false, 
      // serverComponentsExternalPackages: ['@web3modal'], 
      
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true,
    transpilePackages: ['lucide-react'],
  };

module.exports = async () => withContentlayer(nextConfig);