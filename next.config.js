const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true,
    transpilePackages: ['lucide-react'],
  };

module.exports = withContentlayer(nextConfig);
