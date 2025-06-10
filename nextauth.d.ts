import NextAuth, { DefaultSession } from 'next-auth';
import { create } from 'zustand';
import { StudentInfo, Rank, Dojo } from '@/interfaces/types';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: 'MASTER' | 'STUDENT' | 'SUPER_ADMIN'
            image?: string | null;
            createdAt: Date;
            student_info?: StudentInfo;
            rank?: Rank;
            dojo?: Dojo;
        } & DefaultSession['user'];
    }
}