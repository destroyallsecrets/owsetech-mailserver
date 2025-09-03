/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@clerk/nextjs", "convex", "@clerk/clerk-sdk-node"],
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT
  },
  experimental: {
    serverComponentsExternalPackages: ['convex']
  }
};

module.exports = nextConfig;
