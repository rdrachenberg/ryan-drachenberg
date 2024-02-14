const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */

const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true,
  };;

module.exports = withContentlayer(nextConfig);
