import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prismaModule/prisma.service';
import { ITask } from './interface';
import { FindAllTasksFilters } from './type';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly db: PrismaService) {}

  async create(payload: CreateTaskDto, userId: string): Promise<ITask> {
    const { title, description, status, priority } = payload;

    const existingTask = await this.db.tasks.findFirst({
      where: { title, userId },
    });

    if (existingTask) {
      throw new BadRequestException(
        'Task with title already exist, try changing title',
      );
    }

    const newTask = await this.db.tasks.create({
      data: {
        title,
        description,
        status,
        priority,
        userId,
        startDate: payload?.startDate,
        endDate: payload?.endDate,
      },
    });

    return newTask;
  }

  async findAll(filter: FindAllTasksFilters) {
    const { userId } = filter;

    const whereQuery: any = {
      userId,
    };

    if (filter?.id) whereQuery['id'] = filter.id;
    if (filter?.title)
      whereQuery['title'] = {
        search: filter?.title,
      };
    if (filter?.priority) whereQuery['priority'] = filter.priority;
    if (filter?.status) whereQuery['status'] = filter.status;

    const { limit, page, sort } = filter;
    let totalTasks = 0;

    try {
      totalTasks = await this.db.tasks.count({
        where: whereQuery,
      });
    } catch (error) {
      return { tasks: [], pages: 0, total: totalTasks, page, limit };
    }

    const pages = Math.ceil(totalTasks / limit);
    const offset = limit * (page - 1) || 0;

    const tasks = await this.db.tasks.findMany({
      where: whereQuery,
      skip: offset,
      take: limit,
      orderBy: [
        {
          createdAt: sort.toLowerCase() as Prisma.SortOrder,
        },
      ],
    });

    return { tasks, pages, total: totalTasks, page, limit };
  }

  async findOne(id: string, userId: string): Promise<ITask> {
    const task = await this.db.tasks.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new BadRequestException(
        'Invalid task ID, please check the id and try again',
      );
    }
    return task;
  }

  async update(id: string, payload: UpdateTaskDto, userId: string) {
    const task = await this.db.tasks.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new BadRequestException(
        'Invalid task ID, please check the id and try again',
      );
    }

    if (payload?.title) {
      const existingTitle = await this.db.tasks.findFirst({
        where: { title: payload.title, userId },
      });

      if (existingTitle) {
        throw new BadRequestException(
          'Task with title already exist, try changing title',
        );
      }
    }

    const updatedTask = await this.db.tasks.update({
      where: { id, userId },
      data: payload,
    });

    return updatedTask;
  }

  async remove(id: string, userId: string): Promise<void> {
    try {
      await this.db.tasks.delete({
        where: { id, userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
