import { TaskStatus, TaskPriority } from '@prisma/client';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
