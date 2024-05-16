import { TaskPriority, TaskStatus } from '@prisma/client';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type FindAllTasksFilters = {
  userId: string;
  id?: string;
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  page?: number;
  limit?: number;
  sort?: Sort;
};
