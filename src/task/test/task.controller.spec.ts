import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { PrismaModule } from '../../prismaModule/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        ConfigModule.forRoot({
          load: [],
          isGlobal: true,
          cache: true,
          expandVariables: true,
          envFilePath: [
            '.env.local',
            '.env.development',
            '.env.staging',
            '.env',
          ],
        }),
      ],
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
