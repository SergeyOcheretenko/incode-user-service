import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../entities/user.entity';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  lastName: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    type: 'enum',
    enum: Role,
    required: false,
  })
  role?: Role;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    required: false,
  })
  homeAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    required: false,
  })
  phoneNumber?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  birthdate?: Date;
}
