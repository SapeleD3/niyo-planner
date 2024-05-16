import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { PrismaModule } from '../../prismaModule/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('TaskService', () => {
  let service: TaskService;

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
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
