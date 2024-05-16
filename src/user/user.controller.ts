import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto';
import { AuthGuard, AuthGuardRequest } from '../common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('/login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.loginUser(userLoginDto);
  }
}

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/user/auth')
export class AuthUserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findOne(@Request() request: AuthGuardRequest) {
    return this.userService.findAuthenticatedUser(request.id);
  }
}
