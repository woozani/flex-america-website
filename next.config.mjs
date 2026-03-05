/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'www.flex-america.com' },
    ],
  },
};

export default nextConfig;
