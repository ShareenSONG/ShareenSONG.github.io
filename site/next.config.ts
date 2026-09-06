import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild ? { output: 'export' as const } : {}),
};

export default nextConfig;
