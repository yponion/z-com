"use server";

import { signIn } from '@/auth';
import { redirect } from 'next/navigation'

const onSubmit = async (prevState: { message: string | null }, formData: FormData) => {
    if (!formData.get("id") || !(formData.get('id') as string)?.trim()) return { message: "no_id" };
    if (!formData.get("name") || !(formData.get('name') as string)?.trim()) return { message: "no_name" };
    if (!formData.get("password") || !(formData.get('password') as string)?.trim()) return { message: "no_password" };
    if (!formData.get("image")) return { message: "no_image" };
    formData.set('nickname', formData.get('name') as string); // nickname인데 name으로 받아서 nickname을 하나더 넣어서 버그 해결, (이런 방법이 있다지 수정하는게 맞긴 할듯)
    let shouldRedirect = false;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            {
                method: "post",
                body: formData,
                credentials: "include",
            }
        );
        if (response.status === 403) return { message: "user_exists" };
        else if (response.status === 400) return { // 돌려줘서 defaultValue로 써서 form에서 데이터 유지
            message: (await response.json()).data[0],
            id: formData.get("id"),
            nickname: formData.get("nickname"),
            password: formData.get("password"),
            image: formData.get("image"),
        };
        shouldRedirect = true;
        signIn("credentials", { username: formData.get("id"), password: formData.get("password"), redirect: false });
    } catch (err) {
        console.error(err);
        return { message: null };
    }
    if (shouldRedirect) redirect("/home"); // redirect: try/catch문 안에서 X
    return { message: null };
};

export default onSubmit;