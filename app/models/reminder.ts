import { Habit } from "./habit";
import { User } from "./user";

export interface Reminder {
  id: string;
  time: string;          // e.g., "08:30"
  timezone: string;      // e.g., "Europe/Paris"
  triggerAtUtc: string;  // ISO string
  recurring: boolean;
  message: string;
  active: boolean;
  userId: number;
  habitId?: string | null;
  createdAt: string;
  habit?: Habit | null;
  user?: User;
}