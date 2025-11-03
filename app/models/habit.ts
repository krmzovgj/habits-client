import { User } from "./user";

export interface Habit {
    id: string,
    title: string,
    userId: number,
    User: User,
    frequency: Frequency,
    streakCount: number,
    completed: boolean
}

export enum Frequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
}