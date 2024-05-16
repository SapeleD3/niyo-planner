import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { PrismaModule } from '../../prismaModule/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;

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
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
