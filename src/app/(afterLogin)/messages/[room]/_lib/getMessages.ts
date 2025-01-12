import type { Message } from '@/model/Message'

type Props = { pageParams?: number; queryKey: [string, { senderId: string, receiverId: string }, string] }

export async function getMessages({ pageParams, queryKey }: Props) {
    const [, userInfo,] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userInfo.senderId}/rooms/${userInfo.receiverId}?cursor=${pageParams}`, {
        next: {
            tags: ['rooms'],
        },
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json() as Promise<Message[]>;
}