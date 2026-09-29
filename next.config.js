const { withContentlayer } = require('next-contentlayer2');


/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      // Optional peers of @coinbase/cdp-sdk (pulled in via wagmi's baseAccount connector, unused here)
      config.resolve.alias = {
        ...config.resolve.alias,
        '@x402/core': false,
        '@x402/evm': false,
        '@x402/extensions': false,
        '@x402/svm': false,
        // Optional React Native dep probed by @metamask/sdk in the browser build
        '@react-native-async-storage/async-storage': false,
      }
      return config
    },
    outputFileTracingRoot: __dirname,
    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: ['lucide-react'],
  };

module.exports = async () => withContentlayer(nextConfig);
