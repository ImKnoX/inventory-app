import type { NextAuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider  from 'next-auth/providers/credentials';
import prisma from './prisma';
import crypto from 'node:crypto'

type IUser = {
    id?: string;
    name?: string;
    email?: string;
};

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Email and Password',
            credentials: {
               email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com'
               },
               password: {
                label: 'Password', 
                type: 'password'
               }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                };


            const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email,
                },
            });
      
            if (!user || !(await compare(credentials.password, user.password))) {
                return null;
            };
      
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
            },
        })
    ],
    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                id: token.id,
            }
        },
        jwt({ token, user }) {
            if(user) {
                const u = user as unknown as IUser;
                return {
                    ...token,
                    id: u.id,
                };
            }
            return token;
        },
    }
};