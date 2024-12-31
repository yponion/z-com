// "use client";

// import { useRouter } from "next/navigation";
// import Main from "@/app/(beforeLogin)/_component/Main";
// import { useSession } from "next-auth/react";

// export default function Login() {
//   const router = useRouter();

//   const { data: session } = useSession();

//   if (session?.user) {
//     router.replace("/home");
//     return null;
//   }

//   router.replace("/i/flow/login");
//   return <Main />;
// }

// 오류 나서 일단 gpt가 알려준대로 함. -> 강의에서 빌드에서 설명해준다고 함.

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace("/home");
    } else {
      router.replace("/i/flow/login");
    }
  }, [session, router]);

  return <Main />;
}
