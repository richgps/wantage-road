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
    "https://3000-firebase-wantage-road-1746877318206.cluster-c3a7z3wnwzapkx3rfr5kz62dac.cloudworkstations.dev",
  ],
};

export default nextConfig;
