/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.aceternity.com",
        protocol: "https",
      },
      { hostname: "images.unsplash.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
