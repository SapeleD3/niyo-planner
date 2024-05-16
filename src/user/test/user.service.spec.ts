import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaModule } from '../../prismaModule/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('UserService', () => {
  let service: UserService;

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
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
