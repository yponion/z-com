// "use client";

// import { useRouter } from "next/navigation";
// import Main from "../_component/Main";

// export default function Login() {
//   const router = useRouter();
//   router.replace("/i/flow/login");
//   return <Main />;
// }

// 오류 나서 일단 gpt가 알려준대로 함. -> 강의에서 빌드에서 설명해준다고 함.

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Main from "../_component/Main";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/i/flow/login");
  }, [router]);

  return <Main />;
}
