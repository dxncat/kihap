import { create } from 'zustand';
export interface Rank {
    id: number
    name: string
    level: number
    description: string
    hoursRequired: number
}

export interface StudentInfo {
    id: string
    userId: string
    dojoId: string
    rankId: number
    currentHours: number
}

export interface Dojo {
    id: string
    code: string
    name: string
    description: string
    createdAt: Date
    masterId: string
    master?: User | null
}

export interface User {
    id: string
    email: string
    name: string
    image?: string | null
    role: 'MASTER' | 'STUDENT' | 'SUPER_ADMIN'
    createdAt: Date
    student_info?: StudentInfo
    rank?: Rank
    dojo?: Dojo
}

export interface RankHistory {
    id: string
    studentId: string
    rankId: number
    createdAt: Date
    finishedAt?: Date | null
    Rank: {
        name: string
    }
}

export interface News {
    id: string
    title: string
    content: string
    createdAt: Date
    dojoId: string
    dojo?: Dojo | null
}

export interface Sessions {
    id: string
    title: string
    description?: string | null
    startTime: Date
    endTime: Date
    rankId: number
    Rank?: Rank | null
}