import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/UpdateUser.dto';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findusers = async (): Promise<User[]> => {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
  createUser = async (createUserDto: CreateUserDto): Promise<any> => {
    try {
      return await this.userRepository.save(
        this.userRepository.create(createUserDto),
      );
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Username is already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  };

  updateUser = async (
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> => {
    try {
      return await this.userRepository.update({ id }, { ...updateUserDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
  
}
