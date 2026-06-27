/** @type {import('next').NextConfig} */
const nextConfig = {
    serverActions: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "storage.googleapis.com",
        },
      ],
    },
  };
  
  export default nextConfig;