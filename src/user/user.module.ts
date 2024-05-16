import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, AuthUserController } from './user.controller';
import { PrismaModule } from 'src/prismaModule/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, AuthUserController],
  providers: [UserService],
})
export class UserModule {}
