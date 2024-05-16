import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password@1234',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 32)
  readonly password: string;
}
