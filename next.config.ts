const nextConfig = {
 experimental: {
    turbo: false, // This turns off Turbopack
  },
   eslint:{
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
};

module.exports = nextConfig;