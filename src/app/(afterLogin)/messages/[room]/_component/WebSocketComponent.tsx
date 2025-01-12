"use client";

import useSocket from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";

export default function WebSocketComponent() {
  useSocket();
  return null;
}

// 이 컴포넌트는 사실 의미 없는데 useSocket 공유되면 어떤 문제가 샐길 수 있는지 설명하기 위해 생성
