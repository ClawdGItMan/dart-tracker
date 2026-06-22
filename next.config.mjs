/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This is a design build; don't let lint config block `next build`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
