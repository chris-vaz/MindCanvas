/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['jgpvjfixqgznajybsqjp.supabase.co'],
    },
  };
  
  module.exports = nextConfig;