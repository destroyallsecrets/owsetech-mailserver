/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@clerk/nextjs", "@clerk/clerk-sdk-node"],
  serverExternalPackages: ['convex'],
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT
  }
};

module.exports = nextConfig;
