import type { NextConfig } from "next";

const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // 이게 있으면 Static 모드, 없으면 dynamic 모드, 없는게 기본
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async rewrites() {
    return [
      {
        source: '/upload/:slug', // 이 주소를 볼 때마다
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // 이 주소로 바꿔서 실행
      },
    ]
  },
};

module.exports = withVanillaExtract(nextConfig);