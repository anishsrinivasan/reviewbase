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
        destination: "/store/mcdonalds-anna-nagar-92029",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
