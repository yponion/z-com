import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    pages: {
        signIn: '/i/flow/login',
        newUser: '/i/flow/signup',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.username,
                        password: credentials.password,
                    }),
                })
                if (!authResponse.ok) {
                    const credentialsSignin = new CredentialsSignin();
                    if (authResponse.status === 404) credentialsSignin.code = 'no_user'
                    if (authResponse.status === 401) credentialsSignin.code = 'wrong_password'
                    throw credentialsSignin
                }
                const user = await authResponse.json()
                return {
                    email: user.id,
                    name: user.nickname,
                    image: user.image,
                    ...user,
                }
            },
        }),
    ]
});

// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// // Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"

// export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             authorize: async (credentials) => {
//                 let user = null

//                 // logic to salt and hash password
//                 const pwHash = saltAndHashPassword(credentials.password)

//                 // logic to verify if the user exists
//                 user = await getUserFromDb(credentials.email, pwHash)

//                 if (!user) {
//                     // No user found, so this is their first attempt to login
//                     // Optionally, this is also the place you could do a user registration
//                     throw new Error("Invalid credentials.")
//                 }

//                 // return user object with their profile data
//                 return user
//             },
//         }),
//     ],
// })