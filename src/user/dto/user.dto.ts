import { Role, User } from '../../entities/user.entity';

export class UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  homeAddress?: string;
  phoneNumber?: string;
  birthdate?: Date;

  static fromEntity(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      homeAddress: user.homeAddress,
      phoneNumber: user.phoneNumber,
      birthdate: user.birthdate,
    };
  }
}
