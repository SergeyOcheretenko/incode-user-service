import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './requests/create-user.request';
import { UserDto } from './dto/user.dto';
import { ConflictException } from '../common/exceptions/conflict.exception';
import { UserErrors } from './user.exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserRequest: CreateUserRequest): Promise<UserDto> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserRequest.email,
    });

    if (existingUser) {
      throw new ConflictException(UserErrors.USER_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserRequest.password, salt);

    const userEntity = await this.userRepository.save({
      ...createUserRequest,
      passwordHash,
    });
    return UserDto.fromEntity(userEntity);
  }
}
