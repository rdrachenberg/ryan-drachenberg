import NextAuth, { Awaitable, RequestInternal, User, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" , type: "email"},
                password: { label: "Password" , type: "password"},
            },
            async authorize(credentials){
                // sign in user here
                const {email, password} = credentials ?? {}; 

                if(!email || !password) {
                    throw new Error('Missing email or password')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email 
                    }
                })

                if(!user) {
                    throw new Error('Invalid email or password')
                }

                const isValidPassword = await compare(password, user.password);

                if(!isValidPassword) {
                    throw new Error('Invalid email or password')
                }
                console.log(user);
                return user as any
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };