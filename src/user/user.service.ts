import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from './dto';
import { PrismaService } from '../prismaModule/prisma.service';
import { RegisterUserResponse, AuthenticatedUser } from './types';
import { encryptPassword, comparePassword, generateJwtToken } from '../common';
import { ConfigService } from '@nestjs/config';
import { IUser } from './interface';

@Injectable()
export class UserService {
  excludePassword = (user: IUser): Partial<IUser> => {
    delete user.password;
    return user;
  };

  constructor(
    private readonly db: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(payload: CreateUserDto): Promise<RegisterUserResponse> {
    const { email, password } = payload;

    const existingUser = await this.db.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hash = encryptPassword(password);

    const newUser = await this.db.user.create({
      data: {
        email,
        password: hash,
      },
    });

    return {
      userId: newUser.id,
    };
  }

  async loginUser(payload: UserLoginDto): Promise<AuthenticatedUser> {
    const { email, password } = payload;

    const existingUser = await this.db.user.findFirst({ where: { email } });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const isMatchingPassword = comparePassword({
      password,
      hash: existingUser.password,
    });

    if (!isMatchingPassword) {
      throw new Error('Invalid login details');
    }

    const secret = this.configService.get('JWT_SECRET_KEY');
    const algorithm = this.configService.get('JWT_ALGORITHM');

    const token = generateJwtToken({
      id: existingUser.id,
      secret,
      algorithm,
    });

    return { token, user: this.excludePassword(existingUser) };
  }

  async findAuthenticatedUser(id: string): Promise<Partial<IUser>> {
    const user = await this.db.user.findFirst({ where: { id } });
    return this.excludePassword(user);
  }
}
