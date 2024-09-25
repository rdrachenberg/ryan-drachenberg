const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      config.module.unknownContextCritical = false;
      return config
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true,
    transpilePackages: ['lucide-react'],
    experimental: {webpackBuildWorker: true},
  };

module.exports = withContentlayer(nextConfig);
