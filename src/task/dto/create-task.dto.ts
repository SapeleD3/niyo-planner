import {
  IsString,
  Length,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Read Solo leveling',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Task Description',
    example:
      'Resume reading the manga solo leveling, it seems really interesting',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 320)
  description: string;

  @ApiProperty({
    description: 'Task Status',
    example: TaskStatus.OPEN,
    enum: TaskStatus,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  status: TaskStatus;

  @ApiProperty({
    description: 'Task Priority',
    example: TaskPriority.LOW,
    enum: TaskPriority,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  priority: TaskPriority;

  @ApiProperty({
    description: 'Task Start date',
    example: new Date(),
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Task End date',
    example: new Date(),
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
