import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({ from: lastWeek, to: new Date() });
}

const delay = (ms) => new Promise((res) => {
    setTimeout(res, ms)
})

const User = [
    { id: 'elonmusk', nickname: "Elon Musk", image: '/musklogo.jpg' },
    { id: 'yp071704', nickname: "양정운", image: '/onionlogo.jpg' },
    { id: 'leo', nickname: "leo", image: faker.image.avatar() },
]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
    http.post(`${baseUrl}/api/login`, () => {
        return HttpResponse.json(User[1], {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            },
        })
    }),
    http.post(`${baseUrl}/api/logout`, () => {
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post(`${baseUrl}/api/users`, () => {
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //   status: 403,
        // });
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            },
        });
    }),
    http.get(`${baseUrl}/api/recommend-posts`, async ({ request }) => {
        await delay(3000);
        const url = new URL(request.url);
        const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
        // if (cursor >= 20)
        //     return HttpResponse.text(JSON.stringify('no_more_data'), {
        //         status: 404,
        //     });
        return HttpResponse.json([
            { postId: cursor + 1, User: User[0], content: `${cursor + 1} test`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: cursor + 2, User: User[1], content: `${cursor + 2} test`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: cursor + 3, User: User[2], content: `${cursor + 3} test`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }, { imageId: 3, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: cursor + 4, User: User[2], content: `${cursor + 4} test`, Images: [], createdAt: generateDate() },
            { postId: cursor + 5, User: User[2], content: `${cursor + 5} test`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }, { imageId: 3, link: faker.image.urlLoremFlickr() }, { imageId: 4, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    }),
    http.get(`${baseUrl}/api/following-posts`, async () => {
        await delay(3000);
        return HttpResponse.json([
            { postId: 1, User: User[0], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 2, User: User[1], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 3, User: User[2], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    }),
    http.get(`${baseUrl}/api/search/:tag`, ({ params }) => {
        const { tag } = params;
        return HttpResponse.json([
            { postId: 1, User: User[0], content: `${1} 검색결과 ${tag}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 2, User: User[1], content: `${2} 검색결과 ${tag}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 3, User: User[2], content: `${3} 검색결과 ${tag}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    }),
    http.get(`${baseUrl}/api/users/:userId`, ({ params }) => {
        const { userId } = params;
        const found = User.find((v) => v.id === userId)
        if (found) return HttpResponse.json(found)
        return HttpResponse.json({ message: 'no_such_user' }, { status: 404 })
    }),
    http.get(`${baseUrl}/api/users/:userId/posts`, ({ params }) => {
        const { userId } = params;
        return HttpResponse.json([
            { postId: 1, User: User[0], content: `${1} ${userId}의 게시글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 2, User: User[1], content: `${2} ${userId}의 게시글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 3, User: User[2], content: `${3} ${userId}의 게시글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    }),
    http.get(`${baseUrl}/api/posts/:postId`, ({ params }) => {
        const { postId } = params;
        if (parseInt(postId as string) > 10) return HttpResponse.json({ message: 'no_such_post' }, { status: 404 })
        return HttpResponse.json(
            {
                postId: 1, User: User[0], content: `${1} 게시글 아이디 ${postId}의 내용`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 1, link: faker.image.urlLoremFlickr() }
                ],
                createdAt: generateDate(),
            },
        )
    }),
    http.get(`${baseUrl}/api/posts/:postId/comments`, ({ params }) => {
        const { postId } = params;
        return HttpResponse.json([
            { postId: 1, User: User[0], content: `${1} 게시글 ${postId}의 답글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 2, User: User[1], content: `${2} 게시글 ${postId}의 답글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 3, User: User[2], content: `${3} 게시글 ${postId}의 답글`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    }),
    http.get(`${baseUrl}/api/recommend-follows`, () => {
        return HttpResponse.json(User)
    }),
    http.get(`${baseUrl}/api/trends`, () => {
        return HttpResponse.json([
            { tagId: 1, title: '원', count: 1230 },
            { tagId: 2, title: '투', count: 1200 },
            { tagId: 3, title: '쓰리', count: 2000 },
            { tagId: 4, title: '포', count: 1264 },
            { tagId: 5, title: '파이브', count: 2316 },
        ])
    })
];