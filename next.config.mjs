/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Move allowedDevOrigins to the top level
  allowedDevOrigins: [
    "3001-firebase-wantage-road-1748166658344.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev",
  ],
};

export default nextConfig;
