import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard, AuthGuardRequest } from '../common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { Sort } from './type';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Request() request: AuthGuardRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const response = await this.taskService.create(createTaskDto, request.id);
    return {
      message: 'task created successfully',
      data: response,
    };
  }

  @Get()
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: TaskStatus,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: TaskPriority,
  })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: String, example: '5' })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: Sort,
  })
  async findAll(
    @Request() request: AuthGuardRequest,
    @Query('id') id?: string,
    @Query('title') title?: string,
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: Sort,
  ) {
    const response = await this.taskService.findAll({
      userId: request.id,
      id,
      title,
      status,
      priority,
      page: page || 1,
      limit: limit || 10,
      sort: sort || Sort.DESC,
    });

    return {
      message: 'tasks fetched successfully',
      data: response,
    };
  }

  @Get(':id')
  async findOne(@Request() request: AuthGuardRequest, @Param('id') id: string) {
    const response = await this.taskService.findOne(id, request.id);

    return {
      message: 'task fetched successfully',
      data: response,
    };
  }

  @Patch(':id')
  async update(
    @Request() request: AuthGuardRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const response = await this.taskService.update(
      id,
      updateTaskDto,
      request.id,
    );

    return {
      message: 'task updated successfully',
      data: response,
    };
  }

  @Delete(':id')
  async remove(@Request() request: AuthGuardRequest, @Param('id') id: string) {
    const response = await this.taskService.remove(id, request.id);

    return {
      message: 'task deleted successfully',
      data: response,
    };
  }
}
