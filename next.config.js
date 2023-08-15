/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/store/caa21bd8-c82a-46a3-8639-4b55f134f4c5",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
