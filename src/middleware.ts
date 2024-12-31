import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware() {
    const session = await auth();

    // 현재 로그인이 되어 있지 않다면 로그인 페이지로 이동시키기
    if (!session) {
        return NextResponse.redirect("http://localhost:3000/i/flow/login");
    }
}

export const config = { matcher: ['/compose/post', '/home', '/explore', '/messages', '/search'] }