import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({ from: lastWeek, to: new Date() });
}

const User = [
    { id: 'elonmusk', nickname: "Elon Musk", image: '/musklogo.jpg' },
    { id: 'yp071704', nickname: "양정운", image: '/onionlogo.jpg' },
    { id: 'leo', nickname: "leo", image: faker.image.avatar() },
]

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
    http.post(`${baseUrl}/api/login`, () => {
        console.log('로그인');
        return HttpResponse.json(User[1], {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            },
        })
    }),
    http.post(`${baseUrl}/api/logout`, () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post(`${baseUrl}/api/users`, async ({ request }) => {
        console.log('회원가입');
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //   status: 403,
        // });
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            },
        });
    }),
    http.get(`${baseUrl}/api/postRecommends`, async ({ request }) => {
        return HttpResponse.json([
            { postId: 1, User: User[0], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 2, User: User[1], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
            { postId: 3, User: User[2], content: `${faker.lorem.paragraph()}`, Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }], createdAt: generateDate() },
        ])
    })
];