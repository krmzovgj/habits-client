import { Habit } from "./habit";
import { User } from "./user";

export interface Notification {
  id: string;
  message: string;
  userId: number;
  habitId?: string | null;
  read: boolean;
  createdAt: string;
  habit?: Habit | null;
  user?: User;
}