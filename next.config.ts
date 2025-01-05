import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async rewrites() {
    return [
      {
        source: '/upload/:slug', // 이 주소를 볼 때마다
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug}`, // 이 주소로 바꿔서 실행
      },
    ]
  },
};

export default nextConfig;
