import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/class/list',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
