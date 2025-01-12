import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null; // 커스텀 훅 간 공유할 데이터는 여기다가 작성 ( 안티 패턴이긴 하나, 공유할 땐 어쩔 수 없다함 )

export default function useSocket(): [Socket | null, () => void] {
    const { data: session } = useSession()

    const disconnect = useCallback(() => {
        socket?.disconnect();
        socket = null;
    }, [])

    useEffect(() => {
        if (!socket) {
            socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
                transports: ['websocket']
            })
            socket.on('connect_error', (err) => {
                console.error(err);
                console.log(`connect_error due to ${err.message}`)
            })
        }
    }, [session])

    useEffect(() => {
        if (socket?.connected && session?.user?.email) socket?.emit('login', { id: session?.user?.email })
    }, [session?.user?.email])

    return [socket, disconnect];
}